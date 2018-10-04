import React, { Component } from 'react'
import {StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import NexaColours from '../constants/NexaColours';

const rowSelected = {color: 'white'}
const rowPlain = {color: NexaColours.GreyDark}

export default class LocationItem extends Component {

  render() {
    const loc = this.props.item
    const textStyle = this.props.selected ? rowSelected : rowPlain
    const style = {...textStyle, padding: 3}
    return (
      <TouchableOpacity onPress={() => this.props.rowClicked(loc)}>
        <View style={this.props.rowStyle}>
          <View style={{flexDirection: 'row'}}>
            <Text style={style}>ID: {loc.id}, </Text>
            <Text style={style}>Code: {loc.code}</Text>
          </View>
          <Text style={style}>Name: {loc.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

LocationItem.propTypes = {
  item: PropTypes.any.isRequired,
  rowClicked: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  rowStyle: PropTypes.any
}
