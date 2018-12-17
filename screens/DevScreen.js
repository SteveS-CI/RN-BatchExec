import React, {PureComponent} from 'react'
import {View, Button, StyleSheet} from 'react-native'
import Settings from '../Store/Settings'
import NexaColours from '../constants/NexaColours'
import ButtonBar from '../components/ButtonBar'
import RoundedButton from '../components/RoundedButton'
import { methods } from '../api/api'

const styles = StyleSheet.create(
  {
    button: {
      margin: 8,
      padding: 8,
      backgroundColor: 'red'
    }
  }
)

export default class DevScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.nav = this.props.navigation
  }

  static navigationOptions = {
    title: 'About'
  }

  resetHardware = () => {
    methods.resetHardware().then(() => this.nav.navigate('Location'))
  }

  clearCache = () => {
    methods.clearCache().then(() => this.nav.navigate('BatchList'))
  }

  testScreen = () => {
    this.nav.navigate("Test")
  }

  testScreen2 = () => {
    this.nav.navigate("Test2")
  }

  testScreen3 = () => {
    this.nav.navigate("Test3")
  }

  testScreen4 = () => {
    this.nav.navigate("Test4")
  }

  testScreen5 = () => {
    this.nav.navigate("Test5")
  }

  testScreen6 = () => {
    this.nav.navigate("Test6")
  }

  update = () => {
    this.props.screenProps.update()
  }

  destroy = () => {
    Settings.deleteSettings()
    this.props.screenProps.refresh()
  }

  render() {
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        <ButtonBar justify="space-between">
          <RoundedButton
            backColor={NexaColours.AlertYellow}
            title="Cancel"
            onPress={() => {this.nav.navigate('BatchList')}}
          />
        </ButtonBar>
        <View style={{flexDirection: 'column'}}>
          <RoundedButton style={styles.button} title='Clear Location' onPress={() => {Settings.removeItem('location').then(() => Expo.Updates.reload())}}/>
          <RoundedButton style={styles.button} title='Reset Location & Equipment States' onPress={this.resetHardware}/>
          <RoundedButton style={styles.button} title='Clear Batch Cache' onPress={this.clearCache}/>
          <RoundedButton style={styles.button} title='Show Test Screen' onPress={this.testScreen}/>
          <RoundedButton style={styles.button} title='Show Test Screen 2' onPress={this.testScreen2}/>
          <RoundedButton style={styles.button} title='Barcode Reader Test' onPress={this.testScreen3} backColor={NexaColours.AlertCyan}/>
          <RoundedButton style={styles.button} title='WebView Test' onPress={this.testScreen4} backColor={NexaColours.AlertYellow}/>
          <RoundedButton style={styles.button} title='WebSocket (balance reading?) Test' onPress={this.testScreen5} backColor={NexaColours.AlertYellow}/>
          <RoundedButton style={styles.button} title='Custom Keyboard' onPress={this.testScreen6} />
          <RoundedButton style={styles.button} title='Get Updates' onPress={this.update} backColor={NexaColours.AlertYellow}/>
          <RoundedButton style={styles.button} title='Destroy Settings !!!!' onPress={this.destroy} backColor={NexaColours.AlertRed}/>
        </View>
      </View>
    )
  }

}