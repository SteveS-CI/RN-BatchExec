import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native'
import ActionButtons, { ButtonStyles } from '../components/ActionButtons'
import NexaColours from '../constants/NexaColours'
import { ActionBreadcrumb, ActionTitle, ActionPrompt, ActionEntry } from '../components/ActionElements'
import ActionImage from '../components/ActionImage'
import FileContent from '../components/FileContent'
import { methods } from '../api/api'
import LoadingOverlay from '../components/LoadingOverlay';
import Signature from '../components/Signature'
import Comments from '../components/Comments'

export default class ActionDetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { node: null, loading: false, value: null, signing: false, approving: false }
  }

  static navigationOptions = ({navigation}) => {
    const batchData = navigation.getParam('batchData')  
    return {
      title: 'Execute Action',
      headerLeft: null,
      headerRight: <ActionBreadcrumb text={batchData.nodePath} />
    }
  };

  componentDidMount() {
    const batchData = this.props.navigation.getParam("batchData")
    this.batchData = batchData
    const node = batchData.nodes[0]
    this.procID = node.procID
    const locationCode = this.props.navigation.getParam("locationCode")
    this.locationCode = locationCode
    if (node.actionType==='Evaluation') {
      this.completeAction('Y')
    } else {
      this.setState({ node })
    }
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
      default: // NotStarted
        if (node.actionType==='Question') {
          // Only ever Yes & No
          buttons.push(ButtonStyles.No)
          buttons.push(ButtonStyles.Yes)
        } else {
          // Additional buttons depending on specific action type
          if (node.actionType==='ScanWeighing' || node.actionType==='WeighInfo') buttons.push(ButtonStyles.Components) 
          buttons.push(ButtonStyles.OK)
        }
        // Alway add comments (on non-started actions)
        buttons.push(ButtonStyles.Comments)
    }
    return buttons
  }

  onPress = (name) => {
    console.log(name)
    switch (name) {
      case 'back':
        this.setState({loading: true})
        const postData = {
          batchID: this.batchData.batchID,
          procID: this.procID,
          location: this.locationCode,
        }
        methods.revertAction(postData).then(data => {
          this.chooseNav(data)
        }).catch(error => {
          console.log(JSON.stringify(error))
        })
        break
      case 'ok':
        this.completeAction()
        break
      case 'yes':
        this.completeAction('Y')
        break
      case 'no':
        this.completeAction('N')
        break
      case 'sign':
        this.setState({signing: true})
        break
      case 'approve':
        this.setState({approving: true})
        break
      case 'comments':
        this.setState({commenting: true})
        break
      default:
        this.props.navigation.replace('BatchList')
    }
  }

  signed = (success, token, comment) => {
    this.setState({signing: false})
    if (success) {
      const postData = {
        batchID: this.batchData.batchID,
        procID: this.procID,
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
    this.setState({approving: false})
    if (success) {
      const postData = {
        batchID: this.batchData.batchID,
        procID: this.procID,
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

  completeAction(value) {
    this.setState({loading: true})
    if (value) { 
      this.setState({value})
    } else {
      value = this.state.value
    }
    const postData = {
      batchID: this.batchData.batchID,
      procID: this.procID,
      input: value,
      location: this.locationCode,
      deviation: this.comment
    }
    methods.completeAction(postData).then(data => {
      this.chooseNav(data)
    }).catch(error => {
      console.log(JSON.stringify(error))
    })
  }

  entryValueChange = (value) => {
    this.setState({value})
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
    const node = this.state.node
    if (node) {
        const buttons = this.createButtons(node)
        const entry = node.inputs ? node.inputs[0] : null
        const enabled = (node.status==="NotStarted")
        console.log(node.status)
      return (
        <View style={{flex: 1}}>
          <ActionTitle text={this.state.node.name} />
          <ActionButtons buttons={buttons} onPress={this.onPress} />
          {node.prompt && <ActionPrompt prompt={node.prompt} notes={node.notes} />}
          {entry && <ActionEntry value={this.state.value} entry={entry} onChange={this.entryValueChange} enabled={enabled}/>}
          {node.picture && <ActionImage fileName={node.picture} />}
          {node.fileName && <FileContent fileName={node.fileName}/>}
          <Comments visible={this.state.commenting} onComment={this.onComment} />
          <Signature visible={this.state.signing} onSign={this.signed} isApproval={false}/>
          <Signature visible={this.state.approving} onSign={this.approved} isApproval={true}/>
          <LoadingOverlay loading={this.state.loading} />
        </View>
      )
    } else {
      return (null)
    }
  }
}
