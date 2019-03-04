import React, { Component } from 'react';
import {
  Modal, View, TouchableOpacity, TouchableWithoutFeedback, Image, StyleSheet, Text,
} from 'react-native';
import i18n from 'i18n-js';
import { BackHandler } from 'react-native';
import NexaIcon from '../assets/images/nexa-icon-r.png';
import { FontSizes } from '../constants/Layout';
import NexaColours from '../constants/NexaColours';

const ImageSize = FontSizes.menuIconSize;
const MenuPos = (FontSizes.menuIconSize / 2) + 8;

const styles = StyleSheet.create({
  inner: {
    position: 'absolute',
    top: MenuPos,
    left: MenuPos,
    backgroundColor: NexaColours.White,
  },
  menuItem: {
    fontSize: FontSizes.standard,
    margin: 8,
  },
  outer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default class DropdownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.items = [];
    this.props.data.labels.map((item) => {
      this.items.push(i18n.t(`menus.dropdown.${item}`));
    });
  }

  menuClick = (action) => {
    console.log(action);
    switch (action) {
      case 'EXIT':
        BackHandler.exitApp();
        break;
      default:
        this.props.navigation.navigate(action);
    }
    this.setState({ show: false });
  }

  render() {
    const { routeName } = this.props.navigation.state;
    const menu = this.items.map((label, index) => {
      const action = this.props.data.actions[index];
      const disabled = (action === routeName);
      const itemColor = disabled ? NexaColours.Grey : NexaColours.Black;
      const itemStyle = StyleSheet.flatten([styles.menuItem, { color: itemColor }]);
      return (
        <TouchableOpacity key={index} onPress={() => this.menuClick(action)} disabled={disabled}>
          <Text style={itemStyle}>{label}</Text>
        </TouchableOpacity>
      );
    });
    return (
      <View>

        <TouchableOpacity onPress={() => this.setState({ show: true })}>
          <Image source={NexaIcon} style={{ height: ImageSize, width: ImageSize, marginLeft: 8 }} />
        </TouchableOpacity>

        <Modal visible={this.state.show} onRequestClose={() => this.menuClick('cancel')} transparent>

          <TouchableWithoutFeedback onPress={() => this.menuClick('cancel')}>
            <View style={styles.outer} />
          </TouchableWithoutFeedback>

          <View style={styles.inner}>
            {menu}
          </View>

        </Modal>

      </View>
    );
  }
}
