import React from 'react';
import PropTypes from 'prop-types';
import { Alert, ScrollView, View } from 'react-native';
import i18n from 'i18n-js';
import ScreenHeader from '../components/ScreenHeader';
import Settings from '../Store/Settings';
import SwitchSetting from '../components/SwitchSetting';
import TextSetting from '../components/TextSetting';
import PickerSetting from '../components/PickerSetting';

export default class SettingsScreen extends React.Component {
  static propTypes = {
    screenProps: PropTypes.object.isRequired,
    navigation: PropTypes.shape({
      navigation: PropTypes.object,
    }).isRequired,
  }

  static navigationOptions = () => ({
    title: i18n.t('screens.settings.title'),
  })

  languages = [
    {
      label: i18n.t('languages.english'),
      value: 'en',
    },
    {
      label: i18n.t('languages.french'),
      value: 'fr',
    },
    {
      label: i18n.t('languages.spanish'),
      value: 'es',
    },
  ]

  constructor(props) {
    super(props);
    this.state = { settings: null };
  }

  componentDidMount() {
    Settings.readSettings().then((result) => {
      if (!result) {
        // Default settings object
        const settings = {
          apiUrl: '',
          useDarkTheme: false,
          language: 'en',
        };
        this.setState({ settings });
      } else {
        this.setState({ settings: result });
      }
    }).catch(() => {
      Alert.alert('Failed to read settings');
    });
  }

  update = (doSave) => {
    const { screenProps } = this.props;
    const { settings } = this.state;
    if (doSave) {
      Settings.saveSettings(settings).then(() => {
        screenProps.refresh();
      });
    } else {
      this.returnToMain();
    }
  }

  onThemeChange = (value) => {
    const { settings } = this.state;
    settings.useDarkTheme = value;
    this.setState({ settings });
  }

  onUrlChange = (value) => {
    const { settings } = this.state;
    settings.apiUrl = value;
    this.setState({ settings });
  }

  onLangChange = (language) => {
    const { settings } = this.state;
    settings.language = language.value;
    this.setState({ settings });
  }

  returnToMain() {
    const { navigation } = this.props;
    navigation.navigate('BatchList');
  }

  render() {
    const { settings } = this.state;
    return (
      settings
        ? (
          <View>
            <ScreenHeader
              onCancel={() => this.update(false)}
              onOK={() => this.update(true)}
              okCaption={i18n.t('button.captions.save')}
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
        )
        : null
    );
  }
}
