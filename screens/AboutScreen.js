import React, {PureComponent} from 'react'
import {View} from 'react-native'
import NexaColours from '../constants/NexaColours'
import ButtonBar from '../components/ButtonBar'
import RoundedButton from '../components/RoundedButton'
import Expo from 'expo'

export default class AboutScreen extends PureComponent {

  static navigationOptions = {
    title: 'About'
  }

  render() {
    const nav = this.props.navigation
    console.log(JSON.stringify(Expo.Constants))
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        <ButtonBar justify="space-between">
          <RoundedButton
            backColor={NexaColours.AlertYellow}
            title="Cancel"
            onPress={() => {
              nav.navigate('BatchList')
            }}
          />
        </ButtonBar>
      </View>
    )
  }

}