import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import {EquipmentProps} from './SmallDisplayProps';

export default class IdentEquipmentProps extends PureComponent {

  styles = StyleSheet.create({
    container: {
      flexDirection: 'row'
    }
  })

  static propTypes = {
    node: PropTypes.object
  }

  render() {
    const node = this.props.node
    const hasData = (node && node.actionType === 'IdentifyEquipment')
    if (hasData) {
      const equip = EquipmentProps(node.equipment)
      return (
        <View style={this.styles.container}>
          {equip}
        </View>
      )
    } else {
      return null
    }
  }
}
