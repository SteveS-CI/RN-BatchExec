import React, {PureComponent} from 'react'
import {View, Button, StyleSheet} from 'react-native'
import Expo from 'expo'
import Settings from '../Store/Settings'
import NexaColours from '../constants/NexaColours'
import ButtonBar from '../components/ButtonBar'
import RoundedButton from '../components/RoundedButton'
import { methods } from '../api/api'

const styles = StyleSheet.create(
  {
    button: {
      margin: 8,
      padding: 8,
      backgroundColor: 'red'
    }
  }
)


export default class DevScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.nav = this.props.navigation
  }

  static navigationOptions = {
    title: 'About'
  }

  resetHardware = () => {
    methods.resetHardware().then(() => this.nav.navigate('Location'))
  }

  clearCache = () => {
    methods.clearCache().then(() => this.nav.navigate('BatchList'))
  }

  render() {
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        <ButtonBar justify="space-between">
          <RoundedButton
            backColor={NexaColours.AlertYellow}
            title="Cancel"
            onPress={() => {this.nav.navigate('BatchList')}}
          />
        </ButtonBar>
        <View style={{flexDirection: 'column'}}>
          <RoundedButton style={styles.button} title='Clear Location' onPress={() => {Settings.removeItem('location').then(() => Expo.Updates.reload())}}/>
          <RoundedButton style={styles.button} title='Reset Location & Equipment States' onPress={this.resetHardware}/>
          <RoundedButton style={styles.button} title='Clear Batch Cache' onPress={this.clearCache}/>
        </View>
      </View>
    )
  }

}