import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { GestureHandler } from 'expo'
import { scale, verticalScale, FontSizes } from '../constants/Layout'
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
    borderColor: NexaColours.GreyDarkest,
    borderRadius: scale(12), borderWidth: scale(1),
    flexDirection: 'column',
    padding: scale(4),
    marginRight: scale(12)
  },
  infoText: {
    fontSize: FontSizes.smallest
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
    this.state = {
      scaleValue: 0,
      rawScale: 0,
      physBarPos: 0,
      physWidth: null
    }
  }

  static defaultProps = {
    decimalPlaces: 3,
    scaleFactor: 1,
    zeroOffset: 0,
    tareOffset: 0,
    showBalReading: false
  }

  static propTypes = {
    balanceMax: PropTypes.number, // maximum scale capacity
    balanceMode: PropTypes.oneOf(["zero","tare","measure"]).isRequired,
    target: PropTypes.number, // measurement target
    lowerLimit: PropTypes.number, // measurement lower limit
    upperLimit: PropTypes.number, // measurement upper limit
    decimalPlaces: PropTypes.number, // decimal places to display
    balanceUOM: PropTypes.string.isRequired, // balance units of measure (zero/tare)
    displayUOM: PropTypes.string.isRequired, // display units of measure
    scaleFactor: PropTypes.number, // conversion factor (e.g. Kg -> L)
    zeroOffset: PropTypes.number, 
    tareOffset: PropTypes.number,
    showBalReading: PropTypes.bool // show the actual balance reading (for development only)
  }

  componentDidMount() {
    this.locale = i18n.currentLocale()
    this.formats = i18n.translations[this.locale].formats
    this.makeFormatFunc()
  }

  componentDidUpdate(prevProps, prevState) {
    // compare props
    if ((prevProps.lowerLimit !== this.props.lowerLimit)
      || (prevProps.target !== this.props.target)
      || (prevProps.upperLimit !== this.props.upperLimit)
      || (prevProps.balanceUOM !== this.props.balanceUOM)
      || (prevProps.displayUOM !== this.props.displayUOM)
      || (prevProps.scaleFactor !== this.props.scaleFactor)
      || (prevProps.decimalPlaces !== this.props.decimalPlaces)
    ) {
      this.reCalc()
      this.makeFormatFunc()
      this.setState({ physBarPos: this.scaleToPhys(this.state.scaleValue)})
    }
  }

  makeFormatFunc() {
    // Shortened format function
    const options = {
      separator: this.formats.decimal,
      delimiter: this.formats.thousands,
      precision: this.props.decimalPlaces
    }
    this.formatNumber = value => i18n.toNumber(value, options)
  }

  onTapped = (e) => {
    const state = e.nativeEvent.state
    if (state === State.END) {
      const adjustVal = e.nativeEvent.x < 50 ? 0 : this.target
      if (this.target) {
        const barVal = this.scaleToPhys(adjustVal)
        const { raw } = this.physToScale(barVal)
        this.setState({ physBarPos: barVal, rawScale: raw, scaleValue: adjustVal })
      }
    }
  }

  onPan = (e) => {
    const x = e.nativeEvent.x
    const { raw, scaled } = this.physToScale(x)
    this.setState({ physBarPos: x, rawScale: raw, scaleValue: scaled })
  }

  onLayout = (e) => {
    // rawWidth = width of bar in device units
    this.physWidth = e.nativeEvent.layout.width
    this.reCalc()
    this.setState({ physWidth: this.physWidth})
  }

  // returns a number (0-7) for each limit combination lower/target/upper
  limitsToNumber() {
    const L = this.props.lowerLimit ? 1 : 0
    const T = this.props.target ? 2 : 0
    const U = this.props.upperLimit ? 4 : 0
    return (L + T + U)
  }

  reCalc() {
    const lower = this.props.lowerLimit
    const upper = this.props.upperLimit
    const target = this.props.target
    const balanceMax = this.props.balanceMax

    this.forceCoarseScale = false
    this.lowerPos = null
    this.upperPos = null
    this.targetPos = null

    // split bar into 2 portions
    this.physThreshold = this.physWidth * 0.5

    // Calculate scaleThreshold, coarseScale, fineScale, depending on what limits were supplied
    const comb = this.limitsToNumber()
    switch (comb) {
      case 0: // no limits set
      case 2: // only target set
        this.forceCoarseScale = true
        this.coarseScale = this.physWidth / balanceMax
        this.lower = -Number.MAX_VALUE
        this.upper = Number.MAX_VALUE
        this.target = target
        break
      case 1: // only lower
      case 4: // only upper
        this.forceCoarseScale = true
        this.coarseScale = this.physWidth / balanceMax
        if (lower) {
          this.lower = lower
          this.upper = Number.MAX_VALUE
        } else { // upper
          this.upper = upper
          this.lower = -Number.MAX_VALUE
        }
        this.target = null
        break
      case 5: // upper and lower (no target)
      case 7: // all ULT
        const limitDiff = (upper - lower)
        // scaleThreshold = scaled point at which resolution changes
        // i.e. values below will appear in the lower portion of the display bar
        // and values above this value will appear in the upper portion
        this.scaleThreshold = lower - (limitDiff / 2)

        // coarseScale = physical units per scale unit (lower graph portion)
        // fineScale = physical units per scale unit (upper graph portion)
        this.coarseScale = this.physThreshold / this.scaleThreshold
        this.fineScale = (this.physWidth - this.physThreshold) / (limitDiff * 2)
        if (this.coarseScale > this.fineScale) {
          this.coarseScale = this.physWidth / (upper + (limitDiff / 2))
          this.forceCoarseScale = true
        }

        this.lower = lower
        this.upper = upper
        this.target = target ? target : null

        break
      case 3:
        const tlDiff = target - lower
        this.scaleThreshold = lower - tlDiff
        this.coarseScale = this.physThreshold / this.scaleThreshold
        this.fineScale = (this.physWidth - this.physThreshold) / (tlDiff * 4)
        if (this.coarseScale > this.fineScale) {
          this.coarseScale = this.physWidth / (tlDiff * 4)
          this.forceCoarseScale = true
        }
        this.target = target
        this.lower = lower
        this.upper = Number.MAX_VALUE
        break
      case 6:
        const utDiff = upper - target
        this.scaleThreshold = target - (utDiff * 2)
        this.coarseScale = this.physThreshold / this.scaleThreshold
        this.fineScale = (this.physWidth - this.physThreshold) / (utDiff * 4)
        if (this.coarseScale > this.fineScale) {
          this.coarseScale = this.physWidth / (utDiff * 4)
          this.forceCoarseScale = true
        }
        this.target = target
        this.upper = upper
        this.lower = -Number.MAX_VALUE
        break
      default:
    }

    // physical position of lower limit
    this.lowerPos = lower ? this.scaleToPhys(lower) - 1 : null
    // physical position of upper limit
    this.upperPos = upper ? this.scaleToPhys(upper) - 1 : null
    // physical position of target
    this.targetPos = target ? this.scaleToPhys(target) - 1 : null

    return
  }

  // converts a (balance) value to a physical position
  scaleToPhys(value) {
    const scaled = (value * this.props.scaleFactor)
    if (scaled < this.scaleThreshold || this.forceCoarseScale) {
      const phys = (scaled * this.coarseScale)
      return phys
    } else {
      const phys = ((scaled - this.scaleThreshold) * this.fineScale) + this.physThreshold
      return phys
    }
  }

  // converts a physical position into a scale value (raw and scaled)
  physToScale(phys) {
    const offset = phys
    if (offset < this.physThreshold || this.forceCoarseScale) {
      const scaleValue = (offset / this.coarseScale)
      return { raw: scaleValue, scaled: scaleValue / this.props.scaleFactor }
    } else {
      const scaleValue = ((offset - this.physThreshold) / this.fineScale) + this.scaleThreshold
      return { raw: scaleValue, scaled: scaleValue / this.props.scaleFactor }
    }
  }

  inSpec() {
    if (this.state.error) {
      return false
    } else {
      return (this.state.scaleValue >= this.lower) && (this.state.scaleValue <= this.upper)
    }
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

    const UOM = (this.props.balanceMode === 'measure') ? this.props.displayUOM : this.props.balanceUOM

    return (
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

          <TapGestureHandler onHandlerStateChange={this.onTapped} numberOfTaps={2} minPointers={1}>
            <View style={balStyle}>
              <Text style={styles.reading}>{displayValue}</Text>
              <Text style={styles.uom}>{UOM}</Text>
            </View>
          </TapGestureHandler>

          <View style={styles.info}>
            {this.props.upperLimit && <Text style={styles.infoText}>Upper: {this.format(this.props.upperLimit)}</Text>}
            {this.props.target && <Text style={styles.infoText}>Target: {this.format(this.props.target)}</Text>}
            {this.props.lowerLimit && <Text style={styles.infoText}>Lower: {this.format(this.props.lowerLimit)}</Text>}
          </View>

        </View>

        <PanGestureHandler onGestureEvent={this.onPan} activeOffsetX={[0, 0]} >
          <View onLayout={this.onLayout} style={styles.outer}>
            <View style={barStyle} />
            {this.lowerPos && <View style={lowerStyle} />}
            {this.upperPos && <View style={upperStyle} />}
            {this.targetPos && <View style={targetStyle} />}
            {this.props.showBalReading && <Text style={{ margin: scale(4), fontSize: FontSizes.standard }}>{i18n.toNumber(this.state.rawScale)} {this.props.balanceUOM}</Text>}
          </View>
        </PanGestureHandler>

      </View>
    )
  }
}