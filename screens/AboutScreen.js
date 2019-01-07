import React, { PureComponent } from 'react'
import { View, Text, Dimensions, PixelRatio } from 'react-native'
import ScreenHeader from '../components/ScreenHeader'
import PropList from '../components/PropList'
import { Constants } from 'expo'

export default class AboutScreen extends PureComponent {

  static navigationOptions = () => {
    return {
      title: 'About'
    }
  }

  render() {
    const nav = this.props.navigation
    const headers = [
      { display: 'Name', source: 'name' },
      { display: 'Description', source: 'description' },
      { display: 'Version', source: 'version' },
      { display: 'SDK Version', source: 'sdkVersion' },
    ]
    data = {
      ...Constants.manifest,

    }
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <ScreenHeader onCancel={() => nav.navigate('BatchList')} />
        <PropList headers={headers} data={Constants.manifest} />
      </View>
    )
  }

}