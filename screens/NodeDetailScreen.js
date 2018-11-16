import React from 'react';
import { View, Text, Button } from 'react-native'
import { methods } from '../api/api'
import { ActionTitle, ActionPrompt } from '../components/ActionElements';
import ActionButtons, { ButtonStyles } from '../components/ActionButtons'
import Signature from '../components/Signature'
import Comments from '../components/Comments'

const nodeTypes = ['Process','Stage','Operation']
const nodeStates = ['Confirmation','Signature','Approval']

export default class NodeDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { batchData: null, commenting: false, signing: false, approving: false};
  }

  static navigationOptions = ({navigation}) => {
    const data = navigation.getParam("batchData")
    const node = data.nodes[0]
    //0,1,2
    const nodeType = nodeTypes[data.nodeDepth]
    //2,3,4
    const nodeState = nodeStates[node.statusEnum-2]
    return {
      title: nodeType + " " + nodeState,
      headerLeft: null
    }
  }
  
  componentDidMount() {
    const batchData = this.props.navigation.getParam("batchData")
    const locationCode = this.props.navigation.getParam("locationCode")
    this.locationCode = locationCode
    this.node = batchData.nodes[0]
    this.setState({ batchData })
  }

  getPrompt(data) {
    const prompt = "A " + nodeStates[this.node.statusEnum-2] + " is required to complete this " + nodeTypes[data.nodeDepth]
    return prompt
  }

  createButtons(node) {
    var buttons = []
    if (node.backable) buttons.push(ButtonStyles.Back)
    switch (node.status) {
      case 'PendingSignature':
        buttons.push(ButtonStyles.Sign)
        break
      case 'PendingApproval':
        buttons.push(ButtonStyles.Approve)
        break
      default: // PendingCompletion
        buttons.push(ButtonStyles.Confirm)
        buttons.push(ButtonStyles.Comments)
        break
    }
    return buttons
  }

  chooseNav(batchData) {
    const nav = this.props.navigation
    // depending on data shape, navigate to the appropriate screen, passing batchData
    if (!batchData.nodes) {
      const msg = (batchData.status==='PendingApproval'||batchData.status==='Complete')
        ? 'Batch is complete. Choose another Batch.'
        : 'No more can be done in the current location. Select another Batch, or move to another location.'
      Alert.alert('Done', msg)
      //Use replace to force BatchList reload
      nav.replace('BatchList', {refresh: true})
    } else if (batchData.nodes.length > 1) {
      // Multiple nodes
      nav.replace("NodeSelect", {
        batchData,
        locationCode: this.locationCode
      });
    } else {
      // Single nodes
      if (batchData.nodeDepth === 3) {
        // Action node - just change state
        this.batchData = batchData
        this.procID = batchData.nodes[0].procID
        // If non-interactive then execute 
        if (this.batchData.nodes[0].actionType==='Evaluation') {
          this.completeAction('Y')
        } else {
          this.setState({node: batchData.nodes[0], loading: false})
        }
      } else {
        // Operation/Stage/Process - for Confirmation/Signature/Approval
        nav.navigate("NodeDetail", {
          batchData,
          locationCode: this.locationCode
        });
      }
    }
  }

  onPress = (name) => {
    console.log(name)
    const data = this.state.batchData
    const node = data.nodes[0]
    const postData = {
      batchID: data.batchID,
      procID: node.procID,
      location: this.locationCode,
      input: null,
      deviation: this.comment
    }
    switch (name) {
      case "back":
        methods.revertAction(postData).then(data => {
          this.chooseNav(data)
        }).catch(error => {
          console.log(JSON.stringify(error))
        })
        break
      case "confirm":
        methods.confirmAction(postData).then(data => {
          this.chooseNav(data)
        }).catch(error => {
          console.log(JSON.stringify(error))
        })
        break
      case "sign":
        this.setState({signing: true})
        break
      case "approve":
        this.setState({approving: true})
        break
      case "comments":
        this.setState({commenting: true})
        break
      default: // Cancel
        this.props.navigation.replace('BatchList')
    }
  }

  signed = (success, token, comment) => {
    const data = this.state.batchData
    const node = data.nodes[0]
    this.setState({signing: false})
    if (success) {
      const postData = {
        batchID: data.batchID,
        procID: node.procID,
        input: token,
        location: this.locationCode,
        deviation: comment
      }
      methods.signAction(postData).then(data => {
        this.chooseNav(data)
      }).catch(error => {
        console.log(JSON.stringify(error))
      })
    }
  }

  approved = (success, token, comment) => {
    const data = this.state.batchData
    const node = data.nodes[0]
    this.setState({approving: false})
    if (success) {
      const postData = {
        batchID: data.batchID,
        procID: node.procID,
        input: token,
        location: this.locationCode,
        deviation: comment
      }
      methods.approveAction(postData).then(data => {
        this.chooseNav(data)
      }).catch(error => {
        console.log(JSON.stringify(error))
      })
    }
  }

  onComment = (valid, comment) => {
    if (valid) {
      this.comment = comment
    } else {
      this.comment = null
    }
    this.setState({commenting: false})
  }

  render() {
    if (this.state.batchData) {
      const data = this.state.batchData
      const node = data.nodes[0]
      const prompt = this.getPrompt(data)
      const buttons = this.createButtons(node)
      return (
        <View style={{flex: 1}}>
          <ActionTitle text={node.name}/>
          <ActionButtons buttons={buttons} onPress={this.onPress} />
          <ActionPrompt prompt={prompt}/>
          <Comments visible={this.state.commenting} onComment={this.onComment} />
          <Signature visible={this.state.signing} onSign={this.signed} isApproval={false}/>
          <Signature visible={this.state.approving} onSign={this.approved} isApproval={true}/>
        </View>
      )
    } else {
      return null
    }
  }
}
