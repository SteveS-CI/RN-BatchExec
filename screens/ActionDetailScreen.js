import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native'
import ActionButtons, { ButtonStyles } from '../components/ActionButtons'
import NexaColours from '../constants/NexaColours'
import { ActionBreadcrumb, ActionTitle, ActionPrompt } from '../components/ActionElements'
import { methods } from '../api/api'
import LoadingOverlay from '../components/LoadingOverlay';

export default class ActionDetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { node: null, loading: false }
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

  onPress = (name) => {
    switch (name) {
      case 'cancel':
        this.props.navigation.navigate('BatchList')
        break
      case 'ok':
        console.log('ok')
        this.setState({node: null, loading: true})
        methods.completeAction(this.batchData.batchID, this.procID, '', this.locationCode).then(data => {
          console.log('got data:',JSON.stringify(data))
          this.batchData = data
          console.log('Will choose Nav')
          this.chooseNav()
        }).catch(error => {
          console.log(JSON.stringify(error))
        })
        break
      default:
    }
  }

  chooseNav() {
    console.log('chooseNav')
    const nav = this.props.navigation
    // depending on data shape, navigate to the appropriate screen, passing batchData
    if (this.batchData.nodes.length === 0) {
      Alert.alert('Batch Complete','Your are all done!')
      nav.navigate('BatchList', {refresh: true})
    } else if (this.batchData.nodes.length > 1) {
      // Multiple nodes
      nav.navigate("NodeSelect", {
        batchData: this.batchData,
        locationCode: this.locationCode
      });
    } else {
      console.log('Single Node')
      // Single nodes
      if (this.batchData.nodeDepth === 3) {
        console.log('Action Node')
        // Action node - just change state
        this.setState({node: this.batchData.nodes[0], loading: false})
      } else {
        console.log('Node Detail...')
        // Operation/Stage/Process - for Confirmation/Signature/Approval
        nav.navigate("NodeDetail", {
          batchData: this.batchData,
          locationCode: this.locationCode
        });
      }
    }
  }

  render() {
    const nav = this.props.navigation
    const node = this.state.node
    if (node) {
      return (
        <View style={{flex: 1}}>
          <ActionTitle backColor={NexaColours.AlertCyan} text={this.state.node.name}/>
          <ActionButtons buttons={[ButtonStyles.OK]} onPress={this.onPress}/>
          {node.prompt && <ActionPrompt text={node.prompt}/>}
          <LoadingOverlay loading={this.state.loading} />
        </View>
      )
    } else {
      return (null)
    }
  }
}
