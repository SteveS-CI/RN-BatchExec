import React, {PureComponent}  from 'react'
import PropTypes from 'prop-types'
import { Button, TouchableOpacity, Text, StyleSheet } from 'react-native'
import NexaColours from '../constants/NexaColours'
import {optimalForeColor} from '../Utils/utils'

const styles = 
  {
    container: {
      margin: 8,
      padding: 8,
      alignSelf: 'flex-start',
      borderRadius: 8,
    },
    text: {
      fontFamily: 'euro-std', fontSize: 16,
    }
  }

export default class RoundedButton extends PureComponent {

  static defaultProps = {
    title: 'Title',
    backColor: NexaColours.AlertGreen
  }

  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    backColor: PropTypes.string,
    disabled: PropTypes.bool
  }

  render() {
    const backColor = this.props.disabled ? NexaColours.GreyAccent : this.props.backColor// ? this.props.backColor : NexaColours.AlertGreen
    const viewStyle = {...styles.container, backgroundColor: backColor}
    const textStyle = {...styles.text, color: optimalForeColor(backColor)}
    return (
      <TouchableOpacity disabled={this.props.disabled} onPress={() => this.props.onPress()} style={viewStyle}>
        <Text style={textStyle}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}
