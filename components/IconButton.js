import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, TouchableOpacity, Text, StyleSheet } from 'react-native'
import NexaColours from '../constants/NexaColours'
import { optimalForeColor } from '../Utils/utils'
import FontAwesome, { Icons, parseIconFromClassName } from 'react-native-fontawesome';
import SpinningIcon from 'react-native-fontawesome/SpinningIcon';
import {FontSizes} from '../constants/Layout'

const styles =
{
  container: {
    marginHorizontal: 8,
    padding: 8,
    alignSelf: 'flex-start',
    borderRadius: 12,
    elevation: 8,
    minWidth: FontSizes.iconButton,
    borderWidth: StyleSheet.hairlineWidth * 2
  },
  text: {
    fontSize: FontSizes.iconButton,
    textAlign: 'center'
  }
}

export default class IconButton extends PureComponent {

  static defaultProps = {
    iconName: 'smile',
    backColor: NexaColours.AlertGreen,
    disabled: false,
    spin: false,
    onPress: () => {} // required, but prevents error
  }

  static propTypes = {
    icon: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    backColor: PropTypes.string,
    disabled: PropTypes.bool,
    spin: PropTypes.bool
  }

  getIcon = (style) => {
    const icon = parseIconFromClassName(this.props.iconName)
    const contain = this.props.spin
      ? <SpinningIcon style={style}>{icon}</SpinningIcon>
      : <FontAwesome style={style}>{icon}</FontAwesome>
    return contain
  }

  render() {
    const backgroundColor = this.props.disabled ? NexaColours.Grey : this.props.backColor
    const foreColor = this.props.disabled ? NexaColours.GreyDark : optimalForeColor(backgroundColor)
    const borderColor = this.props.disabled ? NexaColours.GreyDark : foreColor
    const viewStyle = StyleSheet.flatten([styles.container, { backgroundColor }, { borderColor }])
    const textStyle = StyleSheet.flatten([styles.text, { color: foreColor }])
    const icon = this.getIcon(textStyle)
    return (
      <TouchableOpacity disabled={this.props.disabled} onPress={() => this.props.onPress()} style={viewStyle}>
        {icon}
      </TouchableOpacity>
    )
  }
}
