import React from 'react';
import {StyleSheet, ScrollView, Switch, View, Text, TextInput, TouchableHighlight, Button } from 'react-native';
import RoundedButton from '../components/RoundedButton'
import Settings from '../Store/Settings';
import NexaColours from '../constants/NexaColours';
import SwitchSetting from '../components/SwitchSetting'
import TextSetting from '../components/TextSetting'
import PickerSetting from '../components/PickerSetting'
import ButtonBar from '../components/ButtonBar'

const languages = [
  {label: "English", value: 'en'},
  {label: "French", value: 'fr'},
  {label: "German", value: 'de'},
  {label: "Italian", value: 'it'},
  {label: "Spanish", value: 'es'},
]

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
          useDarkTheme: false,
          language: 'en'
        }
        this.setState({settings})
      } else {
        this.setState({settings: result})
      }
    }).catch((error) => {
      Alert.alert('Failed to read settings')
    })
  }

  update = (doSave) => {
    const screenProps = this.props.screenProps
    if (doSave) {
      Settings.saveSettings(this.state.settings).then(() => {
        screenProps.reload()
      })
    } else {
      this.returnToMain()
    }   
  }

  returnToMain() {
    const nav = this.props.navigation
    nav.navigate('Main')
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

  onLangChange = (value) => {
    let settings = this.state.settings
    settings.language = value
    this.setState({settings})
  }

  render() {
    const settings = this.state.settings
    console.log(JSON.stringify(settings))
    return (
      settings ? 
      <View>
        <ButtonBar justify='space-between'>
          <RoundedButton title='Cancel' onPress={() => this.update(false)} backColor={NexaColours.AlertYellow}/>
          <RoundedButton title='Save' onPress={() => this.update(true)}/>
        </ButtonBar>
        <ScrollView style={{borderTopWidth: 1}}>
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
          <PickerSetting
            value={settings.language}
            onValueChange={this.onLangChange}
            title='Language'
            values={languages}
          />
        </ScrollView>
      </View>
      : null
    )
  }
}
