import React, {PureComponent}  from 'react'
import PropTypes from 'prop-types'
import { Button, TouchableOpacity, Text, StyleSheet } from 'react-native'
import NexaColours from '../constants/NexaColours'

const styles = 
  {
    container: {
      margin: 5,
      paddingHorizontal: 8,
      paddingVertical: 5,
      alignSelf: 'flex-start',
      borderTopLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    text: {
      fontFamily: 'euro-std', fontSize: 16,
      color: 'white'
    }
  }

export default class RoundedButton extends PureComponent {
  render() {
    const backColor = this.props.disabled ? NexaColours.Grey : this.props.backColor ? this.props.backColor : NexaColours.AlertGreen
    const style = {...styles.container, backgroundColor: backColor}
    return (
      <TouchableOpacity disabled={this.props.disabled} onPress={() => this.props.onPress()} style={style}>
        <Text style={styles.text}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

RoundedButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  backColor: PropTypes.string,
  disabled: PropTypes.bool
}