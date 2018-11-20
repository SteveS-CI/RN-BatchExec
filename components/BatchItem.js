import React, { Component } from 'react'
import {StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import NexaColours from '../constants/NexaColours';

const rowSelected = {color: 'white'}
const rowPlain = {color: NexaColours.GreyDark}

export default class BatchItem extends Component {

  static propTypes = {
    item: PropTypes.any.isRequired,
    rowClicked: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    rowStyle: PropTypes.any
  }

  render() {
    const batch = this.props.item
    const textStyle = this.props.selected ? rowSelected : rowPlain
    const style = {...textStyle, padding: 3}
    const fieldStyle = {...style, color: NexaColours.Blue}
    const rowStyle = {...this.props.rowStyle}
    return (
      <TouchableOpacity onPressIn={() => this.props.rowClicked(batch)} style={rowStyle}>
        <View>
          <View style={{flexDirection: 'row', paddingVertical: 12}}>
            <Text style={fieldStyle}>Code:</Text>
            <Text style={style}>{batch.code}</Text>
            <Text style={fieldStyle}>Product Name:</Text>
            <Text style={style}>{batch.productName}</Text>
            <Text style={fieldStyle}>Quantity:</Text>
            <Text style={style}>{batch.quantity}</Text>
            <Text style={fieldStyle}>Status:</Text>
            <Text style={style}>{batch.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
