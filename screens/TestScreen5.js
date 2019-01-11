import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonStyles from '../constants/ButtonStyles'
import ActionButtons from '../components/ActionButtons'
import ButtonBar from '../components/ButtonBar'
import RoundedButton from '../components/RoundedButton'
import Sockette from 'sockette'
import NexaColours from '../constants/NexaColours';
import VirtualBalance from '../components/VirtualBalance'
import { scale, verticalScale } from '../constants/Layout'
import { ScrollView } from 'react-native-gesture-handler';

export default class TestScreen5 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lower: null, 
      target: null, 
      upper: null
    }
  }

  static navigationOptions = {
    title: 'Test Screen 5'
  }

  onPress = (name) => {
    if (name === 'cancel') this.props.navigation.navigate('Dev')
  }

  render() {
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <ActionButtons onPress={this.onPress} />
        <ScrollView>
          <Text style={{marginHorizontal: scale(12)}}>
            A virtual ("keyboard") balance.
            Move the slider to change the scale value.
            Double-tap on the display to jump to target.
          </Text>
          <ButtonBar justify='flex-start'>
            <RoundedButton title='-|-|-' onPress={() => this.setState({lower: null, target: null, upper: null})}/>
            <RoundedButton title='-|300|-' onPress={() => this.setState({lower: null, target: 300, upper: null})}/>
            <RoundedButton title='300|-|-' onPress={() => this.setState({lower: 300, target: null, upper: null})}/>
            <RoundedButton title='-|-|300' onPress={() => this.setState({lower: null, target: null, upper: 300})}/>
          </ButtonBar>
          <ButtonBar justify='flex-start'>
            <RoundedButton title='280|300|-' onPress={() => this.setState({lower: 280, target: 300, upper: null})}/>
            <RoundedButton title='-|300|320' onPress={() => this.setState({lower: null, target: 300, upper: 320})}/>
            <RoundedButton title='280|-|320' onPress={() => this.setState({lower: 280, target: null, upper: 320})}/>
            <RoundedButton title='280|300|320' onPress={() => this.setState({lower: 280, target: 300, upper: 320})}/>
          </ButtonBar>
          <ButtonBar justify='flex-start'>
            <RoundedButton title='150|300|-' onPress={() => this.setState({lower: 150, target: 300, upper: null})}/>
            <RoundedButton title='-|300|450' onPress={() => this.setState({lower: null, target: 300, upper: 450})}/>
            <RoundedButton title='150|-|450' onPress={() => this.setState({lower: 150, target: null, upper: 450})}/>
            <RoundedButton title='150|300|450' onPress={() => this.setState({lower: 150, target: 300, upper: 450})}/>
          </ButtonBar>
          <ButtonBar justify='flex-start'>
            <RoundedButton title='200|300|320' onPress={() => this.setState({lower: 200, target: 300, upper: 320})}/>
            <RoundedButton title='280|300|400' onPress={() => this.setState({lower: 280, target: 300, upper: 400})}/>
          </ButtonBar>
          <VirtualBalance scaleMax={500} target={this.state.target} upper={this.state.upper} lower={this.state.lower} decimalPlaces={3} uom='Kg'/>
        </ScrollView>
      </View>
    )
  }
}
