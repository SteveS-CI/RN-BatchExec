import React from 'react';
import { View, Text, Button } from 'react-native'
import NexaColours from '../constants/NexaColours'

export default class BatchPropsScreen extends React.Component {
  static navigationOptions = {
    title: 'Properties',
    headerTintColor: NexaColours.LightGrey,
    headerStyle: {backgroundColor: NexaColours.Blue},
    headerTitleStyle: {fontFamily: 'eurostile', fontWeight: 'normal'},
  };

  render() {
    const nav = this.props.navigation
    return (
      <View>
        <Text>This screen will show the properties of the selected batch</Text>
      </View>
    )
  }
}
