import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'
import { GestureHandler } from 'expo'
import Layout, { scale, moderateScale, FontSizes } from '../constants/Layout'
import NexaColours from '../constants/NexaColours';

const { PanGestureHandler, TapGestureHandler } = GestureHandler

const styles = StyleSheet.create({
  balance: {
    alignSelf: 'center',
    backgroundColor: NexaColours.GreyUltraLight,
    margin: scale(12), padding: scale(8),
    borderColor: NexaColours.GreyDarkest,
    borderRadius: scale(12), borderWidth: StyleSheet.hairlineWidth * moderateScale(5),
    fontSize: FontSizes.balance, fontFamily: 'euro-demi',
    minWidth: '50%'
  },
  bar: {
    height: 30,
  },
  limits: {
    position: 'absolute',
    top: 0,
    height: 30,
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderLeftWidth: StyleSheet.hairlineWidth * 2,
    borderRightWidth: StyleSheet.hairlineWidth * 2,
  }
})

const round = value => Math.round(value * 1000) / 1000

export default class VirtualBalance extends Component {
  constructor(props) {
    super(props)
    this.state = { scaleValue: 0, barRawValue: 0, maxWidth: null }
  }

  static defaultProps = {
    lower: 0,
    upper: 0
  }

  static propTypes = {
    target: PropTypes.number,
    lower: PropTypes.number,
    upper: PropTypes.number
  }

  onPan = (e) => {
    const x = e.nativeEvent.x
    const range = this.props.upper + ((this.props.upper - this.props.lower) * 2)
    const val = round((x / this.state.maxWidth) * range)
    this.setState({ barRawValue: x, scaleValue: val })
  }

  onLayout = (e) => {
    this.setState({ maxWidth: e.nativeEvent.layout.width })
  }

  render() {
    const scaleValue = this.state.scaleValue
    const maxWidth = this.state.maxWidth
    const barRawValue = this.state.barRawValue
    const inSpec = (scaleValue >= this.props.lower && scaleValue <= this.props.upper)
    const barColor = inSpec ? NexaColours.Green : NexaColours.Red
    const barWidth = this.state.maxWidth ? barRawValue : 0
    const barStyle = StyleSheet.flatten([styles.bar, { width: barWidth, backgroundColor: barColor }])
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.balance} >{scaleValue}</Text>
        </View>
        <PanGestureHandler onGestureEvent={this.onPan} activeOffsetX={[0, 0]} >
          <View onLayout={this.onLayout} style={{ flexDirection: 'column', marginHorizontal: 12, backgroundColor: NexaColours.White, height: 30 }}>
            <View style={barStyle} />
            <View style={styles.limits} />
          </View>
        </PanGestureHandler>
      </View>
    )
  }
}