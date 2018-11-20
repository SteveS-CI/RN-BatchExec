import React, { Component } from 'react'
import {StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'
import FieldValue from '../components/FieldValue'
import FieldHeader from '../components/FieldHeader'
import NexaColours from '../constants/NexaColours';

const rowSelected = {color: 'white'}
const rowPlain = {color: NexaColours.GreyDark}

export default class LocationItem extends Component {
  constructor(props) {
    super(props)
    this.maxWidth = 0
  }

  static propTypes = {
    item: PropTypes.any.isRequired,
    rowClicked: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    rowStyle: PropTypes.any,
  }

  render() {
    const loc = this.props.item
    const textStyle = this.props.selected ? rowSelected : rowPlain
    const style = {...textStyle, padding: 8, fontSize: 16, flexBasis: '30%'}
    return (
      <TouchableOpacity onPress={() => this.props.rowClicked(loc)}>
        <View style={this.props.rowStyle}>
          <View style={{flexDirection: 'row', paddingVertical: 8}}>
            <Text style={style}>{loc.name}</Text>
            <Text style={style}>{loc.code}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
