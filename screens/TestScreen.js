import React from 'react';
import { StyleSheet, ScrollView, Switch, View, Text, TextInput, TouchableHighlight, Button, Image } from 'react-native';
import RoundedButton from '../components/RoundedButton'
import ActionButtons, { ButtonStyles } from '../components/ActionButtons'
import NexaColours from '../constants/NexaColours'
import ButtonBar from '../components/ButtonBar'
import FileContent from '../components/FileContent'
import ActionImage from '../components/ActionImage'
import TextBar from '../components/TextBar'
import { ActionTitle, ActionPrompt, ActionEntry } from '../components/ActionElements'

const stringEntry = {
  label: 'Label',
  suffix: 'Suffix',
  entryType: 'String'
}

const distinctEntry = {
  label: 'Items',
  entryType: 'Distinct',
  validation: {
    choices: [
      'One', 'Two','Three'
    ]
  }
}

export default class TestScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '', value: 'ABC' }
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
    console.log('Render: ', this.value)
    const buttons = [ButtonStyles.Back, ButtonStyles.No, ButtonStyles.Yes]
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        <ActionTitle text='The Action Name'/>
        <ActionButtons onPress={this.onPress} buttons={buttons}/>
        <ScrollView style={{flexDirection: 'column'}}>
          <ActionPrompt prompt='This is the text of an action prompt' notes='This is the text for optional action notes'/>
          <TextBar backColor={NexaColours.Cyan}>Cyan</TextBar>
          <TextBar backColor={NexaColours.CyanAccent}>Cyan Accent</TextBar>
          <TextBar backColor={NexaColours.Blue}>Blue</TextBar>
          <TextBar backColor={NexaColours.BlueAccent}>Blue Accent</TextBar>
          <TextBar backColor={NexaColours.GreyDark}>Dark Grey</TextBar>
          <TextBar backColor={NexaColours.Grey}>Grey</TextBar>
          <TextBar backColor={NexaColours.GreyAccent}>Grey Accent</TextBar>
          <TextBar backColor={NexaColours.GreyLight}>Light Grey</TextBar>
          <TextBar backColor={NexaColours.GreyUltraLight}>Ultra-Light Grey</TextBar>
          <TextBar backColor={NexaColours.AlertGreen}>Green</TextBar>
          <TextBar backColor={NexaColours.AlertOrange}>Orange</TextBar>
          <TextBar backColor={NexaColours.AlertRed}>Red</TextBar>
          <TextBar backColor={NexaColours.AlertYellow}>Yellow</TextBar>
          <ActionEntry value={this.state.value} entry={{}} onChange={(value) => this.setState({value})}/>
          <ActionEntry value={this.state.value} entry={{label: 'Label'}} onChange={(value) => this.setState({value})}/>
          <ActionEntry value={this.state.value} entry={{suffix: 'Suffix'}} onChange={(value) => this.setState({value})}/>
          <ActionEntry value={this.state.value} entry={stringEntry} onChange={(value) => this.setState({value})}/>
          <ActionEntry value={this.state.value} entry={distinctEntry} onChange={(value) => this.setState({value})}/>
          <ActionImage fileName='setup.jpg' />
          <ActionImage fileName='db_Russell_Sieve1.jpg' />
          <FileContent fileName='General05.txt' backColor={NexaColours.BlueAccent} />
        </ScrollView>
      </View>
    )
  }
}
