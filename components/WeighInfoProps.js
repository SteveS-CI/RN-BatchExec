import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import {WeighingProps} from './SmallDisplayProps'

export default class WeighInfoProps extends PureComponent {

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
    const hasData = (node && node.actionType === 'WeighInfo')
    if (hasData) {
      const weigh = WeighingProps(node.weigh)
      return (
        <View style={this.styles.container}>
          {weigh}
        </View>
      )
    } else {
      return null
    }
  }
}
