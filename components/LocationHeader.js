import React, {Component} from 'react'
import {StyleSheet, Text} from 'react-native'
import Settings from '../Store/Settings'
import NexaColours from '../constants/NexaColours'

styles = StyleSheet.create({
  styleLight: {marginRight: 8, color: NexaColours.GreyDark, padding: 5, backgroundColor: NexaColours.GreyUltraLight, borderRadius: 5},
  styleDark: {marginRight: 8, color: NexaColours.GreyUltraLight, padding: 5, backgroundColor: NexaColours.GreyDark, borderRadius: 5}
 })


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
    ? <Text style={styles.styleLight}>{this.state.location.name}</Text>
    : null
    )
  }
}