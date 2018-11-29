import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, TextInput, Picker } from 'react-native'
import PropTypes from 'prop-types'
import * as DataProps from '../constants/DataProps'
import TextBar from './TextBar'
import ErrorBar from './ErrorBar'
import NexaColours from '../constants/NexaColours'
import { optimalForeColor } from '../Utils/utils'
import RoundedButton from './RoundedButton';
import BarcodeReader from './BarcodeReader';

const inputBorderWidth = StyleSheet.hairlineWidth * 2
const inputBorderRadius = 10

const styles = StyleSheet.create(
  {
    breadcrumb: {
      marginRight: 8,
      color: 'white',
      padding: 5,
      backgroundColor: NexaColours.BlueAccent,
      borderRadius: 5,
      fontSize: 16
    },
    title: {
      borderRadius: 0,
      marginHorizontal: 0,
      marginBottom: 0,
      borderTopColor: 'white',
      borderBottomColor: 'black',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
      fontSize: 20
    },
    promptContainer: {
      marginHorizontal: 8,
      padding: 8,
      borderRadius: 10,
      backgroundColor: NexaColours.Cyan,
      marginBottom: 8
    },
    prompt: {
      marginBottom: 5,
      alignSelf: 'center',
      fontSize: 18
    },
    notes: {
      padding: 5,
      borderRadius: 10,
      textAlign: 'center',
      backgroundColor: NexaColours.CyanAccent,
      fontSize: 16
    },
    inputContainer: {
      flexDirection: 'row',
      marginHorizontal: 8, marginTop: 8,
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
    },
    pickerContainer: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      marginHorizontal: 8, marginTop: 8,
      borderColor: NexaColours.GreyDark, borderWidth: inputBorderWidth,
      borderRadius: inputBorderRadius,
      backgroundColor: NexaColours.GreyLight
    },
    pickerLabel: {
      backgroundColor: NexaColours.GreyAccent,
      paddingHorizontal: 8,
      textAlignVertical: 'center',
      borderColor: NexaColours.GreyDark, borderWidth: inputBorderWidth,
      borderTopLeftRadius: inputBorderRadius,
      borderBottomLeftRadius: inputBorderRadius
    },
    pickerSuffix: {
      backgroundColor: NexaColours.GreyAccent,
      paddingHorizontal: 8,
      textAlignVertical: 'center',
      borderColor: NexaColours.GreyDark, borderWidth: inputBorderWidth,
      borderTopRightRadius: inputBorderRadius,
      borderBottomRightRadius: inputBorderRadius
    }
  }
)

export class ActionBreadcrumb extends PureComponent {

  static propTypes = {
    text: PropTypes.string.isRequired
  }

  render() {
    return (
      <Text style={styles.breadcrumb}>{this.props.text}</Text>
    )
  }
}

export class ActionTitle extends PureComponent {

  static defaultProps = {
    backColor: NexaColours.BlueAccent
  }

  static propTypes = {
    backColor: PropTypes.string,
    text: PropTypes.string.isRequired
  }

  render() {
    return (
      <TextBar backColor={this.props.backColor} style={styles.title}>{this.props.text}</TextBar>
    )
  }
}

export class ActionPrompt extends PureComponent {

  static propTypes = {
    prompt: PropTypes.string,
    notes: PropTypes.string
  }

  render() {
    const hasPrompt = this.props.prompt ? true : false
    const hasNote = this.props.notes ? true : false
    if (hasPrompt) {
      const promptColor = optimalForeColor(NexaColours.Cyan)
      const noteColor = optimalForeColor(NexaColours.CyanAccent)
      const promptStyle = StyleSheet.flatten([styles.prompt, { color: promptColor }])
      const noteStyle = StyleSheet.flatten([styles.notes, { color: noteColor }])
      return (
        <View style={styles.promptContainer}>
          <Text style={promptStyle}>
            {this.props.prompt}
          </Text>
          {hasNote && <Text style={noteStyle}>{this.props.notes}</Text>}
        </View>
      )
    } else {
      return null
    }
  }
}

export class GenericEntry extends PureComponent {
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
    this.props.onChange(value, false)
  }

  scanned = (type, data) => {
    this.props.onChange(data, true)
    this.setState({showCam: false})
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
        {this.props.useCamera && <RoundedButton title='Camera' onPress={() => this.setState({showCam: true})} />}
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
        <Picker style={{ minWidth: 200 }}
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
