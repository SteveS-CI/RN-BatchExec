import React from 'react';
import { View, Text, Button } from 'react-native'

export default class NodeDetailScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Node Details',
      headerRight: <Button title='Next' onPress={() => navigation.navigate('ActionDetail')} />
    }
  };

  render() {
    const nav = this.props.navigation
    return (
      <View>
        <Text>This is where you would Confirm, Sign or Approve a node.</Text>
        <Text>The node type could be a Process, a Stage or an Operation.</Text>
      </View>
    )
  }
}
