import React, {PureComponent} from 'react'
import {Alert, StyleSheet, TouchableWithoutFeedback, Switch, TextInput, Modal, View, Text} from 'react-native';
import PropTypes from 'prop-types'
import RoundedButton from './RoundedButton'
import NexaColours from '../constants/NexaColours'
import ButtonBar from './ButtonBar';

export default class TextSetting extends PureComponent {
  constructor(props) {
    super(props)
    this.state={value: "", editing: false}
  }

  componentDidMount() {
    this.setState({value: this.props.value})
  }

  onChangeText = (value) => {
    this.props.onValueChange(value)
    this.setState({value})
  }

  setEditMode = () => {
    this.setState({editing: true})
  }

  render() {
    const editing = this.state.editing
    const baseStyle = {paddingHorizontal: 5}
    const textStyle = this.state.editing 
      ? {...baseStyle, borderRadius: 5, borderWidth: StyleSheet.hairlineWidth}
      : {...baseStyle, color: NexaColours.Grey}
    return (
      <TouchableWithoutFeedback onPress={() => {this.setState({editing: !editing})}}>
        <View style={{flexDirection: 'column', padding: 8}}>
          <Text>{this.props.title}</Text>
          <TextInput
                textContentType='URL'
                value={this.state.value}
                blurOnSubmit={true}
                onChangeText={this.onChangeText}
                onBlur={() => {this.setState({editing: false})}}
                underlineColorAndroid={'#00000000'}
                style={textStyle}
                editable={editing}
                />
        </View>
      </TouchableWithoutFeedback>  
    )
  }
}

TextSetting.propTypes = {
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired
}