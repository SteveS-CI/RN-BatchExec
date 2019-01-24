import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonStyles from '../constants/ButtonStyles'
import ActionButtons from '../components/ActionButtons'
import ButtonBar from '../components/ButtonBar'
import RoundedButton from '../components/RoundedButton'
import NexaColours from '../constants/NexaColours';
import Balance from '../components/Balance'
import PickerSetting from '../components/PickerSetting'
import DistinctEntry from '../components/DistinctEntry'
import { scale, verticalScale, FontSizes } from '../constants/Layout'
import { ScrollView } from 'react-native-gesture-handler';
import SwitchSetting from '../components/SwitchSetting';

export default class TestScreen5 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 2, // Measure
      zeroOffset: 0,
      tareOffset: 0,
      T: 100,
      L: 95,
      U: 105,
      sf: 1,
      dp: 3,
      source: null,
      interactive: true,
      displayUOM: 'KG'
    }
  }

  static navigationOptions = {
    title: 'Test Screen 5'
  }

  onPress = (name) => {
    if (name === 'cancel') {
      this.props.navigation.navigate('Dev')
    }
  }

  setModeZero = () => {
    this.setState(
      {
        mode: 0, // Zero
        zeroOffset: 0,
        tareOffset: 0,
        T: 0,
        L: -0.2,
        U: 0.2,
        sf: 1,
        displayUOM: 'KG'
      }
    )
  }

  setModeTare = () => {
    this.setState(
      {
        mode: 1, // Tare
        zeroOffset: 0.1,
        tareOffset: 0,
        T: null,
        L: null,
        U: null,
        sf: 1,
        displayUOM: 'KG'
      }
    )
  }

  setModeMeasure = () => {
    this.setState(
      {
        mode: 2, // Measure
        zeroOffset: 0.1,
        tareOffset: 2,
        T: 100,
        L: 95,
        U: 105,
        sf: 1,
        displayUOM: 'L'
      }
    )
  }

  setScaleLow = () => {
    this.setState(
      {
        mode: 2, // Measure
        zeroOffset: 0.1,
        tareOffset: 2,
        T: 100,
        L: 95,
        U: 105,
        sf: 0.5,
        displayUOM: 'L'
      }
    )
  }

  setScaleHigh = () => {
    this.setState(
      {
        mode: 2, // Measure
        zeroOffset: 0.1,
        tareOffset: 2,
        T: 100,
        L: 95,
        U: 105,
        sf: 2,
        displayUOM: 'L'
      }
    )
  }

  changeInteractive = (value) => {
    if (value) {
      this.setState({source: null, interactive: true})
    } else {
      this.setState({source: '192.168.1.182:8900', interactive: false})
    }
  }

  render() {
    const scaleMax = 500
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <ActionButtons onPress={this.onPress} />
        <ScrollView>
          <Text style={{ marginHorizontal: scale(12), fontSize: FontSizes.smaller }}>
            A virtual ("keyboard") balance.
            Move the slider to change the scale value.
            Double-tap on the display to jump to target,
            (or the extreme left of the display to zero).
          </Text>
          <View style={{flexDirection: 'row'}}>
            <RoundedButton title='Mode: Zero' onPress={this.setModeZero} />
            <RoundedButton title='Mode: Tare' onPress={this.setModeTare} />
            <RoundedButton title='Mode: Measure' onPress={this.setModeMeasure} />
          </View>
          <View style={{flexDirection: 'row'}}>
            <RoundedButton title='Normal: 1:1' onPress={this.setModeMeasure} />
            <RoundedButton title='Scaled: (0.5)' onPress={this.setScaleLow} />
            <RoundedButton title='Scaled: (2)' onPress={this.setScaleHigh} />
          </View>
          <SwitchSetting value={this.state.interactive} title='Interactive' onValueChange={this.changeInteractive}/>
          <Balance
            balanceName='Keyboard1'
            balanceSource={this.state.source}
            balanceMax={scaleMax}
            balanceMode={this.state.mode}
            scaleFactor={this.state.sf}
            target={this.state.T}
            upperLimit={this.state.U}
            lowerLimit={this.state.L}
            decimalPlaces={this.state.dp}
            zeroOffset={this.state.zeroOffset}
            tareOffset={this.state.tareOffset}
            balanceUOM='KG'
            displayUOM={this.state.displayUOM}
            showBalReading={true} />
        </ScrollView>
      </View>
    )
  }
}
