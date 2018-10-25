import React, {PureComponent}  from 'react'
import PropTypes from 'prop-types'
import { Button, TouchableOpacity, Text, StyleSheet } from 'react-native'
import NexaColours from '../constants/NexaColours'
import {optimalForeColor, shadeBlendConvert} from '../Utils/utils'

const styles = 
  {
    container: {
      margin: 8,
      padding: 8,
      alignSelf: 'flex-start',
      borderRadius: 8,
      elevation: 8,
      minWidth: 100,
      borderWidth: 2,
    },
    text: {
      fontFamily: 'euro-std',
      fontSize: 16,
      textAlign: 'center'
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
    const backgroundColor = this.props.disabled ? NexaColours.GreyAccent : this.props.backColor
    const borderColor = this.props.disabled ? NexaColours.GreyDark : 'white'
    const viewStyle = {...styles.container, backgroundColor, borderColor}
    const textStyle = {...styles.text, color: optimalForeColor(backgroundColor)}
    return (
      <TouchableOpacity disabled={this.props.disabled} onPress={() => this.props.onPress()} style={viewStyle}>
        <Text style={textStyle}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}
