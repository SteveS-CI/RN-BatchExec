import React, {PureComponent}  from 'react'
import PropTypes from 'prop-types'
import { Button, TouchableOpacity, Text, StyleSheet } from 'react-native'
import NexaColours from '../constants/NexaColours'

const styles = 
  {
    container: {
      margin: 5,
      padding: 8,
      alignSelf: 'flex-start',
      borderTopLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    text: {
      fontFamily: 'euro-bold', fontSize: 18,
      color: 'white'
    }
  }

export default class RoundedButton extends PureComponent {
  render() {
    const backColor = this.props.backColor ? this.props.backColor : NexaColours.AlertGreen
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