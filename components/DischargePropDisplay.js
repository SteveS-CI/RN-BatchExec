import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import SmallPropWindow from './SmallPropWindow';
import NexaColours from '../constants/NexaColours';
import { EquipmentProps, ComponentProps } from './SmallDisplayProps';

export default class DischargePropDisplay extends PureComponent {
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
    const hasData = (node && node.actionType === 'Discharge');
    if (hasData) {
      const equip = EquipmentProps(node.equipment);
      const comp = ComponentProps(node.component);
      const arrow = <FontAwesome style={{ fontSize: 32, marginHorizontal: 8, marginTop: 36 }}>{Icons.chevronRight}</FontAwesome>;
      return (
        <View style={this.styles.container}>
          {equip}
          {arrow}
          {comp}
        </View>
      );
    }
    return null;
  }
}
