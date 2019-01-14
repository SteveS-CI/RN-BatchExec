import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonStyles from '../constants/ButtonStyles'
import ActionButtons from '../components/ActionButtons'
import ButtonBar from '../components/ButtonBar'
import RoundedButton from '../components/RoundedButton'
import Sockette from 'sockette'
import NexaColours from '../constants/NexaColours';
import VirtualBalance from '../components/VirtualBalance'
import PickerSetting from '../components/PickerSetting'
import DistinctEntry from '../components/DistinctEntry'
import { scale, verticalScale } from '../constants/Layout'
import { ScrollView } from 'react-native-gesture-handler';

const targets = [
  {label: 'None', value: null},
  {label: '50', value: 50},
  {label: '150', value: 150},
  {label: '250', value: 250},
  {label: '350', value: 350}
]

const lowers = [
  {label: 'None', value: null},
  {label: '150', value: 150},
  {label: '200', value: 200},
  {label: '240', value: 240},
  {label: '245', value: 245},
  {label: '350', value: 350}
]

const uppers = [
  {label: 'None', value: null},
  {label: '150', value: 150},
  {label: '255', value: 255},
  {label: '260', value: 260},
  {label: '400', value: 400},
  {label: '450', value: 450}
]

const scales = [
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '5', value: 5},
  {label: '10', value: 10}
]

const dps = [
  {label: '0', value: 0},
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3},
  {label: '4', value: 4},
]

export default class TestScreen5 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      L: 240,
      T: 250,
      U: 260,
      sf: 1,
      dp: 3
    }
  }

  static navigationOptions = {
    title: 'Test Screen 5'
  }

  onPress = (name) => {
    if (name === 'cancel') this.props.navigation.navigate('Dev')
  }

  onTargetChange = (item) => {
    this.setState({T: item.value})
  }

  onLowerChange = (item) => {
    this.setState({L: item.value})
  }

  onUpperChange = (item) => {
    this.setState({U: item.value})
  }

  onScaleChange = (item) => {
    this.setState({sf: item.value})
  }

  onDPChange = (item) => {
    this.setState({dp: item.value})
  }

  render() {
    const scaleMax = 500
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <ActionButtons onPress={this.onPress} />
        <ScrollView>
          <Text style={{ marginHorizontal: scale(12) }}>
            A virtual ("keyboard") balance.\n
            Move the slider to change the scale value.\n
            Double-tap on the display to jump to target,\n
            (or the extreme left of the display to zero).
          </Text>
          <PickerSetting 
              value={this.state.U}
              values={uppers}
              title='Upper'
              onValueChange={this.onUpperChange}
          />
          <PickerSetting 
              value={this.state.T}
              values={targets}
              title='Target'
              onValueChange={this.onTargetChange}
          />
          <PickerSetting 
              value={this.state.L}
              values={lowers}
              title='Lower'
              onValueChange={this.onLowerChange}
          />
          <PickerSetting 
              value={this.state.sf}
              values={scales}
              title='Scale Factor'
              onValueChange={this.onScaleChange}
          />
          <PickerSetting 
              value={this.state.dp}
              values={dps}
              title='Decimal Places'
              onValueChange={this.onDPChange}
          />
          <VirtualBalance
            scaleMax={scaleMax}
            scaleFactor={this.state.sf}
            target={this.state.T}
            upperLimit={this.state.U}
            lowerLimit={this.state.L}
            decimalPlaces={this.state.dp}
            uom='gr'
            showBal />
        </ScrollView>
      </View>
    )
  }
}
