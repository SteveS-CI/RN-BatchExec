import React, { Component } from 'react';
import { View, TouchableHighlight, TouchableOpacity, Image, StyleSheet, NativeModules, findNodeHandle } from 'react-native';
import Expo from 'expo';

import Settings from '../Store/Settings'
import NexaIcon from '../assets/images/nexa-icon.png'
import {BackHandler} from 'react-native'

const UIManager = NativeModules.UIManager;

export default class DropdownMenu extends Component {
  onMenuPressed = (labels) => {
    const { navigation } = this.props;

    UIManager.showPopupMenu(
      findNodeHandle(this.menu),
      labels,
      () => {},
      (result, index) => {
        if (navigation) {
          const action = this.props.data.actions[index]
          if (action) {
            switch (action) {
              case 'EXIT':
                BackHandler.exitApp()
                break
              case 'CLEAR':
                // Clear settings and restart
                Settings.removeItem('location').then(() => Expo.Updates.reload())
                break
              default:
                navigation.navigate(action)
            }
          }
        }
      },
    );
  };

  render() {
    const labels = this.props.data.labels;

    return (
      <View style={{flexDirection: 'row'}}>
        <View>
          <View
            ref={c => this.menu = c}
            style={{
              backgroundColor: 'transparent',
              width: 1,
              height: StyleSheet.hairlineWidth,
            }}
          />
          <TouchableOpacity onPress={() => this.onMenuPressed(labels)}>
            <Image source={NexaIcon} style={{height: 40, width: 40, marginLeft: 8}}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}