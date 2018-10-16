import React from 'react';
import { View, Text, Button } from 'react-native'
import TextBar from '../components/TextBar'
import NexaColours from '../constants/NexaColours'
import {ActionTitle, ActionPrompt} from '../components/ActionElements'
 
export default class ActionDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {node: null, loading: false}
  }

  static navigationOptions = {
    title: 'Execute Action',
  };

  componentDidMount() {
    const batchData = this.props.navigation.getParam("batchData")
    this.batchData = batchData
    const node = batchData.nodes[0]
    const locationCode = this.props.navigation.getParam("locationCode")
    this.locationCode = locationCode
    console.log(JSON.stringify(node))
    this.setState({node})
  }

  render() {
    const nav = this.props.navigation
    const node = this.state.node
    if (node) {
      return (
        <View style={{flex: 1}}>
          <ActionTitle backColor={NexaColours.AlertCyan} title={this.state.node.name}/>
          {node.prompt && <ActionPrompt prompt={node.prompt}/>}
        </View>
      )
    } else {
      return (null)
    }
  }
}
