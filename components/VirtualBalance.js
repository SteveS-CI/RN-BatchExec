import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'
import { GestureHandler } from 'expo'
import Layout, { scale, verticalScale, moderateScale, FontSizes } from '../constants/Layout'
import NexaColours from '../constants/NexaColours';
import i18n from 'i18n-js'
import { State } from 'react-native-gesture-handler';

const { PanGestureHandler, TapGestureHandler } = GestureHandler

const styles = StyleSheet.create({
  balance: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: NexaColours.GreyUltraLight,
    margin: scale(12),
    paddingHorizontal: scale(8), paddingVertical: verticalScale(4),
    borderColor: NexaColours.GreyDarkest,
    borderRadius: scale(12), borderWidth: scale(3),
    minWidth: '50%'
  },
  reading: {
    fontSize: FontSizes.balance, fontFamily: 'euro-demi',
  },
  uom: {
    marginLeft: scale(8),
    fontSize: FontSizes.standard, fontFamily: 'euro-demi'
  },
  info: {
    flexDirection: 'column',
    marginRight: scale(12)
  },
  outer: {
    flexDirection: 'column',
    marginHorizontal: scale(12),
    backgroundColor: NexaColours.White,
    height: verticalScale(32),
    borderWidth: StyleSheet.hairlineWidth
  },
  bar: {
    position: 'absolute',
    top: 0, left: 0,
    height: verticalScale(32),
  },
  limit: {
    position: 'absolute',
    top: verticalScale(8),
    height: verticalScale(16),
    backgroundColor: NexaColours.Black,
    width: scale(1)
  },
  target: {
    position: 'absolute',
    top: 0,
    height: verticalScale(32),
    backgroundColor: NexaColours.Black,
    width: scale(1)
  }
})

export default class VirtualBalance extends Component {
  constructor(props) {
    super(props)
    this.state = { scaleValue: 0, physBarPos: 0, physWidth: null }
  }

  static defaultProps = {
    decimalPlaces: 3
  }

  static propTypes = {
    target: PropTypes.number.isRequired,
    lower: PropTypes.number,
    upper: PropTypes.number,
    decimalPlaces: PropTypes.number,
    uom: PropTypes.string
  }

  componentDidMount() {
    this.locale = i18n.currentLocale()
    this.formats = i18n.translations[this.locale].formats
    // Shortened format function
    const options = {
      separator: this.formats.decimal,
      delimiter: this.formats.thousands,
      precision: this.props.decimalPlaces
    }
    this.formatNumber = value => i18n.toNumber(value, options)

    // Default values for limits (cannot use defaultProps coz I still want to know if limits were supplied)
    this.upper = this.props.upper ? this.props.upper : Number.MAX_VALUE
    this.lower = this.props.lower ? this.props.lower : 0
  }

  onTapped = (e) => {
    const state = e.nativeEvent.state
    if (state === State.END) {
      const barVal = this.scaleToPhys(this.props.target)
      this.setState({ physBarPos: barVal, scaleValue: this.props.target })
    }
  }

  onPan = (e) => {
    const x = e.nativeEvent.x
    const scale = this.physToScale(x - 1)
    this.setState({ physBarPos: x, scaleValue: scale })
  }

  onLayout = (e) => {
    // rawWidth = width of bar in device units
    this.physWidth = e.nativeEvent.layout.width
    this.physThreshold = this.physWidth * 0.5

    // scaleWidth = width of bar in scale units (calculated from limits and target?)
    //this.scaleWidth = this.props.upper ? this.props.upper * 1.333333 : this.props.target * 1.333333

    const limitDiff = (this.props.upper - this.props.lower)
    // scaleThreshold = scaled point at which resolution changes
    // i.e. values below will appear in the lower portion of the display bar
    // and values above this value will appear in the upper portion
    this.scaleThreshold = this.props.lower - (limitDiff / 2)

    // coarseScale = physical units per scale unit (lower graph)
    this.coarseScale = this.physThreshold / this.scaleThreshold
    // fineScale = physical units per scale unit (upper graph)
    this.fineScale = (this.physWidth - this.physThreshold) / (limitDiff * 2)

    // physical position of lower limit
    this.lowerPos = this.scaleToPhys(this.props.lower)
    // physical position of upper limit
    this.upperPos = this.scaleToPhys(this.props.upper)
    // physical position of target
    this.targetPos = this.scaleToPhys(this.props.target)

    this.setState({ physWidth: this.physWidth })
  }

  // converts a (scale) value to a physical position
  scaleToPhys(scale) {
    if (scale > this.scaleThreshold) {
      const phys = ((scale - this.scaleThreshold) * this.fineScale) + this.physThreshold
      return phys
    } else {
      const phys = (scale * this.coarseScale)
      return phys
    }
  }

  // converts a physical position into a scale value
  physToScale(phys) {
    if (phys > this.physThreshold) {
      const scale = ((phys - this.physThreshold) / this.fineScale) + this.scaleThreshold
      return scale
    } else {
      const scale = (phys / this.coarseScale)
      return scale
    }
  }

  inSpec() {
    return (this.state.scaleValue >= this.lower) && (this.state.scaleValue <= this.upper)
  }

  format(value) {
    return this.formatNumber ? this.formatNumber(value) : '0'
  }

  render() {
    const displayValue = this.format(this.state.scaleValue)
    const inSpec = this.inSpec()
    const barColor = inSpec ? NexaColours.Green : NexaColours.Red

    const barWidth = this.state.physBarPos
    const barStyle = StyleSheet.flatten([styles.bar, { width: barWidth, backgroundColor: barColor }])

    const balStyle = StyleSheet.flatten([styles.balance, { borderColor: barColor }])

    const lowerStyle = StyleSheet.flatten([styles.limit, { left: this.lowerPos }])
    const upperStyle = StyleSheet.flatten([styles.limit, { left: this.upperPos }])
    const targetStyle = StyleSheet.flatten([styles.target, { left: this.targetPos }])

    return (
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TapGestureHandler onHandlerStateChange={this.onTapped} numberOfTaps={2} minPointers={1}>
            <View style={balStyle}>
              <Text style={styles.reading}>{displayValue}</Text>
              <Text style={styles.uom}>{this.props.uom}</Text>
            </View>
          </TapGestureHandler>
          <View style={styles.info}>
            {this.props.upper && <Text>Upper: {this.format(this.upper)}</Text>}
            <Text>Target: {this.format(this.props.target)}</Text>
            {this.props.lower && <Text>Lower: {this.format(this.lower)}</Text>}
          </View>
        </View>
        <PanGestureHandler onGestureEvent={this.onPan} activeOffsetX={[0, 0]} >
          <View onLayout={this.onLayout} style={styles.outer}>
            <View style={barStyle} />
            {this.props.lower && <View style={lowerStyle} />}
            {this.props.upper && <View style={upperStyle} />}
            <View style={targetStyle} />
          </View>
        </PanGestureHandler>
      </View>
    )
  }
}