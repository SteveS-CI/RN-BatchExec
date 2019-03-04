import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import SmallPropWindow from './SmallPropWindow';
import NexaColours from '../constants/NexaColours';

export default class HardwareDisplay extends PureComponent {
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

  equipmentHeaders = [
    { caption: 'Category', source: 'category' },
    { caption: 'Model', source: 'model' },
    { caption: 'Serial No', source: 'serialNumber' },
  ]

  componentHeaders = [
    { caption: 'Line', source: 'lineNumber' },
    { caption: 'Code', source: 'materialCode' },
    { caption: 'Name', source: 'materialName' },
    { caption: 'Quantity', source: 'quantity' },
  ]

  getElements = (node) => {
    const type = node.actionType;
    const equipCaption = (type == 'PrintLabel' || type == 'IdentifyContainer') ? 'Container' : 'Equipment';
    // only two elements needed
    const equip = <SmallPropWindow title={equipCaption} headers={this.equipmentHeaders} data={node.equipment} baseBackColor="Yellow" />;
    const comp = <SmallPropWindow title="Component" headers={this.componentHeaders} data={node.component} baseBackColor="Green" />;
    const arrow = <FontAwesome style={{ fontSize: 32, marginHorizontal: 8, marginTop: 36 }}>{Icons.chevronRight}</FontAwesome>;
    // only Addition and Discharge have both Equipment and Component
    if (type == 'Addition') {
      return (
        <View style={this.styles.container}>
          {comp}
          {arrow}
          {equip}
        </View>
      );
    } if (type == 'Discharge') {
      return (
        <View style={this.styles.container}>
          {equip}
          {arrow}
          {comp}
        </View>
      );
    }
    return (
      <View style={this.styles.container}>
        {equip}
        {comp}
      </View>
    );
  }

  render() {
    const { node } = this.props;
    const hasData = (node && (node.equipment || node.component));
    if (hasData) {
      const elements = this.getElements(node);
      return (
        <View>
          {elements}
        </View>
      );
    }
    return null;
  }
}
