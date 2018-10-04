import React from 'react';
import { View, Text, TextInput, TouchableHighlight, Button } from 'react-native';
import { SecureStore } from 'expo';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {settings: null}
    SecureStore.deleteItemAsync('settings')
  }
  
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Settings'
    };
  }
  
  componentDidMount() {
    SecureStore.getItemAsync('settings').then((result) => {
      let settings = JSON.parse(result)
      if (!result) {
        // Default settings object
        settings = {
          ApiUrl: '',
          useDarkTheme: false
        }
      }
      this.setState({settings})
    }).catch((error) => {
      console.log(JSON.stringify(error))
      Alert.alert('Failed to read settings')
    })
  }

  update = (doSave) => {
    if (doSave) {
      const settings = JSON.stringify(this.state.settings)
      SecureStore.setItemAsync('settings', settings).then(this.returnToMain())
    } else {
      this.returnToMain()
    }   
  }

  returnToMain() {
    this.props.navigation.navigate('Main')
  }

  render() {
    const settings = this.state.settings
    return (
      settings && 
      <View>
        <View>
          <Text>{JSON.stringify(settings.ApiUrl)}</Text>
          <Text>{JSON.stringify(settings.useDarkTheme)}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button title='Cancel' onPress={() => this.update(false)}/>
          <Button title='Save' onPress={() => this.update(true)}/>
        </View>
      </View>
    )
  }
}
