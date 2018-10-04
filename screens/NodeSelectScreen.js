import React from 'react';
import { View, Text, Button } from 'react-native'

export default class NodeSelectScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Node Selection',
      headerRight: <Button title='Next' onPress={() => navigation.navigate('NodeDetail')} />
    }
  };

  render() {
    const nav = this.props.navigation
    return (
      <View>
        <Text>This is where you would select a single node from a list.</Text>
        <Text>The node types could be Stages, Operations or Actions.</Text>
      </View>
    )
  }
}
