import React from 'react';
import { View, Text, Button } from 'react-native'

export default class ActionDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Action Details',
  };

  render() {
    const nav = this.props.navigation
    return (
      <View>
        <Text>This screen shows the Action detail</Text>
      </View>
    )
  }
}
