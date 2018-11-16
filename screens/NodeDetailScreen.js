import React from 'react';
import { View, Text, Button } from 'react-native'

export default class NodeDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { batchData: null};
  }

  static navigationOptions = { 
    title: "Node Details",
    headerLeft: null
  };

  componentDidMount() {
    const batchData = this.props.navigation.getParam("batchData")
    const locationCode = this.props.navigation.getParam("locationCode")
    this.locationCode = locationCode
    this.setState({ batchData })
  }

  render() {
    if (this.state.batchData) {
      const data = this.state.batchData
      const node = data.nodes[0]
      return (
        <View>
          <Text>This is where you would Confirm, Sign or Approve a node.</Text>
          <Text>The node type could be a Process, a Stage or an Operation.</Text>
          <Text>{data.nodeDepth}</Text>
          <Text>{node.name}</Text>
        </View>
      )
    } else {
      return null
    }
  }
}
