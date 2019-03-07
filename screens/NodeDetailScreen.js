import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { methods } from '../api/api';
import ActionPrompt from '../components/ActionPrompt';
import ActionTitle from '../components/ActionTitle';
import ActionButtons from '../components/ActionButtons';
import ButtonStyles from '../constants/ButtonStyles';
import Signature from '../components/Signature';
import Comments from '../components/Comments';
import { NavChoice } from '../Utils/utils';
import ModalMessage from '../components/ModalMessage';

const nodeTypes = ['Process', 'Stage', 'Operation'];
const nodeStates = ['Confirmation', 'Signature', 'Approval'];

export default class NodeDetailScreen extends React.Component {

  static propTypes = {
    navigation: PropTypes.shape({
      navigation: PropTypes.object,
    }).isRequired,
  }

  static navigationOptions = ({ navigation }) => {
    const data = navigation.getParam('batchData');
    const node = data.nodes[0];
    // 0,1,2
    const nodeType = nodeTypes[data.nodeDepth];
    // 2,3,4
    const nodeState = nodeStates[node.statusEnum - 2];
    return {
      title: `${nodeType} ${nodeState}`,
    };
  }

  static createButtons(node) {
    const buttons = [];
    if (node.backable) buttons.push(ButtonStyles.Previous);
    switch (node.status) {
      case 'PendingSignature':
        buttons.push(ButtonStyles.Sign);
        break;
      case 'PendingApproval':
        buttons.push(ButtonStyles.Approve);
        break;
      default: // PendingCompletion
        buttons.push(ButtonStyles.Confirm);
        buttons.push(ButtonStyles.Comments);
        break;
    }
    return buttons;
  }

  constructor(props) {
    super(props);
    this.state = {
      batchData: null, commenting: false, signing: false, approving: false, message: null,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.navigation = navigation;
    const batchData = this.navigation.getParam('batchData');
    const locationCode = this.navigation.getParam('locationCode');
    this.locationCode = locationCode;
    [this.node] = batchData.nodes;
    this.setState({ batchData });
  }

  getPrompt(data) {
    const prompt = `A ${nodeStates[this.node.statusEnum - 2]} is required to complete this ${nodeTypes[data.nodeDepth]}`;
    return prompt;
  }

  onPress = (name) => {
    const { batchData } = this.state;
    const node = batchData.nodes[0];
    const postData = {
      batchID: batchData.batchID,
      procID: node.procID,
      location: this.locationCode,
      input: null,
      deviation: this.comment,
    };
    switch (name) {
      case 'back':
        methods.revertAction(postData).then((data) => {
          this.getNavChoice(data, this.navigation, this.locationCode);
        }).catch((error) => {
          console.log(JSON.stringify(error));
        });
        break;
      case 'confirm':
        methods.confirmAction(postData).then((data) => {
          this.getNavChoice(data, this.navigation, this.locationCode);
        }).catch((error) => {
          console.log(JSON.stringify(error));
        });
        break;
      case 'sign':
        this.setState({ signing: true });
        break;
      case 'approve':
        this.setState({ approving: true });
        break;
      case 'comments':
        this.setState({ commenting: true });
        break;
      default: // Cancel
        this.navigation.replace('BatchList');
    }
  }

  onComment = (valid, comment) => {
    if (valid) {
      this.comment = comment;
    } else {
      this.comment = null;
    }
    this.setState({ commenting: false });
  }

  getNavChoice(batchData, nav, location) {
    const message = NavChoice(batchData, nav, location);
    if (message) { this.setState({ message }); }
  }

  approved = (success, token, comment) => {
    const { batchData } = this.state;
    const [node] = batchData.nodes;
    this.setState({ approving: false });
    if (success) {
      const postData = {
        batchID: batchData.batchID,
        procID: node.procID,
        input: token,
        location: this.locationCode,
        deviation: comment,
      };
      methods.approveAction(postData).then((data) => {
        this.getNavChoice(data, this.navigation, this.locationCode);
      }).catch((error) => {
        console.log(JSON.stringify(error));
      });
    }
  }

  signed = (success, token, comment) => {
    const { batchData } = this.state;
    const [node] = batchData.nodes;
    this.setState({ signing: false });
    if (success) {
      const postData = {
        batchID: batchData.batchID,
        procID: node.procID,
        input: token,
        location: this.locationCode,
        deviation: comment,
      };
      methods.signAction(postData).then((data) => {
        this.getNavChoice(data, this.navigation, this.locationCode);
      }).catch((error) => {
        console.log(JSON.stringify(error));
      });
    }
  }

  onExit = () => {
    this.setState({ message: null });
    this.navigation.replace('BatchList', { refresh: true });
  }

  render() {
    const { batchData } = this.state;
    if (batchData) {
      const [node] = batchData.nodes;
      const prompt = this.getPrompt(batchData);
      const buttons = NodeDetailScreen.createButtons(node);
      const {
        commenting, signing,
        approving, message
      } = this.state;
      return (
        <View style={{ flex: 1 }}>
          <ActionTitle text={node.name} />
          <ActionButtons buttons={buttons} onPress={this.onPress} />
          <ActionPrompt prompt={prompt} />
          <Comments visible={commenting} onComment={this.onComment} />
          <Signature visible={signing} onSign={this.signed} isApproval={false} />
          <Signature visible={approving} onSign={this.approved} isApproval />
          <ModalMessage messageText={message} onExit={this.onExit} />
        </View>
      );
    }
    return null;
  }
}
