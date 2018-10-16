import React, {Component} from 'react'
import {StyleSheet, Text} from 'react-native'
import Settings from '../Store/Settings'
import NexaColours from '../constants/NexaColours'

style = {
  marginRight: 8,
  color: 'black',
  padding: 5,
  backgroundColor: NexaColours.GreyUltraLight,
  borderRadius: 5,
  fontSize: 16
}

export default class LocationHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {location: null}
  }

  componentDidMount() {
    Settings.readObject('location').then((location) => {this.setState({location})})
  }

  render() {
    return (
    this.state.location
    ? <Text style={style}>{this.state.location.name}</Text>
    : null
    )
  }
}