import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonStyles from '../constants/ButtonStyles'
import ActionButtons from '../components/ActionButtons'
import Sockette from 'sockette'
import NexaColours from '../constants/NexaColours';

const styles = StyleSheet.create({
  balance: {
    alignSelf: 'center',
    backgroundColor: NexaColours.GreyUltraLight,
    margin: 12, padding: 8,
    borderColor: NexaColours.GreyDarkest,
    borderRadius: 12, borderWidth: StyleSheet.hairlineWidth * 5,
    fontSize: 40, fontFamily: 'euro-demi'
  }
})

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

  onRx = (e) => {
    const reading = JSON.parse(e.data)
    if (this.ws) {this.setState({reading})}
  }

  componentDidMount() {
    this.ws = new Sockette('ws://192.168.1.96:8800', {
      timeout: 5e3,
      maxAttempts: 10,
      onopen: e => console.log('Socket Connected!'),
      onmessage: e => this.onRx(e),
      onreconnect: e => console.log('Socket reconnecting...'),
      onmaximum: e => console.log('Socket stop attempting!'),
      onclose: e => console.log('Socket closed'),
      onerror: e => console.log('Socket Error:', e.data)
    });
  }

  componentWillUnmount() {
    console.log('CWU')
    this.ws.close()
    this.ws = null
  }

  onPress = (name) => {
    if (name === 'cancel') this.props.navigation.navigate('BatchList')
  }

  render() {
    const buttons = [ButtonStyles.Previous, ButtonStyles.No, ButtonStyles.Yes]
    const value = this.state.reading.value
    const color = this.state.reading.pass ? NexaColours.Green : NexaColours.Red
    const digitStyle = StyleSheet.flatten([styles.balance, {color: color}])
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <ActionButtons onPress={this.onPress} buttons={buttons} />
        <Text style={{padding: 8}}>
          This is an example of using a WebSocket for direct Server -> Client communication.
          It could be used to connect to balance interfaces.
        </Text>
        <Text style={digitStyle}>{value}</Text>
      </View>
    )
  }
}
