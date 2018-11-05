import React, {PureComponent} from 'react'
import {View, Button} from 'react-native'
import Expo from 'expo'
import Settings from '../Store/Settings'
import NexaColours from '../constants/NexaColours'
import ButtonBar from '../components/ButtonBar'
import RoundedButton from '../components/RoundedButton'
import { methods } from '../api/api'

export default class DevScreen extends PureComponent {

  static navigationOptions = {
    title: 'About'
  }

  resetHardware = () => {
    methods.resetHardware().then(() => Expo.Updates.reload())
  }

  render() {
    const nav = this.props.navigation
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        <ButtonBar justify="space-between">
          <RoundedButton
            backColor={NexaColours.AlertYellow}
            title="Cancel"
            onPress={() => {nav.navigate('BatchList')}}
          />
        </ButtonBar>
        <Button title='Clear Location' onPress={() => {Settings.removeItem('location').then(() => Expo.Updates.reload())}}/>
        <Button title='Reset Location & Equipment States' onPress={this.resetHardware}/>
      </View>
    )
  }

}