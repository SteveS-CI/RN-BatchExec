import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'
import { GestureHandler } from 'expo'
import Layout, { scale, moderateScale, FontSizes } from '../constants/Layout'
import NexaColours from '../constants/NexaColours';

const { PanGestureHandler } = GestureHandler

const styles = StyleSheet.create({
  balance: {
    alignSelf: 'center',
    backgroundColor: NexaColours.GreyUltraLight,
    margin: scale(12), padding: scale(8),
    borderColor: NexaColours.GreyDarkest,
    borderRadius: scale(12), borderWidth: StyleSheet.hairlineWidth * moderateScale(5),
    fontSize: FontSizes.balance, fontFamily: 'euro-demi',
    minWidth: '50%'
  }
})

export default class VirtualBalance extends Component {
  constructor(props) {
    super(props)
    this.state = { value: 0 }
  }

  static propTypes = {
    target: PropTypes.number
  }

  onPan = (e) => {
    const { absoluteX, absoluteY, velocityX, velocityY, translationX, translationY, x, y, state } = e.nativeEvent
    const vx = Math.round(velocityX)
    const vy = Math.round(velocityY)
    const ax = absoluteX / Layout.screen.width
    const ay = absoluteY / Layout.screen.height
    const rx = Math.round(x)
    const ry = Math.round(y)

    const dx = Math.sign(ax-this.lastX)
    const dy = Math.sign(ay-this.lastY)

    //console.log('DX:', dx, '  DY:', dy)
    //console.log('VX:', vx, '  VY:', vy)
    console.log('AX:', ax, '  AY:', ay)
    //console.log('RX:', rx, '  RY:', ry)
    //console.log('TX:', Math.trunc(translationX/20), '  TY:', Math.trunc(translationY/20))

    this.lastX = ax
    this.lastY = ay

  }

  render() {
    value = this.state.value
    return (
      <PanGestureHandler
        onGestureEvent={this.onPan}
        activeOffsetX={[-10, 10]}
        activeOffsetY={[-10, 10]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.balance} >{value}</Text>
        </View>
      </PanGestureHandler>
    )
  }
}