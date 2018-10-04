import React, { Component } from 'react';
import { View, TouchableHighlight, TouchableOpacity, Image, StyleSheet, NativeModules, findNodeHandle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
            if (action==='EXIT') {
              BackHandler.exitApp()
            } else {
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