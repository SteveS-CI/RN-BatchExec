import React, {PureComponent} from 'react'
import {View} from 'react-native'
import NexaColours from '../constants/NexaColours'
import ButtonBar from '../components/ButtonBar'
import RoundedButton from '../components/RoundedButton'
import PropList from '../components/PropList'
import Expo from 'expo'

export default class AboutScreen extends PureComponent {

  static navigationOptions = {
    title: 'About'
  }

  render() {
    const nav = this.props.navigation
    const headers = [
      {display: 'Name', source: 'name'},
      {display: 'Description', source: 'description'},
      {display: 'Version', source: 'version'},
    ]
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
        <PropList headers={headers} data={Expo.Constants.manifest} />
      </View>
    )
  }

}