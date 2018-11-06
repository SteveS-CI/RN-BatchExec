import React, {PureComponent} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import PropTypes from 'prop-types'
import TextBar from './TextBar'
import NexaColours from '../constants/NexaColours'
import {optimalForeColor} from '../Utils/utils'

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
      borderTopColor: 'white',
      borderBottomColor: 'black',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
      fontSize: 20
    },
    promptContainer: {
      marginHorizontal: 8,
      padding: 8,
      borderRadius: 5,
      backgroundColor: NexaColours.Cyan
    },
    prompt: {
      marginBottom:5,
      alignSelf: 'center',
      fontSize: 18
    },
    notes: {
      padding: 5,
      borderRadius: 5,
      textAlign: 'center',
      backgroundColor: NexaColours.CyanAccent,
      fontSize: 16
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
      <TextBar backColor={NexaColours.BlueAccent} style={styles.title}>{this.props.text}</TextBar>
    )
  }
}

export class ActionPrompt extends PureComponent {

  static propTypes = {
    prompt: PropTypes.string.isRequired,
    notes: PropTypes.string
  }

  render() {
    const promptColor = optimalForeColor(NexaColours.Cyan)
    const noteColor = optimalForeColor(NexaColours.CyanAccent)
    const promptStyle = StyleSheet.flatten([styles.prompt, {color: promptColor}])
    const noteStyle = StyleSheet.flatten([styles.notes, {color: noteColor}])
    return (
      <View style={styles.promptContainer}>
        <Text style={promptStyle}>
          {this.props.prompt}
        </Text>
        {this.props.notes && 
          <Text style={noteStyle}>{this.props.notes}</Text>
        }
      </View>
    )
  }
}

export class ActionEntry extends PureComponent {

  static propTypes = {
    value: PropTypes.any
  }

  onChangeText = () => {

  }

  render() {
    <View style={{flexDirection: 'column', padding: 8}}>
      <Text>{this.props.title}</Text>
      <TextInput
        textContentType='URL'
        value={this.props.value}
        onChangeText={this.onChangeText}
        underlineColorAndroid={'#00000000'}
      />
    </View>
  }
}