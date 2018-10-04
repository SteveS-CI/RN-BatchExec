import React, { Component } from 'react'
import {StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import NexaColours from '../constants/NexaColours';

const rowSelected = {color: 'white'}
const rowPlain = {color: NexaColours.GreyDark}

export default class BatchItem extends Component {

  render() {
    const batch = this.props.item
    const textStyle = this.props.selected ? rowSelected : rowPlain
    const style = {...textStyle, padding: 3}
    const fieldStyle = {...style, color: NexaColours.Blue}
    const rowStyle = {...this.props.rowStyle, borderBottomWidth: StyleSheet.hairlineWidth}
    return (
      <TouchableOpacity onPress={() => this.props.rowClicked(batch)} style={rowStyle}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={style}>ID:</Text>
            <Text style={fieldStyle}>{batch.batchID}, </Text>
            <Text style={style}>Code:</Text>
            <Text style={fieldStyle}>{batch.code}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={style}>Product Code:</Text>
            <Text style={fieldStyle}>{batch.productCode}</Text>
            <Text style={style}>Product Name:</Text>
            <Text style={fieldStyle}>{batch.productName}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={style}>Quantity:</Text>
            <Text style={fieldStyle}>{batch.quantity}</Text>
            <Text style={style}>Status:</Text>
            <Text style={fieldStyle}>{batch.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

BatchItem.propTypes = {
  item: PropTypes.any.isRequired,
  rowClicked: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  rowStyle: PropTypes.any
}
