import React from 'react';
import { StyleSheet, ScrollView, Switch, View, Text, TextInput, TouchableHighlight, Button, Image } from 'react-native';
import RoundedButton from '../components/RoundedButton'
import ActionButtons, { ButtonStyles } from '../components/ActionButtons'
import NexaColours from '../constants/NexaColours'
import ButtonBar from '../components/ButtonBar'
import FileContent from '../components/FileContent'
import ActionImage from '../components/ActionImage'
import { ActionTitle, ActionPrompt, ActionNotes } from '../components/ActionElements'

export default class TestScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '' }
  }

  static navigationOptions = {
    title: 'Test Screen'
  }

  componentDidMount() {
  }

  onPress = (name) => {
    if (name === 'cancel') this.props.navigation.navigate('BatchList')
  }

  render() {
    const buttons = [ButtonStyles.Back, ButtonStyles.No, ButtonStyles.Yes]
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        <ActionTitle text='The Action Name'/>
        <ActionButtons onPress={this.onPress} buttons={buttons}/>
        <ScrollView style={{flexDirection: 'column'}}>
          <ActionPrompt prompt='This is the text of an action prompt' notes='This is the text for optional action notes'/>
          <ActionImage fileName='setup.jpg' />
          <ActionImage fileName='db_Russell_Sieve1.jpg' />
          <FileContent fileName='General09.txt' backColor={NexaColours.BlueAccent} />
        </ScrollView>
      </View>
    )
  }
}
