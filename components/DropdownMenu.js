import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, findNodeHandle, NativeModules } from 'react-native';
//import {NativeModules} from 'expo';
import i18n from 'i18n-js'
import Settings from '../Store/Settings'
import NexaIcon from '../assets/images/nexa-icon-r.png'
import {BackHandler} from 'react-native'
import {FontSizes} from '../constants/Layout'

const ImageSize = FontSizes.menuIconSize

export default class DropdownMenu extends Component {
  constructor(props) {
    super(props)
    this.items = []
    this.props.data.labels.map(item => {
      this.items.push(i18n.t('menus.dropdown.' + item))
    })
  }

  onMenuPressed = (labels) => {
    const { navigation } = this.props;

    NativeModules.UIManager.showPopupMenu(
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
          <TouchableOpacity onPress={() => this.onMenuPressed(this.items)}>
            <Image source={NexaIcon} style={{height: ImageSize, width: ImageSize, marginLeft: 8}}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}