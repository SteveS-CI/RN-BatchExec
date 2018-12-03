import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, TouchableOpacity, Text, StyleSheet } from 'react-native'
import NexaColours from '../constants/NexaColours'
import { optimalForeColor, shadeBlendConvert } from '../Utils/utils'

const styles =
{
  container: {
    margin: 8,
    padding: 8,
    alignSelf: 'flex-start',
    borderRadius: 12,
    elevation: 8,
    minWidth: 80,
    borderWidth: StyleSheet.hairlineWidth * 2
  },
  text: {
//    fontSize: 16,
    textAlign: 'center'
  }
}

export default class RoundedButton extends PureComponent {

  static defaultProps = {
    title: 'Title',
    backColor: NexaColours.AlertGreen,
    disabled: false
  }

  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    backColor: PropTypes.string,
    disabled: PropTypes.bool
  }

  render() {
    const backgroundColor = this.props.disabled ? NexaColours.Grey : this.props.backColor
    const foreColor = this.props.disabled ? NexaColours.GreyDark : optimalForeColor(backgroundColor)
    const borderColor = this.props.disabled ? NexaColours.GreyDark : foreColor
    const viewStyle = StyleSheet.flatten([styles.container, { backgroundColor }, { borderColor }])
    const textStyle = StyleSheet.flatten([styles.text, { color: foreColor }])
    return (
      <TouchableOpacity disabled={this.props.disabled} onPress={() => this.props.onPress()} style={viewStyle}>
        <Text style={textStyle}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}
