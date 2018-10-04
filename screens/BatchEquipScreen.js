import React from 'react';
import { View, Text, Button } from 'react-native'

export default class BatchEquipScreen extends React.Component {
  static navigationOptions = {
    title: 'Equipment',
  };

  render() {
    const nav = this.props.navigation
    return (
      <View>
        <Text>This screen will show the selected batch Equipment</Text>
      </View>
    )
  }
}
