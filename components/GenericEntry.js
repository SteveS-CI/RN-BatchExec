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
      showCam: false
    }
  }

  static defaultProps = {
    enabled: true,
    autoFocus: false,
    useCamera: false,
    onChange: () => {}
  }

  static propTypes = {
    entry: DataProps.EntryProps.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func,
    enabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    useCamera: PropTypes.bool
  }

  onChangeText = (value) => {
    this.props.onChange(value)
  }

  scanned = (type, data) => {
    this.setState({showCam: false})
    if (type===0) {
      this.props.onChange('', false)
    } else {
      this.props.onChange(data, true)
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
        {this.props.useCamera && <IconButton iconName='camera' onPress={() => this.setState({showCam: true})} />}
        <BarcodeReader visible={showCam} onScanned={this.scanned}/>
      </View>
    )
  }
}

export class DistinctEntry extends PureComponent {

  static defaultProps = {
    enabled: true
  }

  static propTypes = {
    entry: DataProps.EntryProps.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func,
    enabled: PropTypes.bool
  }

  componentDidMount() {
    this.onValueChange(this.props.entry.validation.choices[0])
  }

  onValueChange = (itemValue, itemIndex) => {
    if (this.props.onChange) this.props.onChange(itemValue)
  }

  render() {
    const entry = this.props.entry
    const hasLabel = entry.label ? true : false
    const hasSuffix = entry.suffix ? true : false
    const validation = entry.validation
    const choices = validation.choices
    const items = choices.map((item, idx) => {
      return (
        <Picker.Item key={idx} label={item} value={item} />
      )
    })
    return (
      <View style={styles.pickerContainer}>
        {hasLabel && <Text style={styles.pickerLabel}>{entry.label}</Text>}
        <Picker style={{ minWidth: 250 }}
          selectedValue={this.props.value}
          onValueChange={this.onValueChange}
          enabled={this.props.enabled}
          mode='dropdown'>
          {items}
        </Picker>
        {hasSuffix && <Text style={styles.pickerSuffix}>{entry.suffix}</Text>}
      </View>
    )
  }
}

export class ActionEntry extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { editing: false }
  }

  static defaultProps = {
    enabled: true,
    autoFocus: false
  }

  static propTypes = {
    entry: DataProps.EntryProps,
    value: PropTypes.any,
    onChange: PropTypes.func,
    enabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    useCamera: PropTypes.bool
  }

  render() {
    const hasEntry = this.props.entry ? true : false
    if (hasEntry) {
      const entryType = this.props.entry.entryType
      if (entryType === 'Distinct') {
        return (
          <DistinctEntry {...this.props} />
        )
      } else {
        return (
          <GenericEntry {...this.props} />
        )
      }
    } else {
      return null
    }
  }
}
