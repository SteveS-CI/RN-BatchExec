import React, { PureComponent } from 'react'
import { StyleSheet, Modal, Switch, View, Text, Picker } from 'react-native';
import PropTypes from 'prop-types'
import ButtonBar from './ButtonBar'
import RoundedButton from './RoundedButton'
import NexaColours from '../constants/NexaColours'

export default class PickerSetting extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { value: "", editing: false }
  }

  componentDidMount() {
    this.setState({value: this.props.value})
  }

  submitChange = (value) => {
    this.setState({value})
    this.props.onValueChange(value)
  }

  render() {
    const values = this.props.values.map((item, index) => {
      return (
        <Picker.Item key={index} label={item.label} value={item.value}/>
      )
    })
    const item = this.props.values.find((item) => {return item.value === this.props.value})
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: StyleSheet.hairlineWidth, padding: 8, alignItems: 'center' }}>
        <Text style={{fontSize:16}}>{this.props.title}</Text>
        <Picker prompt={this.props.title} 
                selectedValue={this.state.value} onValueChange={this.submitChange}
                style={{width: 150}}>
          {values}
        </Picker>
      </View>
    )
  }
}

PickerSetting.propTypes = {
  prompt: PropTypes.string,
  value: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(
    PropTypes.shape(
      {
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      }
    )
  ).isRequired,
  title: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired
}