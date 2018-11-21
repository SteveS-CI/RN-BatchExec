import React, { Component } from 'react'
import {StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import PropList from '../components/PropList'
import NexaColours from '../constants/NexaColours';

export default class BatchComponent extends Component {

  headers1 = [
    {display: 'Component ID', source: 'id'},
    {display: 'Line Number', source: 'lineNumber'}
  ]

  headers2 = [
    {display: 'Material Code', source: 'materialCode'},
    {display: 'Material Name', source: 'materialName'}
  ]

  headers3 = [
    {display: 'Type', source:"componentType"},
    {display: 'Quantity', source:"quantity"},
    {display: 'Status', source:"status"}
  ]

  render() {
    const comp = this.props.item
    const style = {color: 'black', padding: 3}
    const fieldStyle = {...style, color: NexaColours.Blue}
    const rowStyle = {...this.props.rowStyle, borderBottomWidth: StyleSheet.hairlineWidth}
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <PropList headers={this.headers1} data={comp} />
          <PropList headers={this.headers2} data={comp} />
          <PropList headers={this.headers3} data={comp} />
        </View>
      </View>
    )
  }
}

{/*}
"id": 336060,
"lineNumber": 1,
"materialCode": "MMSMAT01",
"materialName": "Lactose",
"componentType": "Input",
"quantity": "2.500 kg",
"status": "NotStarted"
*/}

BatchComponent.propTypes = {
  item: PropTypes.any.isRequired,
  rowStyle: PropTypes.any
}
