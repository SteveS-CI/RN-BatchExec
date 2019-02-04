import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import ActionButtons from '../components/ActionButtons'
import RoundedButton from '../components/RoundedButton'
import NexaColours from '../constants/NexaColours';
import Balance from '../components/Balance'
import CustomPicker from '../components/CustomPicker'
import { scale, FontSizes } from '../constants/Layout'

const limits = [
  {label: '--- --- ---', value: {lower: null, target: null, upper: null}},
  {label: '190 --- ---', value: {lower: 190, target: null, upper: null}},
  {label: '--- 200 ---', value: {lower: null, target: 200, upper: null}},
  {label: '190 200 ---', value: {lower: 190, target: 200, upper: null}},
  {label: '--- --- 210', value: {lower: null, target: null, upper: 210}},
  {label: '190 --- 210', value: {lower: 190, target: null, upper: 210}},
  {label: '--- 200 210', value: {lower: null, target: 200, upper: 210}},
  {label: '190 200 210', value: {lower: 190, target: 200, upper: 210}},
  {label: '100 200 ---', value: {lower: 100, target: 200, upper: null}},
  {label: '100 --- 300', value: {lower: 100, target: null, upper: 300}},
  {label: '--- 200 300', value: {lower: null, target: 200, upper: 300}},
]

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
      displayUOM: 'KG',
      pickerValue: limits[0]
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
        T: null,
        L: null,
        U: null,
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
        T: 2,
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

  changeInteractive = () => {
    const value = !this.state.interactive
    if (value) {
      this.setState({source: null, interactive: true})
    } else {
      this.setState({source: '192.168.1.182:8900', interactive: false})
    }
  }

  onPickerChange = (picked) => {
    const {upper, lower, target} = picked.value
    this.setState({pickerValue: picked, U: upper, L: lower, T: target})
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
          <CustomPicker title='Scale Limits' value={this.state.pickerValue} items={limits} display='label' onChange={this.onPickerChange} />
          <RoundedButton title='Interactive' onPress={this.changeInteractive} backColor={this.state.interactive ? NexaColours.Yellow : NexaColours.YellowAccent}/>
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
