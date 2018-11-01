import React from 'react'
import { View, Text, Button } from 'react-native'

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Log In'
  }

  render() {
    return (
      <View>
        <Text>This is the login screen</Text>
        <Button title='Login (simulated)' onPress={() => { this.props.navigation.navigate('BatchSelect') }} />
      </View>
    )
  }
}
