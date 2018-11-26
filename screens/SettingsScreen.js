import React from 'react';
import { StyleSheet, ScrollView, Switch, View, Text, TextInput, TouchableHighlight, Button } from 'react-native';
import ScreenHeader from '../components/ScreenHeader'
import RoundedButton from '../components/RoundedButton'
import Settings from '../Store/Settings';
import NexaColours from '../constants/NexaColours';
import SwitchSetting from '../components/SwitchSetting'
import TextSetting from '../components/TextSetting'
import PickerSetting from '../components/PickerSetting'
import ButtonBar from '../components/ButtonBar'
import i18n from 'i18n-js'

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { settings: null }
  }

  languages = [
    {
      label: i18n.t("languages.english"),
      value: 'en'
    },
    {
      label: i18n.t("languages.french"),
      value: 'fr'
    },
    {
      label: i18n.t("languages.spanish"),
      value: 'es' },
  ]
  
  componentDidMount() {
    Settings.readSettings().then((result) => {
      if (!result) {
        // Default settings object
        const settings = {
          apiUrl: '',
          useDarkTheme: false,
          language: 'en'
        }
        this.setState({ settings })
      } else {
        this.setState({ settings: result })
      }
    }).catch((error) => {
      Alert.alert('Failed to read settings')
    })
  }

  update = (doSave) => {
    const screenProps = this.props.screenProps
    if (doSave) {
      Settings.saveSettings(this.state.settings).then(() => {
        screenProps.refresh()
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
    this.setState({ settings })
  }

  onUrlChange = (value) => {
    let settings = this.state.settings
    settings.apiUrl = value
    this.setState({ settings })
  }

  onLangChange = (value) => {
    let settings = this.state.settings
    settings.language = value
    this.setState({ settings })
  }

  render() {
    const settings = this.state.settings
    return (
      settings ?
        <View>
          <ScreenHeader
            onCancel={() => this.update(false)}
            onOK={() => this.update(true)}
            okCaption={i18n.t('button.captions.save')}
            title={i18n.t('screens.settings.title')}
          />
          <ScrollView style={{ borderTopWidth: 1 }}>
            <TextSetting
              value={settings.apiUrl}
              onValueChange={this.onUrlChange}
              title={i18n.t('screens.settings.api')}
            />
            <SwitchSetting
              value={settings.useDarkTheme}
              onValueChange={this.onThemeChange}
              title={i18n.t('screens.settings.theme')}
              subTitle={i18n.t('screens.settings.themeDescription')}
            />
            <PickerSetting
              value={settings.language}
              onValueChange={this.onLangChange}
              title={i18n.t('screens.settings.language')}
              values={this.languages}
            />
          </ScrollView>
        </View>
        : null
    )
  }
}
