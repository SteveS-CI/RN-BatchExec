import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import NexaColours from '../constants/NexaColours';
import {ContainerProps} from './SmallDisplayProps'

export default class PrintLabelProps extends PureComponent {

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
    const hasData = (node && node.actionType === 'PrintLabel')
    if (hasData) {
      const cont = ContainerProps(node.equipment)
      return (
        <View style={this.styles.container}>
          {cont}
        </View>
      )
    } else {
      return null
    }
  }
}
