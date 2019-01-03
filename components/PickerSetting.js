import React, { PureComponent } from 'react'
import { StyleSheet, Modal, Switch, View, Text, Picker } from 'react-native';
import PropTypes from 'prop-types'
import {FontSizes} from '../constants/Layout'
import CustomPicker from './CustomPicker'

const FontSize = FontSizes.smaller

export default class PickerSetting extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { value: "", editing: false }
  }

  static propTypes = {
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
        item.value
      )
    })
    const item = this.props.values.find((item) => {return item.value === this.props.value})
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: StyleSheet.hairlineWidth, padding: 8, alignItems: 'center' }}>
        <Text style={{fontSize: FontSize}}>{this.props.title}</Text>
{/*         <Picker prompt={this.props.title} 
                selectedValue={this.state.value} onValueChange={this.submitChange}
                style={{width: 150}}>
          {values}
        </Picker>
 */}        
        <CustomPicker title={this.props.title} value={item} items={this.props.values} display='label' onChange={this.submitChange} />
      </View>
    )
  }
}
