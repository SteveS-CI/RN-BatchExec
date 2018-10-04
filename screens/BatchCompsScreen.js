import React from 'react';
import { View, Text, Button } from 'react-native'

export default class BatchCompsScreen extends React.Component {
  static navigationOptions = {
    title: 'Components',
  };

  render() {
    const nav = this.props.navigation
    return (
      <View>
        <Text>This screen will show the selected batch Components</Text>
      </View>
    )
  }
}
