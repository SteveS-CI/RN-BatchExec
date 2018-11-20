import React, { Component } from 'react'
import {StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import NexaColours from '../constants/NexaColours';
import BatchStates from '../constants/BatchStates'

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
    const style = {...textStyle, padding: 8, fontSize: 16}
    return (
      <TouchableOpacity onPressIn={() => this.props.rowClicked(batch)} style={this.props.rowStyle}>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', paddingTop: 8}}>
            <Text style={{...style, flexBasis: '30%'}}>{batch.productName}</Text>
            <Text style={{...style, flexBasis: '20%'}}>{batch.code}</Text>
            <Text style={{...style, flexBasis: '20%'}}>{batch.quantity}</Text>
            <Text style={style}>{BatchStates[batch.status]}</Text>
          </View>
          <View style={{flexDirection: 'row', paddingBottom: 8}}>
            <Text style={style}>{batch.startErrors}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
