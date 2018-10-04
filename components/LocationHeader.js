import React, {Component} from 'react'
import {Text} from 'react-native'
import Settings from '../Store/Settings'
import NexaColours from '../constants/NexaColours'

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
    ? <Text style={{marginRight: 5, color: NexaColours.Cyan}}>{this.state.location.name}</Text>
    : null
    )
  }
}