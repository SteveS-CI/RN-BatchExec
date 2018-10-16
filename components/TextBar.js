import React from 'react';
import {StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types'
import NexaColours from '../constants/NexaColours'
import {optimalForeColor} from '../Utils/utils'

const styles = {
    prompt: {
      fontFamily: 'euro-std',
      fontSize: 16,
      padding: 8,
      margin: 8,
      borderRadius: 5,
      alignSelf: 'center'
    }
  }

export default class TextBar extends React.Component {

  static defaultProps = {
    backColor: NexaColours.AlertCyan
  }

  static propTypes = {
    backColor: PropTypes.oneOf(Object.values(NexaColours)).isRequired
  }

  render() {
    const bc = this.props.backColor
    const fc = optimalForeColor(bc)
    return (
      <Text style={{...styles.prompt, backgroundColor: bc, color: fc}} >
        {this.props.children}
      </Text>
    )

  }
}
