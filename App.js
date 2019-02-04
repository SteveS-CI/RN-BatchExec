import React from 'react';
import {StyleSheet, View, Alert } from 'react-native';
import {ScreenOrientation, Updates, AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import i18n from 'i18n-js';
import Settings from './Store/Settings'
import api, {methods} from './api/api';
import * as Translations from './constants/translations'
import { AsyncStorage } from 'react-native'

import {setTheme} from './constants/Styles'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL)
    this.state = {isLoadingComplete: false, toggle: false}
  }
  
  appReload = () => {
    Updates.reload()
  }

  appRefresh = () => {
    this.setState({isLoadingComplete: false})
  }

  render() {
    const functions = {
      update: this.appReload, 
      refresh: this.appRefresh
    }
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container} toggle={this.state.toggle}>
          <AppNavigator screenProps={functions}/>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/nexa-icon-r.png'),
        require('./assets/images/nexa-logo-be.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        'euro-bold': require('./assets/fonts/Eurostile-Bold.otf'),
        'euro-demi': require('./assets/fonts/Eurostile-Demi.otf'),
        'euro-ext-bold': require('./assets/fonts/Eurostile-Extended-Bold.otf'),
        'euro-ext': require('./assets/fonts/Eurostile-Extended.otf'),
        'euro-std': require('./assets/fonts/Eurostile-Regular.otf'),
        'fa_solid_900': require('./assets/fonts/fa-solid-900.ttf')
      }),
      AsyncStorage.getItem('settings').then((result) => {
        const settings = JSON.parse(result)
        api.defaults.baseURL = settings.apiUrl

        i18n.fallbacks = true;
        i18n.translations = Translations;
        i18n.locale = settings.language

        setTheme(settings.useDarkTheme ? 'dark' : 'light')
  
      }).catch((error) => {
        // could not read settings, create defaults
        const defaults = {
          apiUrl: 'http://192.168.1.182:8080/api',
          useDarkTheme: false,
          language: 'en'
        }
        api.defaults.baseURL = defaults.apiUrl

        i18n.fallbacks = true;
        i18n.translations = Translations;
        i18n.locale = defaults.language

        setTheme(defaults.useDarkTheme ? 'dark' : 'light')
        
        Settings.saveSettings(defaults)
      })
    ])
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    console.log('Checking API address')
    methods.getInfo().then((response) => {
      this.setState({ isLoadingComplete: true })
    }).catch((error) => {
      Alert.alert('Network Error', error.message + '\nPlease check your settings')
      this.setState({ isLoadingComplete: true });
    })
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AAF'
  },
});
