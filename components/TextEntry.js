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
    inputContainer: {
      flexDirection: 'row',
      marginHorizontal: 8, marginTop: 8,
      alignSelf: 'flex-start'
    },
    inputLabel: {
      //backgroundColor: NexaColours.GreyAccent,
      paddingHorizontal: 8, paddingVertical: 5,
      textAlignVertical: 'center',
      textAlign: 'right',
      minWidth: 100
      //borderColor: NexaColours.GreyDark, borderWidth: inputBorderWidth,
      //borderTopLeftRadius: inputBorderRadius,
      //borderBottomLeftRadius: inputBorderRadius
    },
    inputBox: {
      //borderColor: NexaColours.GreyDark,
      //borderBottomWidth: inputBorderWidth,
      //borderTopWidth: inputBorderWidth,
      paddingHorizontal: 8, paddingVertical: 5,
      minWidth: 200
    }
  }
)

export default class TextEntry extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {editing: false}
  }

  static defaultProps = {
    secure: false,
    enabled: true,
    autoFocus: false,
    blurOnSubmit: true,
    onSubmit: () => {}
  }

  static propTypes = {
    label: PropTypes.any.isRequired,
    value: PropTypes.any,
    secure: PropTypes.bool,
    onChange: PropTypes.func,
    enabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    returnKeyType: PropTypes.string,
    keyboardType: PropTypes.string,
    blurOnSubmit: PropTypes.bool,
    onSubmit: PropTypes.func
  }

  focus() {
    this.ref.focus()
  }

  onChangeText = (value) => {
    if (this.props.onChange) this.props.onChange(value)
  }

  render() {
    const editing = this.state.editing
    const label = this.props.label
    const boxColor = editing ? NexaColours.GreyUltraLight : NexaColours.GreyLight
    const boxStyle = StyleSheet.flatten([styles.inputBox, {backgroundColor: boxColor}])
    return (
      <View style={styles.inputContainer}>
        {label && <Text style={styles.inputLabel}>{label}</Text>}
        <TextInput style={boxStyle}
          ref={(ref) => this.ref = ref}
          value={this.props.value}
          onChangeText={this.onChangeText}
          blurOnSubmit={this.props.blurOnSubmit}
          onFocus={() => this.setState({editing: true})}
          onBlur={() => this.setState({editing: false})}
          underlineColorAndroid='transparent'
          editable={this.props.enabled}
          secureTextEntry={this.props.secure}
          autoFocus={this.props.autoFocus}
          returnKeyType={this.props.returnKeyType}
          keyboardType={this.props.keyboardType}
          onSubmitEditing={this.props.onSubmit}
        />
      </View>
    )
  }
}
