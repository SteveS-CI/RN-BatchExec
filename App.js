import React from 'react';
import Expo from 'expo';
import { Platform, StatusBar, StyleSheet, View, Alert } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';

import Settings from './Store/Settings'
import api, {methods} from './api/api';
import store from './Store/store'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.ALL)
    this.state = {isLoadingComplete: false, mocked: false}
  }

  appReload = () => {
    Expo.Updates.reload()
  }

  appRefresh = () => {
    this.setState({isLoadingComplete: false})
  }

  render() {
    const functions = {
      mocked: this.state.mocked, 
      reload: this.appReload, 
      refresh: this.appRefresh,

      getLocations: methods.getLocations,
      getBatchList: methods.getBatchList,
      getBatch: methods.getBatch,
      nextProc: methods.nextProc,
      completeAction: methods.completeAction,
      confirmAction: methods.confirmAction,
      signAction: methods.signAction,
      approveAction: methods.approveAction
    }
    store.setMocked(false)
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
        <View style={styles.container}>
          <AppNavigator screenProps={functions} />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/nexa-icon.png'),
        require('./assets/images/nexa-logo-be.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        'euro-bold': require('./assets/fonts/Eurostile-Bold.otf'),
        'euro-demi': require('./assets/fonts/Eurostile-Demi.otf'),
        'euro-ext-bold': require('./assets/fonts/Eurostile-Extended-Bold.otf'),
        'euro-ext': require('./assets/fonts/Eurostile-Extended.otf'),
        'euro-std': require('./assets/fonts/Eurostile-Regular.otf')
      }),
      Settings.readSettings().then((settings) => {api.defaults.baseURL = settings.apiUrl})
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    methods.getInfo().then((response) => {
      this.setState({ isLoadingComplete: true })
    }).catch((error) => {
      store.setMocked(true)
      Alert.alert('Network Error', error.message + '\nPlease check your settings')
      this.setState({ isLoadingComplete: true });
    })
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
});
