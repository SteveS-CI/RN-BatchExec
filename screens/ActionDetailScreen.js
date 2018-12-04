import React, { Component } from 'react';
import { ScrollView, View, Alert, KeyboardAvoidingView } from 'react-native'

import ActionButtons from '../components/ActionButtons'
import ButtonStyles from '../constants/ButtonStyles'

import ActionBreadcrumb from '../components/ActionBreadcrumb'
import ActionTitle from '../components/ActionTitle'
import ActionPrompt from '../components/ActionPrompt'
import ActionEntry from '../components/ActionEntry'
import ActionImage from '../components/ActionImage'
import FileContent from '../components/FileContent'

import { methods } from '../api/api'
import LoadingOverlay from '../components/LoadingOverlay';
import Signature from '../components/Signature'
import Comments from '../components/Comments'
import ErrorBar from '../components/ErrorBar'
import HardwareDisplay from '../components/HardwareDisplay';
import WeighInfo from '../components/WeighInfo'
import {NavResult, CheckNav} from '../Utils/utils'

export default class ActionDetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { node: null, loading: false, value: null, signing: false, approving: false, error: null }
  }

  static navigationOptions = ({ navigation }) => {
    const batchData = navigation.getParam('batchData')
    return {
      title: 'Execute Action',
      headerLeft: null,
      headerRight: <ActionBreadcrumb text={batchData.nodePath} />
    }
  };

  componentDidMount() {
    console.log('ActionDetailScreen:CDM')
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

  chooseNav(batchData) {
    const nav = this.props.navigation
    const result = CheckNav(batchData, nav, this.locationCode)
    this.setState({ loading: false, value: null })
    switch (result) {
      case NavResult.BATCH_COMPLETE:
        Alert.alert('Batch Complete', 'Batch is complete, select another batch')
        nav.replace('BatchList', { refresh: true })
        break
      case NavResult.STAGE_COMPLETE:
        Alert.alert('Stage Complete', 'Stage is complete, select another batch\nor move to another location.')
        nav.replace('BatchList', { refresh: true })
        break
      case NavResult.ACTION:
        //nav.replace('ActionDetail', { batchData, locationCode: this.locationCode })
        break
      case NavResult.CHOICE:
        nav.replace("NodeSelect", { batchData, locationCode: this.locationCode })
        break
      case NavResult.CONFIRM:
        nav.replace("NodeDetail", { batchData, locationCode: this.locationCode })
        break
      case NavResult.EXECUTE:
        this.batchData = batchData
        this.procID = batchData.nodes[0].procID
        this.completeAction('Y')
        break
      default:
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
        this.setState({ signing: true })
        break
      case 'approve':
        this.setState({ approving: true })
        break
      case 'comments':
        this.setState({ commenting: true })
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
        this.chooseNav(data)
      }).catch(error => {
        this.setState({ loading: false })
        Alert.alert('API Error', error.response.data.Message)
        console.log(JSON.stringify(error))
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
        this.chooseNav(data)
      }).catch(error => {
        this.setState({ loading: false })
        Alert.alert('API Error', error.response.data.Message)
        console.log(JSON.stringify(error))
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
      this.chooseNav(data)
    }).catch(error => {
      const msg = JSON.stringify(error)
      this.setState({ loading: false, error: msg})
    })
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
          <ActionTitle text={this.state.node.name} />
          <ActionButtons buttons={buttons} onPress={this.onPress} />
          <ScrollView style={{flex: 1}}>
            <KeyboardAvoidingView keyboardVerticalOffset={300} behavior='position' enabled={true}>
              <ActionPrompt prompt={node.prompt} notes={node.notes} />
              <WeighInfo weighData={node.weighing} />
              <ScrollView horizontal={true}>
                <HardwareDisplay node={node} />
              </ScrollView>
              <ActionImage fileName={node.picture} />
              <ActionEntry value={this.state.value} entry={entry} onChange={this.entryValueChange} enabled={enabled} useCamera={allowCam} />
              <FileContent fileName={node.fileName} />
              <ErrorBar text={this.state.error} onPress={() => this.setState({ error: null })} />
              {/* These are all modal */}
              <Comments visible={this.state.commenting} onComment={this.onComment} />
              <Signature visible={this.state.signing} onSign={this.signed} isApproval={false} />
              <Signature visible={this.state.approving} onSign={this.approved} isApproval={true} />
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
