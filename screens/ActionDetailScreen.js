import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native'
import ActionButtons, { ButtonStyles } from '../components/ActionButtons'
import NexaColours from '../constants/NexaColours'
import { ActionBreadcrumb, ActionTitle, ActionPrompt, ActionEntry } from '../components/ActionElements'
import ActionImage from '../components/ActionImage'
import FileContent from '../components/FileContent'
import { methods } from '../api/api'
import LoadingOverlay from '../components/LoadingOverlay';

export default class ActionDetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { node: null, loading: false, value: null }
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
    this.setState({ node })
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
        this.setState({node: batchData.nodes[0], loading: false})
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
      case 'PendingApproval':
        buttons.push(ButtonStyles.Approve)
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
    }
    // Always add Comments?
    buttons.push(ButtonStyles.Comments)
    return buttons
  }

  onPress = (name) => {
    switch (name) {
      case 'cancel':
        this.props.navigation.replace('BatchList')
        break
      case 'back':
        this.setState({loading: true})
        methods.revertAction(this.batchData.batchID, this.procID, '', this.locationCode).then(data => {
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
      default:
    }
  }

  completeAction(value) {
    this.setState({loading: true})
    if (value) { 
      this.setState({value})
    } else {
      value = this.state.value
    }
    methods.completeAction(this.batchData.batchID, this.procID, value, this.locationCode).then(data => {
      this.chooseNav(data)
    }).catch(error => {
      console.log(JSON.stringify(error))
    })
  }

  entryValueChange = (value) => {
    this.setState({value})
  }

  render() {
    const node = this.state.node
    if (node) {
        const buttons = this.createButtons(node)
        const entry = node.inputs ? node.inputs[0] : null
      return (
        <View style={{flex: 1}}>
          <ActionTitle backColor={NexaColours.AlertCyan} text={this.state.node.name} />
          <ActionButtons buttons={buttons} onPress={this.onPress} />
          {node.prompt && <ActionPrompt prompt={node.prompt} notes={node.notes} />}
          {entry && <ActionEntry value={this.value} entry={entry} onChange={this.entryValueChange}/>}
          {node.picture && <ActionImage fileName={node.picture} />}
          {node.fileName && <FileContent fileName={node.fileName}/>}
          <LoadingOverlay loading={this.state.loading} />
        </View>
      )
    } else {
      return (null)
    }
  }
}
