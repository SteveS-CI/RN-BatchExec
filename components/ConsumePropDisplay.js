import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import FontAwesome, { Icons } from 'react-native-fontawesome';
import NexaColours from '../constants/NexaColours';
import {EquipmentProps, WeighingProps} from './SmallDisplayProps'

export default class ConsumePropDisplay extends PureComponent {

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
    const hasData = (node && node.actionType === 'WeighConsume')
    if (hasData) {
      const equip = EquipmentProps(node.equipment)
      const weigh = WeighingProps(node.weigh)
      const arrow = <FontAwesome style={{ fontSize: 32, marginHorizontal: 8, marginTop: 36 }}>{Icons.chevronRight}</FontAwesome>
      return (
        <View style={this.styles.container}>
          {weigh}
          {arrow}
          {equip}
        </View>
      )
    } else {
      return null
    }
  }
}
