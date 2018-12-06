import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import SmallPropWindow from './SmallPropWindow'
import FontAwesome, { Icons } from 'react-native-fontawesome';
import NexaColours from '../constants/NexaColours';
import {EquipmentProps, ComponentProps} from './SmallDisplayProps';

export default class AdditionPropDisplay extends PureComponent {

  styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginHorizontal: 8,
      backgroundColor: 'white',//NexaColours.GreyLight,
      borderColor: NexaColours.GreyDarkest,
      borderWidth: StyleSheet.hairlineWidth * 2,
      borderRadius: 12
    }
  })

  static propTypes = {
    node: PropTypes.object
  }

  render() {
    const node = this.props.node
    const hasData = (node && node.actionType === 'Addition')
    if (hasData) {
      const equip = EquipmentProps(node.equipment) // <SmallPropWindow title='Equipment' headers={this.equipmentHeaders} data={node.equipment} baseBackColor='Yellow' />
      const comp = ComponentProps(node.component) //<SmallPropWindow title='Component' headers={this.componentHeaders} data={node.component} baseBackColor='Green' />
      const arrow = <FontAwesome style={{ fontSize: 32, marginHorizontal: 8, marginTop: 36 }}>{Icons.chevronRight}</FontAwesome>
      return (
        <View style={this.styles.container}>
          {comp}
          {arrow}
          {equip}
        </View>
      )
    } else {
      return null
    }
  }
}
