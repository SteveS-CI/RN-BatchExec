import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, KeyboardAvoidingView, Picker } from 'react-native';
import RoundedButton from '../components/RoundedButton'
import ActionButtons from '../components/ActionButtons'
import ButtonStyles from '../constants/ButtonStyles'
import NexaColours from '../constants/NexaColours'
import FileContent from '../components/FileContent'
import ActionImage from '../components/ActionImage'
import TextBar from '../components/TextBar'
import ActionTitle from '../components/ActionTitle'
import ActionPrompt from '../components/ActionPrompt'
import ActionEntry from '../components/ActionEntry'
import Signature from '../components/Signature'
import Comments from '../components/Comments'
import TextEntry from '../components/TextEntry';
import CustomPicker from '../components/CustomPicker';

const stringEntry = {
  label: 'Label',
  suffix: 'Suffix',
  entryType: 'String'
}

const distinctEntry4 = {
  label: 'Weight',
  suffix: 'Kg',
  entryType: 'Distinct',
  validation: {
    choices: [
      '250', '275', '300'
    ]
  }
}

const styles = StyleSheet.create(
  {
    textBar: {
      borderColor: NexaColours.Black,
      borderWidth: StyleSheet.hairlineWidth * 2
    }
  }
)

class StringEntry extends Component {
  render() {
    return (
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row'}}>
          <Text>A Label</Text>
          <Text> (Kg)</Text>
        </View>
        <View style={{flexDirection: 'column', alignContent: 'center'}}>
          <Picker style={{width: '50%', transform: [ {scale: 1} ] }}>
            <Picker.Item label='One' value='One'/>
            <Picker.Item label='Two' value='Two'/>
            <Picker.Item label='Three' value='Three'/>
          </Picker>
        </View>
      </View>
    )
  }
}

export default class TestScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      value: '123',
      distinctValue: '3',
      signing: false,
      approving: false,
      commenting: false,
      pickerValue: 'Original'
    }
  }

  static navigationOptions = {
    title: 'Test Screen'
  }

  componentDidMount() {
  }

  onPress = (name) => {
    if (name === 'cancel') this.props.navigation.navigate('Dev')
  }

  onSign = (sign, token, comment) => {
    this.setState({ signing: false, approving: false })
  }

  onComment = (valid, comments) => {
    this.setState({ commenting: false })
  }

  pickerChange = (value) => {
    this.setState({pickerValue: value})
  }

  render() {
    const buttons = [ButtonStyles.Previous, ButtonStyles.No, ButtonStyles.Yes]
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <ActionTitle text='The Action Name' />
        <ActionButtons onPress={this.onPress} buttons={buttons} />
        <KeyboardAvoidingView behavior='position' enabled style={{ flex: 1 }}>
          <ScrollView style={{ flexDirection: 'column' }}>
            <ActionPrompt prompt='This is the text of an action prompt' notes='This is the text for optional action notes' />
            <RoundedButton title='Sign Test' onPress={() => this.setState({ signing: true })} />
            <RoundedButton title='Approval Test' onPress={() => this.setState({ approving: true })} />
            <RoundedButton title='Comment Test' onPress={() => this.setState({ commenting: true })} />
            <View>
              <ActionEntry value={this.state.value} entry={stringEntry} onChange={(value) => this.setState({ value })} />
              <ActionEntry value={this.state.distinctValue} entry={distinctEntry4} onChange={(distinctValue) => this.setState({ distinctValue })} enabled={true} />
            </View>
            <CustomPicker title='Custom Picker' items={["One","Two","Three","Four","Five"]} value={this.state.pickerValue} onChange={this.pickerChange} />
            <StringEntry
              label='Weight'
              suffix='Kg'
              value='1234'
            />
            <ActionImage fileName='setup.jpg' />
            <ActionImage fileName='db_Russell_Sieve1.jpg' />
            <FileContent fileName='General05.txt' backColor={NexaColours.BlueAccent} />
            <TextBar style={styles.textBar} backColor={NexaColours.Black}>Black (Not Nexa)</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.GreyDarkest}>Darkest Grey (not a true Nexa colour)</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.GreyDark}>Dark Grey</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.Grey}>Grey</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.GreyAccent}>Grey Accent</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.GreyLight}>Light Grey</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.GreyUltraLight}>Ultra-Light Grey</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.White}>White (Not Nexa)</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.Blue}>Blue</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.Cyan}>Cyan</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.AlertGreen}>Green</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.AlertOrange}>Orange</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.AlertRed}>Red</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.AlertYellow}>Yellow</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.BlueAccent}>Blue Accent</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.CyanAccent}>Cyan Accent</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.GreenAccent}>Green Accent (Not Nexa)</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.OrangeAccent}>Orange Accent (Not Nexa)</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.RedAccent}>Red Accent (Not Nexa)</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.YellowAccent}>Yellow Accent (Not Nexa)</TextBar>
            <Signature visible={this.state.signing} onSign={this.onSign} isApproval={false} title='This Action requires a signature' />
            <Signature visible={this.state.approving} onSign={this.onSign} isApproval={true} title='This Action requires approval' />
            <Comments visible={this.state.commenting} onComment={this.onComment} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }
}
