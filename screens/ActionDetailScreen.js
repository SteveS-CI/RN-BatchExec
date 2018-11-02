import React from 'react';
import { View, Text, Button } from 'react-native'
import ActionButtons, { ButtonStyles } from '../components/ActionButtons'
import NexaColours from '../constants/NexaColours'
import { ActionBreadcrumb, ActionTitle, ActionPrompt } from '../components/ActionElements'

export default class ActionDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { node: null, loading: false }
    this.methods = this.props.screenProps
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
        this.setState({loading: true})
        this.methods.completeAction(this.batchData.batchID, this.procID, '', this.locationCode).then(response => {
          console.log('got data:',JSON.stringify(response))
          this.batchData = response.data
          this.chooseNav()
          this.setState({loading: false})
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
    if (batchData.nodes.length > 1) {
      // Multiple nodes
      nav.navigate("NodeSelect", {
        batchData,
        locationCode: this.locationCode
      });
    } else {
      // Single nodes
      if (batchData.nodeDepth === 3) {
        // Action node - just change state
        this.setState({node: this.batchData.nodes[0]})
      } else {
        // Operation/Stage/Process - for Confirmation/Signature/Approval
        nav.navigate("NodeDetail", {
          batchData,
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
        </View>
      )
    } else {
      return (null)
    }
  }
}
