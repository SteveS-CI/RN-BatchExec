import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import SmallPropWindow from './SmallPropWindow';
import NexaColours from '../constants/NexaColours';
import { EquipmentProps, ComponentProps } from './SmallDisplayProps';
import { FontSizes } from '../constants/Layout';

export default class AdditionPropDisplay extends PureComponent {
  styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginHorizontal: 8,
      backgroundColor: 'white', // NexaColours.GreyLight,
      borderColor: NexaColours.GreyDarkest,
      borderWidth: StyleSheet.hairlineWidth * 2,
      borderRadius: 12,
    },
  })

  static propTypes = {
    node: PropTypes.object,
  }

  render() {
    const { node } = this.props;
    const hasData = (node && node.actionType === 'Addition');
    if (hasData) {
      const equip = EquipmentProps(node.equipment);
      const comp = ComponentProps(node.component);
      const arrow = <FontAwesome style={{ fontSize: FontSizes.iconButton, marginHorizontal: 8, marginTop: 36 }}>{Icons.chevronRight}</FontAwesome>;
      return (
        <View style={this.styles.container}>
          {comp}
          {arrow}
          {equip}
        </View>
      );
    }
    return null;
  }
}
