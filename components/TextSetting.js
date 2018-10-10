import React, {PureComponent} from 'react'
import {Alert, StyleSheet, Switch, TextInput, Modal, View, Text} from 'react-native';
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

  hideModal = () => {
    this.setState({editing: false})
  }

  submitChange = () => {
    this.props.onValueChange(this.state.value)
    this.setState({editing: false})
  }

  onChangeText = (value) => {
    this.setState({value})
  }

  render() {
    return (
      <View style={{flexDirection: 'column', padding: 8}}>
        <Text onPress={() => {this.setState({editing: true})}}>{this.props.title}</Text>
        <Text style={{color: NexaColours.Grey}}>
          {this.props.value}
        </Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.editing}
          onRequestClose={() => {this.hideModal()}}>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000080'}}
          >
          <View style={{
            width: 300,
            backgroundColor: '#fff',
            padding: 10}}>
            <Text>{this.props.title}</Text>
            <TextInput
              textContentType='URL'
              value={this.state.value}
              onChangeText={this.onChangeText}
              underlineColorAndroid={'#00000000'}
              style={{borderRadius: 5, borderWidth: StyleSheet.hairlineWidth, paddingHorizontal: 5}}
              />
            <ButtonBar justify='space-evenly'>
              <RoundedButton title='Cancel' backColor={NexaColours.AlertYellow} onPress={() => {this.hideModal()}} />
              <RoundedButton title='OK' onPress={() => {this.submitChange()}} />
            </ButtonBar>
          </View>
        </View>
      </Modal>
    </View>
    )
  }
}

TextSetting.propTypes = {
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired
}