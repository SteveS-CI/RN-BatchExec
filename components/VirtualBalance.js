import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { scale, moderateScale, FontSizes } from '../constants/Layout'
import NexaColours from '../constants/NexaColours';

const styles = StyleSheet.create({
  balance: {
    alignSelf: 'center',
    backgroundColor: NexaColours.GreyUltraLight,
    margin: scale(12), padding: scale(8),
    borderColor: NexaColours.GreyDarkest,
    borderRadius: scale(12), borderWidth: StyleSheet.hairlineWidth * moderateScale(5),
    fontSize: FontSizes.balance, fontFamily: 'euro-demi'
  }
})

export default class VirtualBalance extends Component {

  render() {
    return (
      <View>
        <Text style={styles.balance}>1234.567</Text>
      </View>
    )
  }
}