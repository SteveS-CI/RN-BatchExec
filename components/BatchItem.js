import React, { Component, PureComponent } from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import NexaColours from '../constants/NexaColours';
import BatchStates from '../constants/BatchStates'

const styles = StyleSheet.create({
  columnOuter: {
    flexDirection: 'row',
    backgroundColor: NexaColours.Grey,
    borderColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  columns: {
    color: 'white',
    padding: 8,
    fontSize: 16
  },
  rowOuter: {
    flexDirection: 'row',
    padding: 8
  },
  rows: {
    color: NexaColours.GreyDark,
    padding: 8,
    fontSize: 14
  }
})

const widths = [
  "25%",
  "20%",
  "20%",
  "20%",
  "15%"
]

export class BatchHeader extends Component {

  render() {
    const style = StyleSheet.flatten([styles.columns, this.props.style])
    return (
      <View style={styles.columnOuter}>
        <Text style={{...style, flexBasis: widths[0]}}>Product Name</Text>
        <Text style={{...style, flexBasis: widths[1]}}>Batch Code</Text>
        <Text style={{...style, flexBasis: widths[2]}}>Quantity</Text>
        <Text style={{...style, flexBasis: widths[3]}}>Status</Text>
        <Text style={{...style, flexBasis: widths[4]}}>Can Start</Text>
      </View>
    )
  }
}

export default class BatchItem extends PureComponent {

  static propTypes = {
    item: PropTypes.any.isRequired,
    rowClicked: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    rowStyle: PropTypes.any
  }

  render() {
    const batch = this.props.item
    const style = StyleSheet.flatten(styles.rows)
    const canStart = (batch.startErrors == 0) ? 'Yes' : 'No'
    return (
      <TouchableOpacity onPressIn={() => this.props.rowClicked(batch)} style={this.props.rowStyle}>
        <View style={styles.rowOuter}>
          <Text style={{...style, flexBasis: widths[0]}}>{batch.productName}</Text>
          <Text style={{...style, flexBasis: widths[1]}}>{batch.code}</Text>
          <Text style={{...style, flexBasis: widths[2]}}>{batch.quantity}</Text>
          <Text style={{...style, flexBasis: widths[3]}}>{BatchStates[batch.status]}</Text>
          <Text style={{...style, flexBasis: widths[4]}}>{canStart}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
