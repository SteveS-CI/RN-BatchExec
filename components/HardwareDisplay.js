import React, { PureComponent } from 'react'
import {View } from 'react-native'
import PropTypes from 'prop-types'
import SmallPropWindow from './SmallPropWindow'
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class HardwareDisplay extends PureComponent {

  static propTypes = {
    node: PropTypes.object
  }

  equipmentHeaders = [
    { caption: 'Category', source: 'category' },
    { caption: 'Model', source: 'model' },
    { caption: 'Serial No', source: 'serialNumber' }
  ]

  componentHeaders = [
    { caption: 'Line', source: 'lineNumber' },
    { caption: 'Code', source: 'materialCode' },
    { caption: 'Name', source: 'materialName' },
    { caption: 'Quantity', source: 'quantity' }
  ]

  getElements = (node) => {
    const type = node.actionType
    const equipCaption = (type == 'PrintLabel' || type == 'IdentifyContainer') ? 'Container' : 'Equipment'
    // only two elements needed
    const equip = <SmallPropWindow title={equipCaption} headers={this.equipmentHeaders} data={node.equipment} baseBackColor='Yellow'/>
    const comp = <SmallPropWindow title='Component' headers={this.componentHeaders} data={node.component} baseBackColor='Green'/>
    const arrow = <FontAwesome style={{fontSize: 32, marginLeft: 48}}>{Icons.chevronDown}</FontAwesome>
    // only Addition and Discharge have both Equipment and Component
    if (type == 'Addition') {
      return (
        <View style={{flexDirection: 'column'}}>
          {comp}
          {arrow}
          {equip}
        </View>
      )
    } else if (type == 'Discharge') {
      return (
        <View style={{flexDirection: 'column'}}>
          {equip}
          {arrow}
          {comp}
        </View>
      )
    } else {
      return (
        <View style={{flexDirection: 'column'}}>
          {equip}
          {comp}
        </View>
      )
    }
  }

  render() {
    const node = this.props.node
    const hasData = (node && (node.equipment || node.component))
    if (hasData) {
      console.log(node)
      const elements = this.getElements(node)
      return (
        <View>
          {elements}
        </View>
      )
    } else {
      return null
    }
  }
}
