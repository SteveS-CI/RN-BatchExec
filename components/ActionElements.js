import React, {PureComponent} from 'react'
import {StyleSheet, Text} from 'react-native'
import PropTypes from 'prop-types'
import TextBar from './TextBar'
import NexaColours from '../constants/NexaColours'

const styles = StyleSheet.create(
  {
    breadcrumb: {
      marginRight: 8,
      color: 'white',
      padding: 5,
      backgroundColor: NexaColours.BlueAccent,
      borderRadius: 5,
      fontSize: 16
    },
    title: {
      borderRadius: 0,
      marginHorizontal: 0,
      marginBottom: 0,
      borderColor: 'black',
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    prompt: {

    },
    notes: {

    }
  }
)

export class ActionBreadcrumb extends PureComponent {

  static propTypes = {
    text: PropTypes.string.isRequired
  }

  render() {
    return (
      <Text style={styles.breadcrumb}>{this.props.text}</Text>
    )
  }
}

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
