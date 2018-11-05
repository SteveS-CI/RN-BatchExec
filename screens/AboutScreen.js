import React, {PureComponent} from 'react'
import {View} from 'react-native'
import NexaColours from '../constants/NexaColours'
import ScreenHeader from '../components/ScreenHeader'
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
        <ScreenHeader
          title='About'
          onCancel={() => nav.navigate('BatchList')}
        />
        <PropList headers={headers} data={Expo.Constants.manifest} />
      </View>
    )
  }

}