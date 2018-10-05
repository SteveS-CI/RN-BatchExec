import React from 'react';
import {StyleSheet, ScrollView, Switch, View, Text, TextInput, TouchableHighlight, Button } from 'react-native';
import RoundedButton from '../components/RoundedButton'
import Settings from '../Store/Settings';
import NexaColours from '../constants/NexaColours';
import SwitchSetting from '../components/SwitchSetting'
import TextSetting from '../components/TextSetting'

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {settings: null}
  }
  
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Settings'
    };
  }
  
  componentDidMount() {
    Settings.readSettings().then((result) => {
      if (!result) {
        // Default settings object
        const settings = {
          apiUrl: '',
          useDarkTheme: false
        }
        this.setState({settings})
      } else {
        this.setState({settings: result})
      }
    }).catch((error) => {
      console.log(JSON.stringify(error))
      Alert.alert('Failed to read settings')
    })
  }

  update = (doSave) => {
    if (doSave) {
      Settings.saveSettings(this.state.settings).then(this.returnToMain())
    } else {
      this.returnToMain()
    }   
  }

  returnToMain() {
    this.props.navigation.navigate('Main')
  }

  onThemeChange = (value) => {
    let settings = this.state.settings
    settings.useDarkTheme = value
    this.setState({settings})
  }

  onUrlChange = (value) => {
    let settings = this.state.settings
    settings.apiUrl = value
    this.setState({settings})
  }

  render() {
    const settings = this.state.settings
    console.log(JSON.stringify(settings))
    return (
      settings ? 
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <RoundedButton title='Cancel' onPress={() => this.update(false)} backColor={NexaColours.AlertYellow}/>
          <RoundedButton title='Save' onPress={() => this.update(true)}/>
        </View>
        <ScrollView>
          <TextSetting
            value={settings.apiUrl}
            onValueChange={this.onUrlChange}
            title='API Url'
          />
          <SwitchSetting
            value={settings.useDarkTheme}
            onValueChange={this.onThemeChange}
            title='Use Dark Theme'
            subTitle='Show darker backgrounds with light text'
          />
        </ScrollView>
      </View>
      : null
    )
  }
}
