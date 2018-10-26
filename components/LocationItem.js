import React, { Component } from 'react'
import {StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'
import FieldValue from '../components/FieldValue'
import FieldHeader from '../components/FieldHeader'
import NexaColours from '../constants/NexaColours';

const rowSelected = {color: 'white'}
const rowPlain = {color: NexaColours.GreyDark}

export default class LocationItem extends Component {

  render() {
    const loc = this.props.item
    const textStyle = this.props.selected ? rowSelected : rowPlain
    const style = {...textStyle, paddingVertical: 8, paddingHorizontal: 3}
    return (
      <TouchableWithoutFeedback onPress={() => this.props.rowClicked(loc)}>
        <View style={this.props.rowStyle}>
          <View style={{flexDirection: 'row', paddingVertical: 12}}>
            {/* <FieldHeader>ID:</FieldHeader>
            <FieldValue>{loc.id}</FieldValue> */}
            <FieldHeader>Code:</FieldHeader>
            <FieldValue>{loc.code}</FieldValue>
            <FieldHeader>Name:</FieldHeader>
            <FieldValue>{loc.name}</FieldValue>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

LocationItem.propTypes = {
  item: PropTypes.any.isRequired,
  rowClicked: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  rowStyle: PropTypes.any
}
