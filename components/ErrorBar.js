import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import PropTypes from 'prop-types'
import NexaColours from '../constants/NexaColours'
import { optimalForeColor } from '../Utils/utils'
import {FontSizes} from '../constants/Layout'

const styles = StyleSheet.create(
  {
    base: {
      fontSize: FontSizes.standard,
      padding: 8,
      marginHorizontal: 8,
      marginVertical: 8,
      marginBottom: 8,
      borderRadius: 5,
      textAlign: 'center',
    }
  }
)

export default class ErrorBar extends React.Component {

  static defaultProps = {
    backColor: NexaColours.AlertRed,
    onPress: () => { }
  }

  static propTypes = {
    text: PropTypes.string,
    backColor: PropTypes.oneOf(Object.values(NexaColours)),
    onPress: PropTypes.func
  }

  render() {
    const hasError = this.props.text ? true : false
    if (hasError) {
      const bc = this.props.backColor
      const fc = optimalForeColor(bc)
      const style = StyleSheet.flatten([styles.base, { backgroundColor: bc, color: fc }])
      return (
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <Text style={style} >
            {this.props.text}
          </Text>
        </TouchableWithoutFeedback>
      )
    } else {
      return null
    }
  }
}
