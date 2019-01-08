import React, { Component } from 'react';
import { ScrollView, View, Alert, KeyboardAvoidingView } from 'react-native'

import ActionButtons from '../components/ActionButtons'
import ButtonStyles from '../constants/ButtonStyles'

import ActionBreadcrumb from '../components/ActionBreadcrumb'
import ActionTitle from '../components/ActionTitle'
import ActionSign from '../components/ActionWarning'
import ActionPrompt from '../components/ActionPrompt'
import ActionEntry from '../components/ActionEntry'
import ActionImage from '../components/ActionImage'
import FileContent from '../components/FileContent'

import { methods } from '../api/api'
import LoadingOverlay from '../components/LoadingOverlay';
import Signature from '../components/Signature'
import Comments from '../components/Comments'
import ErrorBar from '../components/ErrorBar'
import { NavChoice } from '../Utils/utils'
import ConsumePropDisplay from '../components/ConsumePropDisplay';
import DischargePropDisplay from '../components/DischargePropDisplay';
import AdditionPropDisplay from '../components/AdditionPropDisplay';
import PrintLabelProps from '../components/PrintLabelProps';
import WeighInfoProps from '../components/WeighInfoProps';
import IdentContainerProps from '../components/IdentContainerProps'
import IdentEquipmentProps from '../components/IdentEquipmentProps'
import IdentWeighingProps from '../components/IdentWeighingProps'
import ModalMessage from '../components/ModalMessage'
import ComponentList from '../components/ComponentList'

export default class ActionDetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      node: null,
      loading: false,
      value: null,
      signing: false,
      approving: false,
      commenting: false,
      showComps: false,
      error: null,
      message: null
    }
  }

  static navigationOptions = () => {
    return {
      title: 'Execute Action'
    }
  }

  componentDidMount() {
    const batchData = this.props.navigation.getParam("batchData")
    this.batchData = batchData
    const node = batchData.nodes[0]
    this.procID = node.procID
    const locationCode = this.props.navigation.getParam("locationCode")
    this.locationCode = locationCode
    const at = node.actionType
    if (at === 'Evaluation' || at === 'WeighCreate' || at === 'ExecuteCommand') {
      this.completeAction('Y')
    } else {
      this.setState({ node })
    }
  }

  createButtons(node) {
    var buttons = []
    if (node.backable) buttons.push(ButtonStyles.Previous)
    switch (node.status) {
      case 'PendingSignature':
        buttons.push(ButtonStyles.Sign)
        break
      case 'PendingApproval':
        buttons.push(ButtonStyles.Approve)
        break
      default: // NotStarted
        if (node.actionType === 'Question') {
          // Only ever Yes & No
          buttons.push(ButtonStyles.No)
          buttons.push(ButtonStyles.Yes)
        } else {
          // Additional buttons depending on specific action type
          if (node.actionType === 'ScanWeighing' || node.actionType === 'WeighInfo') buttons.push(ButtonStyles.Components)
          buttons.push(ButtonStyles.OK)
        }
        // Alway add comments (on non-started actions)
        buttons.push(ButtonStyles.Comments)
    }
    return buttons
  }

  onPress = (name) => {
    switch (name) {
      case 'previous':
        this.setState({ loading: true })
        const postData = {
          batchID: this.batchData.batchID,
          procID: this.procID,
          location: this.locationCode,
        }
        methods.revertAction(postData).then(data => {
          this.getNavChoice(data, this.props.navigation, this.locationCode)
        }).catch(error => {
          this.setError(error)
        })
        break
      case 'ok':
        if (this.entry) { // There is an entry; validate
          if (this.entry.validate(this.state.value)) {
            // Validated OK; complete
            this.completeAction()
          }
        } else { //No entry, complete without validation
          this.completeAction()
        }
        break
      case 'yes':
        this.completeAction('Y')
        break
      case 'no':
        this.completeAction('N')
        break
      case 'sign':
        this.setState({ signing: true })
        break
      case 'approve':
        this.setState({ approving: true })
        break
      case 'comments':
        this.setState({ commenting: true })
        break
      case 'components':
        methods.getComponents(this.batchData.batchID, this.batchData.stageID).then(components => {
          this.setState({ components, showComps: true })
        }).catch(error => {
          this.setError(error)
        })
        break
      default:
        this.props.navigation.replace('BatchList')
    }
  }

  signed = (success, token, comment) => {
    this.setState({ signing: false })
    if (success) {
      const postData = {
        batchID: this.batchData.batchID,
        procID: this.procID,
        input: token,
        location: this.locationCode,
        deviation: comment
      }
      methods.signAction(postData).then(data => {
        this.getNavChoice(data, this.props.navigation, this.locationCode)
      }).catch(error => {
        this.setError(error)
      })
    }
  }

  approved = (success, token, comment) => {
    this.setState({ approving: false })
    if (success) {
      const postData = {
        batchID: this.batchData.batchID,
        procID: this.procID,
        input: token,
        location: this.locationCode,
        deviation: comment
      }
      methods.approveAction(postData).then(data => {
        this.getNavChoice(data, this.props.navigation, this.locationCode)
      }).catch(error => {
        this.setError(error)
      })
    }
  }

  completeAction(value) {
    this.setState({ loading: true })
    if (value) {
      this.setState({ value })
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
      this.getNavChoice(data, this.props.navigation, this.locationCode)
    }).catch(error => {
      this.setError(error)
    })
  }

  getNavChoice(batchData, nav, location) {
    const message = NavChoice(batchData, nav, location)
    if (message) { this.setState({ message }) }
  }

  onExit = () => {
    this.setState({ message: null })
    this.props.navigation.replace('BatchList', { refresh: true })
  }

  setError = (error) => {
    console.log(JSON.stringify(error))
    const msg = error.response.data.Message
    this.setState({ loading: false, error: msg })
  }

  entryValueChange = (value) => {
    this.setState({ value, error: null })
  }

  onComment = (valid, comment) => {
    if (valid) {
      this.comment = comment
    } else {
      this.comment = null
    }
    this.setState({ commenting: false })
  }

  allowCamera = (node) => {
    const a = node.actionType
    return (a == 'IdentifyWeighing' || a == 'IdentifyContainer' || a == 'IdentifyEquipment' || a == 'ScanWeighing')
  }

  render() {
    const node = this.state.node
    if (node) {
      const buttons = this.createButtons(node)
      const allowCam = this.allowCamera(node)
      const entry = node.inputs ? node.inputs[0] : null
      const enabled = (node.status === "NotStarted")
      return (
        <View style={{ flex: 1 }}>
          <ActionBreadcrumb text={this.batchData.nodePath} />
          <ActionTitle text={this.state.node.name} />
          <ActionSign node={node} />
          <ActionButtons buttons={buttons} onPress={this.onPress} />
          <ScrollView style={{ flex: 1 }}>
            <KeyboardAvoidingView keyboardVerticalOffset={300} behavior='position' enabled={true}>
              <ActionPrompt prompt={node.prompt} notes={node.notes} />
              <ScrollView horizontal={true}>
                <AdditionPropDisplay node={node} />
                <DischargePropDisplay node={node} />
                <ConsumePropDisplay node={node} />
                <PrintLabelProps node={node} />
                <WeighInfoProps node={node} />
                <IdentWeighingProps node={node} />
                <IdentContainerProps node={node} />
                <IdentEquipmentProps node={node} />
              </ScrollView>
              <ActionImage fileName={node.picture} />
              <ActionEntry ref={(ref) => { this.entry = ref }} value={this.state.value} entry={entry} onChange={this.entryValueChange} enabled={enabled} useCamera={allowCam} />
              <FileContent fileName={node.fileName} />
              <ErrorBar text={this.state.error} onPress={() => this.setState({ error: null })} />
              {/* These are all modal */}
              <ComponentList components={this.state.components} visible={this.state.showComps} onDismiss={() => this.setState({ showComps: false })} />
              <Comments visible={this.state.commenting} onComment={this.onComment} />
              <Signature visible={this.state.signing} onSign={this.signed} isApproval={false} />
              <Signature visible={this.state.approving} onSign={this.approved} isApproval={true} />
              <ModalMessage messageText={this.state.message} onExit={this.onExit} />
              <LoadingOverlay loading={this.state.loading} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      )
    } else {
      return (null)
    }
  }
}
