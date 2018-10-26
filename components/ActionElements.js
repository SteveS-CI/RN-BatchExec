import React, {PureComponent} from 'react'
import {StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
import TextBar from './TextBar'
import NexaColours from '../constants/NexaColours'

const styles = StyleSheet.create(
  {
    title: {
      borderRadius: 0,
      marginHorizontal: 0
    },
    prompt: {

    },
    notes: {

    }
  }
)

export class ActionTitle extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired
  }

  render() {
    return (
      <TextBar backColor={NexaColours.Grey} style={styles.title}>{this.props.text}</TextBar>
    )
  }
}

export class ActionPrompt extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired
  }

  render() {
    return (
      <TextBar backColor={NexaColours.AlertCyan} style={styles.prompt}>{this.props.text}</TextBar>
    )
  }
}

export class ActionNotes extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired
  }

  render() {
    return (
      <TextBar backColor={NexaColours.GreyAccent} style={styles.notes}>{this.props.text}</TextBar>
    )
  }
}
