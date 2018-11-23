import React from 'react';
import { ScrollView, View } from 'react-native';
import RoundedButton from '../components/RoundedButton'
import ActionButtons from '../components/ActionButtons'
import ButtonStyles from '../constants/ButtonStyles'
import NexaColours from '../constants/NexaColours'
import FileContent from '../components/FileContent'
import ActionImage from '../components/ActionImage'
import TextBar from '../components/TextBar'
import { ActionTitle, ActionPrompt, ActionEntry } from '../components/ActionElements'
import Signature from '../components/Signature'
import Comments from '../components/Comments'

const stringEntry = {
  label: 'Label',
  suffix: 'Suffix',
  entryType: 'String'
}

const distinctEntry1 = {
  entryType: 'Distinct',
  validation: {
    choices: [
      'One', 'Two','Three'
    ]
  }
}

const distinctEntry2 = {
  label: 'Items',
  entryType: 'Distinct',
  validation: {
    choices: [
      'One', 'Two','Three'
    ]
  }
}
const distinctEntry3 = {
  suffix: 'Kg',
  entryType: 'Distinct',
  validation: {
    choices: [
      '100', '110','120'
    ]
  }
}
const distinctEntry4 = {
  label: 'Weight',
  suffix: 'Kg',
  entryType: 'Distinct',
  validation: {
    choices: [
      '250', '275','300'
    ]
  }
}

export default class TestScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      value: '123',
      distinctValue: '3',
      signing: false,
      approving: false,
      commenting: false
    }
  }

  static navigationOptions = {
    title: 'Test Screen'
  }

  componentDidMount() {
  }

  onPress = (name) => {
    if (name === 'cancel') this.props.navigation.navigate('BatchList')
  }

  onSign = (sign, token, comment) => {
    console.log(sign, token, JSON.stringify(comment))
    this.setState({signing: false, approving: false})
  }

  onComment = (valid, comments) => {
    console.log('Comments: ', valid, JSON.stringify(comments))
    this.setState({commenting: false})
  }

  render() {
    const buttons = [ButtonStyles.Previous, ButtonStyles.No, ButtonStyles.Yes]
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        <ActionTitle text='The Action Name'/>
        <ActionButtons onPress={this.onPress} buttons={buttons}/>
        <ScrollView style={{flexDirection: 'column'}}>
          <ActionPrompt prompt='This is the text of an action prompt' notes='This is the text for optional action notes'/>
          <RoundedButton title='Sign Test' onPress={() => this.setState({signing: true})}/>
          <RoundedButton title='Approval Test' onPress={() => this.setState({approving: true})}/>
          <RoundedButton title='Comment Test' onPress={() => this.setState({commenting: true})}/>
          <ActionEntry
            value={this.state.value}
            entry={{}}
            onChange={(value) => this.setState({value})}
          />
          <ActionEntry
            value={this.state.value}
            entry={{label: 'Label', entryType: 'Decimal'}}
            onChange={(value) => this.setState({value})}
            autoFocus={true}
          />
          <ActionEntry
            value={this.state.value}
            entry={{suffix: 'Suffix'}}
            onChange={(value) => this.setState({value})}
          />
          <ActionEntry
            value={this.state.value}
            entry={stringEntry}
            onChange={(value) => this.setState({value})}
          />
          <ActionEntry value={this.state.distinctValue} entry={distinctEntry1} onChange={(distinctValue) => this.setState({distinctValue})} enabled={true}/>
          <ActionEntry value={this.state.distinctValue} entry={distinctEntry2} onChange={(distinctValue) => this.setState({distinctValue})} enabled={true}/>
          <ActionEntry value={this.state.distinctValue} entry={distinctEntry3} onChange={(distinctValue) => this.setState({distinctValue})} enabled={true}/>
          <ActionEntry value={this.state.distinctValue} entry={distinctEntry4} onChange={(distinctValue) => this.setState({distinctValue})} enabled={true}/>
          <ActionImage fileName='setup.jpg' />
          <ActionImage fileName='db_Russell_Sieve1.jpg' />
          <FileContent fileName='General05.txt' backColor={NexaColours.BlueAccent} />
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
          <Signature visible={this.state.signing} onSign={this.onSign} isApproval={false} title='This Action requires a signature'/>
          <Signature visible={this.state.approving} onSign={this.onSign} isApproval={true} title='This Action requires approval'/>
          <Comments visible={this.state.commenting} onComment={this.onComment} />
        </ScrollView>
      </View>
    )
  }
}
