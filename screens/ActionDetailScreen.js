import React from 'react';
import { View, Text, Button } from 'react-native'
import PromptText from '../components/PromptText'
import NexaColours from '../constants/NexaColours'

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
    return (
      <View style={{flex: 1}}>
        {this.state.node && <PromptText backColor={NexaColours.AlertCyan}>{this.state.node.name}</PromptText>}
      </View>
    )
  }
}
