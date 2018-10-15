import React from 'react';
import {StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types'
import NexaColours from '../constants/NexaColours'

const styles = {
    prompt: {
      fontFamily: 'euro-std',
      fontSize: 18,
      padding: 8,
      margin: 5,
      borderRadius: 5,
      alignSelf: 'center'
    }
  }

export default class PromptText extends React.Component {

  static propTypes = {
    backColor: PropTypes.oneOf(
      [
        NexaColours.AlertCyan,
        NexaColours.AlertGreen,
        NexaColours.AlertOrange,
        NexaColours.AlertRed,
        NexaColours.AlertYellow
      ]
    ).isRequired
  }

  optimalForeColor(backColor) {
    switch(backColor) {
      case NexaColours.AlertCyan: return 'white'
      case NexaColours.AlertGreen: return 'white'
      case NexaColours.AlertOrange: return 'black'
      case NexaColours.AlertRed: return 'white'
      case NexaColours.AlertYellow: return 'black'
      default: return 'white'
    }
  }

  render() {
    const bc = this.props.backColor
    const fc = this.optimalForeColor(bc)
    return (
      <Text style={{...styles.prompt, backgroundColor: bc, color: fc}} >
        {this.props.children}
      </Text>
    )

  }
}
