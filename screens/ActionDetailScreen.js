import React, { Component } from 'react';
import { ScrollView, View, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';

import ActionButtons from '../components/ActionButtons';
import ButtonStyles from '../constants/ButtonStyles';

import ActionBreadcrumb from '../components/ActionBreadcrumb';
import ActionTitle from '../components/ActionTitle';
import ActionSign from '../components/ActionWarning';
import ActionPrompt from '../components/ActionPrompt';
import ActionEntry from '../components/ActionEntry';
import ActionEntryArray from '../components/ActionEntryArray';
import ActionImage from '../components/ActionImage';
import FileContent from '../components/FileContent';
import Balance from '../components/Balance';

import { methods } from '../api/api';
import LoadingOverlay from '../components/LoadingOverlay';
import Signature from '../components/Signature';
import Comments from '../components/Comments';
import ErrorBar from '../components/ErrorBar';
import { NavChoice } from '../Utils/utils';
import ConsumePropDisplay from '../components/ConsumePropDisplay';
import DischargePropDisplay from '../components/DischargePropDisplay';
import AdditionPropDisplay from '../components/AdditionPropDisplay';
import PrintLabelProps from '../components/PrintLabelProps';
import WeighInfoProps from '../components/WeighInfoProps';
import IdentContainerProps from '../components/IdentContainerProps';
import IdentEquipmentProps from '../components/IdentEquipmentProps';
import IdentWeighingProps from '../components/IdentWeighingProps';
import ModalMessage from '../components/ModalMessage';
import ComponentList from '../components/ComponentList';

export default class ActionDetailScreen extends Component {
  static navigationOptions = () => ({
    title: 'Execute Action',
  })

  static propTypes = {
    navigation: PropTypes.shape({
      navigation: PropTypes.object,
    }).isRequired,
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
      default: // NotStarted
        if (node.actionType === 'Question') {
          // Only ever Yes & No
          buttons.push(ButtonStyles.No);
          buttons.push(ButtonStyles.Yes);
        } else {
          // Additional buttons depending on specific action type
          if (node.actionType === 'ScanWeighing' || node.actionType === 'WeighInfo') buttons.push(ButtonStyles.Components);
          buttons.push(ButtonStyles.OK);
        }
        // Alway add comments (on non-started actions)
        buttons.push(ButtonStyles.Comments);
    }
    return buttons;
  }

  constructor(props) {
    super(props);
    this.state = {
      node: null,
      loading: false,
      value: null,
      signing: false,
      approving: false,
      commenting: false,
      showComps: false,
      error: null,
      message: null,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const batchData = navigation.getParam('batchData');
    this.batchData = batchData;
    const node = batchData.nodes[0];
    this.procID = node.procID;
    const locationCode = navigation.getParam('locationCode');
    this.locationCode = locationCode;
    const at = node.actionType;
    if (at === 'Evaluation' || at === 'WeighCreate' || at === 'ExecuteCommand') {
      this.completeAction('Y');
    } else {
      this.setState({ node });
    }
  }

  onPress = (name) => {
    const { navigation } = this.props;
    const { value } = this.state;
    switch (name) {
      case 'previous':
      {
        this.setState({ loading: true });
        const postData = {
          batchID: this.batchData.batchID,
          procID: this.procID,
          location: this.locationCode,
        };
        methods.revertAction(postData).then((data) => {
          this.getNavChoice(data, navigation, this.locationCode);
        }).catch((error) => {
          this.setError(error);
        });
        break;
      }
      case 'ok':
        if (this.entry) { // There is an entry; validate
          if (this.entry.validate()) {
            // Validated OK; complete
            this.completeAction(this.entry.value());
          }
        } else if (this.balance) { // a balance was used; validate
          const { balanceValue, readingValid } = this.balance.getReading();
          if (readingValid) {
            this.completeAction(balanceValue);
          }
        } else { // No entry, complete without validation
          this.completeAction();
        }
        break;
      case 'yes':
        this.completeAction('Y');
        break;
      case 'no':
        this.completeAction('N');
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
      case 'components':
        methods.getComponents(this.batchData.batchID, this.batchData.stageID).then((components) => {
          this.setState({ components, showComps: true });
        }).catch((error) => {
          this.setError(error);
        });
        break;
      default:
        navigation.replace('BatchList');
    }
  }

  getNavChoice(batchData, nav, location) {
    const message = NavChoice(batchData, nav, location);
    if (message) { this.setState({ message }); }
  }

  approved = (success, token, comment) => {
    const { navigation } = this.props;
    this.setState({ approving: false });
    if (success) {
      const postData = {
        batchID: this.batchData.batchID,
        procID: this.procID,
        input: token,
        location: this.locationCode,
        deviation: comment,
      };
      methods.approveAction(postData).then((data) => {
        this.getNavChoice(data, navigation, this.locationCode);
      }).catch((error) => {
        this.setError(error);
      });
    }
  }

  signed = (success, token, comment) => {
    const { navigation } = this.props;
    this.setState({ signing: false });
    if (success) {
      const postData = {
        batchID: this.batchData.batchID,
        procID: this.procID,
        input: token,
        location: this.locationCode,
        deviation: comment,
      };
      methods.signAction(postData).then((data) => {
        this.getNavChoice(data, navigation, this.locationCode);
      }).catch((error) => {
        this.setError(error);
      });
    }
  }

  onExit = () => {
    const { navigation } = this.props;
    this.setState({ message: null });
    navigation.replace('BatchList', { refresh: true });
  }

  setError = (error) => {
    console.log('ActionDetailScreen:completeAction:ERROR:', JSON.stringify(error));
    const msg = error.response.data.Message;
    this.setState({ loading: false, error: msg });
  }

  entryValueChange = (value, index) => {
    const { values } = this.state;
    values[index] = value;
    this.setState({ values, error: null });
  }

  onComment = (valid, comment) => {
    if (valid) {
      this.comment = comment;
    } else {
      this.comment = null;
    }
    this.setState({ commenting: false });
  }

  allowCamera = (node) => {
    const a = node.actionType;
    return (a === 'IdentifyWeighing' || a === 'IdentifyContainer' || a === 'IdentifyEquipment' || a === 'ScanWeighing');
  }

  completeAction(enteredValue) {
    let inputValue = null;
    this.setState({ loading: true });
    if (enteredValue) {
      this.setState({ value: enteredValue });
      inputValue = enteredValue;
    } else {
      const { value } = this.state;
      inputValue = value;
    }
    const postData = {
      batchID: this.batchData.batchID,
      procID: this.procID,
      input: inputValue,
      location: this.locationCode,
      deviation: this.comment,
    };
    methods.completeAction(postData).then((data) => {
      const { navigation } = this.props;
      this.getNavChoice(data, navigation, this.locationCode);
    }).catch((error) => {
      this.setError(error);
    });
  }

  render() {
    const {
      node, error, showComps, components, commenting,
      approving, signing, loading, message
    } = this.state;
    if (node) {
      const buttons = ActionDetailScreen.createButtons(node);
      const allowCam = this.allowCamera(node);
      const { inputs } = node;
      const hasInputs = !!inputs;
      const enabled = (node.status === 'NotStarted');
      return (
        <View style={{ flex: 1 }}>
          <ActionBreadcrumb text={this.batchData.nodePath} />
          <ActionTitle text={node.name} />
          <ActionSign node={node} />
          <ActionButtons buttons={buttons} onPress={this.onPress} />
          <ScrollView style={{ flex: 1 }}>
            <ActionPrompt prompt={node.prompt} notes={node.notes} />
            {node.balance && <Balance ref={(ref) => { this.balance = ref; }} {...node.balance} />}
            <ScrollView horizontal>
              <AdditionPropDisplay node={node} />
              <DischargePropDisplay node={node} />
              <ConsumePropDisplay node={node} />
              <PrintLabelProps node={node} />
              <WeighInfoProps node={node} />
              <IdentWeighingProps node={node} />
              <IdentContainerProps node={node} />
              <IdentEquipmentProps node={node} />
            </ScrollView>
            {hasInputs && (
              <ActionEntryArray
                ref={(ref) => { this.entry = ref; }}
                inputs={inputs}
                enabled={enabled}
                useCamera={allowCam}
              />
            )
              }
            <ActionImage fileName={node.picture} />
            <FileContent fileName={node.fileName} />
            <ErrorBar text={error} onPress={() => this.setState({ error: null })} />
            {/* These are all modal */}
            <ComponentList
              components={components}
              visible={showComps}
              onDismiss={() => this.setState({ showComps: false })}
            />
            <Comments visible={commenting} onComment={this.onComment} />
            <Signature visible={signing} onSign={this.signed} isApproval={false} />
            <Signature visible={approving} onSign={this.approved} isApproval />
            <ModalMessage messageText={message} onExit={this.onExit} />
            <LoadingOverlay loading={loading} />
          </ScrollView>
        </View>
      );
    }
    return (null);
  }
}
