import React, {PureComponent} from 'react'
import {StyleSheet, View, Text, TextInput, Picker} from 'react-native'
import PropTypes from 'prop-types'
import TextBar from './TextBar'
import NexaColours from '../constants/NexaColours'
import {optimalForeColor} from '../Utils/utils'

const inputBorderWidth = StyleSheet.hairlineWidth
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

  static propTypes = {
    text: PropTypes.string.isRequired
  }

  render() {
    return (
      <TextBar backColor={NexaColours.BlueAccent} style={styles.title}>{this.props.text}</TextBar>
    )
  }
}

export class ActionPrompt extends PureComponent {

  static propTypes = {
    prompt: PropTypes.string.isRequired,
    notes: PropTypes.string
  }

  render() {
    const promptColor = optimalForeColor(NexaColours.Cyan)
    const noteColor = optimalForeColor(NexaColours.CyanAccent)
    const promptStyle = StyleSheet.flatten([styles.prompt, {color: promptColor}])
    const noteStyle = StyleSheet.flatten([styles.notes, {color: noteColor}])
    return (
      <View style={styles.promptContainer}>
        <Text style={promptStyle}>
          {this.props.prompt}
        </Text>
        {this.props.notes && 
          <Text style={noteStyle}>{this.props.notes}</Text>
        }
      </View>
    )
  }
}

export class StringEntry extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {editing: false}
  }

  static defaultProps = {
    enabled: true
  }

  static propTypes = {
    entry: PropTypes.any.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func,
    enabled: PropTypes.bool
  }

  onChangeText = (value) => {
    if (this.props.onChange) this.props.onChange(value)
  }

  render() {
    const editing = this.state.editing
    const entry = this.props.entry
    const label = entry ? entry.label : null
    const suffix = entry ? entry.suffix : null
    const boxColor = editing ? NexaColours.GreyUltraLight : NexaColours.GreyLight
    const boxLeft = !suffix ? {
      borderTopRightRadius: inputBorderRadius,
      borderBottomRightRadius: inputBorderRadius,
      borderRightWidth: inputBorderWidth
    } : null
    const boxRight = !label ? {
      borderTopLeftRadius: inputBorderRadius,
      borderBottomLeftRadius: inputBorderRadius,
      borderLeftWidth: inputBorderWidth
    } : null
    const boxStyle = StyleSheet.flatten([styles.inputBox, {backgroundColor: boxColor}, boxLeft, boxRight])
    return (
      <View style={styles.inputContainer}>
        {label && <Text style={styles.inputLabel}>{label}</Text>}
        <TextInput style={boxStyle}
          value={this.props.value}
          onChangeText={this.onChangeText}
          blurOnSubmit={true}
          onFocus={() => this.setState({editing: true})}
          onBlur={() => this.setState({editing: false})}
          underlineColorAndroid='transparent'
          editable={this.props.enabled}
        />
        {suffix && <Text style={styles.inputSuffix}>{suffix}</Text>}
      </View>
    )
  }
}

export class DistinctEntry extends PureComponent {

  static defaultProps = {
    enabled: true
  }

  static propTypes = {
    entry: PropTypes.any.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func,
    enabled: PropTypes.bool
  }

  onValueChange = (itemValue, itemIndex) => {
    if (this.props.onChange) this.props.onChange(itemValue)
  }

  render() {
    const entry = this.props.entry
    const label = entry ? entry.label : null
    const suffix = entry ? entry.suffix : null
    const boxColor = NexaColours.GreyUltraLight
    const boxLeft = !suffix ? {
      borderTopRightRadius: inputBorderRadius,
      borderBottomRightRadius: inputBorderRadius,
      borderRightWidth: inputBorderWidth
    } : null
    const boxRight = !label ? {
      borderTopLeftRadius: inputBorderRadius,
      borderBottomLeftRadius: inputBorderRadius,
      borderLeftWidth: inputBorderWidth
    } : null
    const boxStyle = StyleSheet.flatten([styles.inputBox, {backgroundColor: boxColor}, boxLeft, boxRight])
    return (
      <View style={styles.inputContainer}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <Picker style={boxStyle}
        selectedValue={this.props.value}
        onValueChange={this.onValueChange}
        enabled = {this.props.enabled}
        mode='dropdown'
        >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
      {suffix && <Text style={styles.inputSuffix}>{suffix}</Text>}
    </View>
    )
  }
}

export class ActionEntry extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {editing: false}
  }

  static defaultProps = {
    enabled: true
  }

  static propTypes = {
    entry: PropTypes.any.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func,
    enabled: PropTypes.bool
  }

  render() {
    const entryType = this.props.entry.entryType
    if (entryType==='Distinct') {
      return (
        <DistinctEntry {...this.props}/>
      )
    } else {
      return (
        <StringEntry {...this.props}/>
      )
    }
  }
}