import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonStyles from '../constants/ButtonStyles'
import ActionButtons from '../components/ActionButtons'
import Sockette from 'sockette'
import NexaColours from '../constants/NexaColours';
import VirtualBalance from '../components/VirtualBalance'
import { scale, verticalScale } from '../constants/Layout'

export default class TestScreen5 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reading: {value: 0, uom: '', pass: false}
    }
  }

  static navigationOptions = {
    title: 'Test Screen 5'
  }

  onPress = (name) => {
    if (name === 'cancel') this.props.navigation.navigate('Dev')
  }

  render() {
    const buttons = [ButtonStyles.Previous, ButtonStyles.No, ButtonStyles.Yes]
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <ActionButtons onPress={this.onPress} />
        <VirtualBalance target={250} upper={260} lower={240} decimalPlaces={2} uom='Kg'/>
      </View>
    )
  }
}
