import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import * as DataProps from '../constants/DataProps'
import ErrorBar from './ErrorBar'
import NexaColours from '../constants/NexaColours'
import IconButton from './IconButton';
import BarcodeReader from './BarcodeReader';
import {FontSizes} from '../constants/Layout'

import i18n from 'i18n-js'
import parseDecimalNumber from 'parse-decimal-number'

const inputBorderWidth = StyleSheet.hairlineWidth * 2
const inputBorderRadius = 10

const styles = StyleSheet.create(
  {
    inputContainer: {
      flexDirection: 'row',
      marginHorizontal: 8, marginTop: 8, padding: 0,
      alignSelf: 'flex-start'
    },
    inputLabel: {
      backgroundColor: NexaColours.GreyAccent,
      paddingHorizontal: 8, paddingVertical: 8,
      textAlignVertical: 'center',
      borderColor: NexaColours.GreyDark, borderWidth: inputBorderWidth,
      borderTopLeftRadius: inputBorderRadius,
      borderBottomLeftRadius: inputBorderRadius,
      fontSize: FontSizes.standard
    },
    inputSuffix: {
      backgroundColor: NexaColours.GreyAccent,
      paddingHorizontal: 8, paddingVertical: 8,
      textAlignVertical: 'center',
      borderColor: NexaColours.GreyDark, borderWidth: inputBorderWidth,
      borderTopRightRadius: inputBorderRadius,
      borderBottomRightRadius: inputBorderRadius,
      fontSize: FontSizes.standard
    },
    inputBox: {
      borderColor: NexaColours.GreyDark,
      borderBottomWidth: inputBorderWidth,
      borderTopWidth: inputBorderWidth,
      paddingHorizontal: 8, paddingVertical: 8,
      minWidth: '30%',
      fontSize: FontSizes.standard,
    }
  }
)

export default class GenericEntry extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      showCam: false,
      error: null
    }
  }

  static defaultProps = {
    enabled: true,
    autoFocus: false,
    useCamera: false,
    onChange: () => { },
    showCam: false
  }

  static propTypes = {
    entry: DataProps.EntryProps.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func,
    enabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    useCamera: PropTypes.bool,
  }

  componentDidMount() {
    this.suppressNextKey = false
    this.locale = i18n.currentLocale()
    this.formats = i18n.translations[this.locale].formats
    // Shortened parse function
    this.parse = parseDecimalNumber.withOptions(this.formats)
    // Set initial value if entry object has it (will need to be redisplayed on signature/approval)
    if (this.props.entry.value) { this.onChangeText(this.props.entry.value)}
  }

  scanned = (type, data) => {
    this.setState({ showCam: false })
    if (type === 0) {
      this.props.onChange('', false)
    } else {
      this.props.onChange(data, true)
    }
  }

  validate(value) {
    const entry = this.props.entry
    const validation = entry.validation
    if (value) {
      const type = entry.entryType

      if (type === 'Integer' || type === 'Decimal') { // Numerics
        // Convert to 'standard' number
        const realVal = this.parse(value)
        if (isNaN(realVal)) {
          this.setState({ error: 'Not a valid number' })
          return false
        }
        if (type === 'Integer' && (realVal % 1 > 0)) {
          this.setState({ error: 'Value must be an integer, not a decimal' })
          return false
        }
        return this.checkNumericLimits(realVal, validation)
      }

      if (type === 'String') { return this.checkStringLimits(value, validation) }

      if (type === 'Custom') { return this.checkRegEx(value, validation) }

    } else {
      this.setState({ error: 'A value is required' })
      return false
    }
  }

  checkStringLimits(value, validation) {
    if (validation) {
      if (validation.minLength && (value.length < validation.minLength)) {
        this.setState({ error: `Length is less than the minimum of ${validation.minLength}` })
        return false
      } else if (validation.maxLength && (value.length > validation.maxLength)) {
        this.setState({ error: `Length is greater than the maximum of ${validation.maxLength}` })
        return false
      }
    }
    return true
  }

  checkNumericLimits(value, validation) {
    if (validation) {
      if (validation.lower && value < validation.lower) {
        this.setState({ error: `Value is less than lower limit of ${validation.lower}` })
        return false
      } else if (validation.upper && value > validation.upper) {
        this.setState({ error: `Value is greater than the upper limit of ${validation.upper}` })
        return false
      } else if (validation.increment && (value % validation.increment > 0)) {
        this.setState({ error: `Value should be in increments of ${validation.increment}` })
        return false
      } else {
        return true
      }
    } else {
      return true
    }
  }

  checkRegEx(value, validation) {
    if (validation) {
      const exp = validation.regExp
      if (exp) {
        const test = new RegExp(`^${exp}$`).test(value)
        if (!test) {
          this.setState({ error: `Value does not match the required pattern: ${exp}` })
          return false
        }
      }
    }
    return true
  }

  onBlur = () => {
    this.setState({ editing: false })
    this.validate(this.props.value)
  }

  onChangeText = (value) => {
    if (this.suppressNextKey) {
      this.suppressNextKey=false
      this.props.onChange(this.props.value)
    } else {
      this.props.onChange(value.toString())
    }
    this.setState({ error: null })
  }

  onKeyPress = (e) => {
    const type = this.props.entry.entryType
    const key = e.nativeEvent.key
    if (type === "Decimal") {
      if (key === this.formats.thousands || key === " ") {this.suppressNextKey = true}
    } else if (type === 'Integer') {
      if (key === this.formats.decimal || key === this.formats.thousands || key === " ") {this.suppressNextKey = true}
    }
  }

  render() {
    const showCam = this.state.showCam
    const editing = this.state.editing
    const entry = this.props.entry
    const hasLabel = entry.label ? true : false
    const hasSuffix = entry.suffix ? true : false
    const keyboardType = (entry.entryType === 'Integer' || entry.entryType === 'Decimal') ? 'number-pad' : 'default'
    const boxColor = editing ? NexaColours.GreyUltraLight : NexaColours.GreyLight
    const boxLeft = !hasSuffix ? {
      borderTopRightRadius: inputBorderRadius,
      borderBottomRightRadius: inputBorderRadius,
      borderRightWidth: inputBorderWidth
    } : null
    const boxRight = !hasLabel ? {
      borderTopLeftRadius: inputBorderRadius,
      borderBottomLeftRadius: inputBorderRadius,
      borderLeftWidth: inputBorderWidth
    } : null
    const boxStyle = StyleSheet.flatten([styles.inputBox, { backgroundColor: boxColor }, boxLeft, boxRight])
    return (
      <View style={{ flexDirection: 'column' }}>
        <View style={styles.inputContainer}>
          {hasLabel && <Text style={styles.inputLabel}>{entry.label}</Text>}
          <TextInput style={boxStyle}
            value={this.props.value}
            onChangeText={this.onChangeText}
            blurOnSubmit={true}
            onFocus={() => this.setState({ editing: true })}
            onBlur={this.onBlur}
            underlineColorAndroid='transparent'
            editable={this.props.enabled}
            autoFocus={this.props.autoFocus}
            keyboardType={keyboardType}
            onKeyPress={this.onKeyPress}
          />
          {hasSuffix && <Text style={styles.inputSuffix}>{entry.suffix}</Text>}
          {this.props.useCamera && <IconButton iconName='camera' onPress={() => this.setState({ showCam: true })} />}
          <BarcodeReader visible={showCam} onScanned={this.scanned} />
        </View>
        <ErrorBar text={this.state.error} onPress={() => this.setState({ error: null })} />
      </View>
    )
  }
}
