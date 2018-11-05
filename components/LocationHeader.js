import React, {Component} from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import Settings from '../Store/Settings'
import NexaColours from '../constants/NexaColours'

const styles = StyleSheet.create(
  {
    container: {
      marginRight: 8,
      padding: 5,
      backgroundColor: NexaColours.GreyUltraLight,
      borderRadius: 5,
    }
  }
) 

export default class LocationHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {location: null}
  }

  static propTypes = {
    navigation: PropTypes.any
  }

  navigate = () => {
    if (this.props.navigation) this.props.navigation.navigate('Location')
  }

  componentDidMount() {
    Settings.readObject('location').then((location) => {this.setState({location})})
  }

  render() {
    return (
    this.state.location
    ? <TouchableOpacity style={styles.container} onPress={this.navigate}>
        <Text style={{color: 'black', fontSize: 16}}>{this.state.location.name}</Text>
      </TouchableOpacity>
    : null
    )
  }
}