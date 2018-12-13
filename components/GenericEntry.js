import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, TextInput, Picker, KeyboardAvoidingView } from 'react-native'
import PropTypes from 'prop-types'
import * as DataProps from '../constants/DataProps'
import TextBar from './TextBar'
import ErrorBar from './ErrorBar'
import NexaColours from '../constants/NexaColours'
import { optimalForeColor } from '../Utils/utils'
import IconButton from './IconButton';
import BarcodeReader from './BarcodeReader';

import i18n from 'i18n-js'
import numeral from 'numeral'
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
      paddingHorizontal: 8, paddingVertical: 5,
      textAlignVertical: 'center',
      borderColor: NexaColours.GreyDark, borderWidth: inputBorderWidth,
      borderTopLeftRadius: inputBorderRadius,
      borderBottomLeftRadius: inputBorderRadius
    },
    inputSuffix: {
      backgroundColor: NexaColours.GreyAccent,
      paddingHorizontal: 8, paddingVertical: 5,
      textAlignVertical: 'center',
      borderColor: NexaColours.GreyDark, borderWidth: inputBorderWidth,
      borderTopRightRadius: inputBorderRadius,
      borderBottomRightRadius: inputBorderRadius
    },
    inputBox: {
      borderColor: NexaColours.GreyDark,
      borderBottomWidth: inputBorderWidth,
      borderTopWidth: inputBorderWidth,
      paddingHorizontal: 8, paddingVertical: 5,
      minWidth: 200
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
    onChange: () => { }
  }

  static propTypes = {
    entry: DataProps.EntryProps.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func,
    enabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    useCamera: PropTypes.bool
  }

  componentDidMount() {
    const locale = i18n.currentLocale()
    const options = i18n.translations[locale].formats
    this.parse = parseDecimalNumber.withOptions(options)
  }

  onChangeText = (value) => {
    this.props.onChange(value)
    this.setState({ error: null })
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

      if (entry.entryType === 'Integer' || entry.entryType === 'Decimal') { // Numerics
        // Convert to 'standard' number
        const realVal = this.parse(value)
        if (isNaN(realVal)) {
          this.setState({ error: 'Not a valid number' })
          return false
        } else if (validation) { // Check limits
          const pass = (validation.lower ? (realVal >= validation.lower) : true) && (validation.upper ? (realVal <= validation.upper) : true)
          console.log(realVal, validation, pass)
        } else { return true}
      }
      
    } else {
      this.setState({ error: 'A value is required' })
      return false
    }
  }

  render() {
    const showCam = this.state.showCam
    const editing = this.state.editing
    const entry = this.props.entry
    const hasLabel = entry.label ? true : false
    const hasSuffix = entry.suffix ? true : false
    const keyboardType = (entry.entryType === 'Integer' || entry.entryType === 'Decimal') ? 'numeric' : 'default'
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
            onBlur={() => this.setState({ editing: false })}
            underlineColorAndroid='transparent'
            editable={this.props.enabled}
            autoFocus={this.props.autoFocus}
            keyboardType={keyboardType}
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
