import React from 'react';
import {View, TextInput, StyleSheet, Picker } from 'react-native';
import ButtonStyles from '../constants/ButtonStyles'
import ActionButtons from '../components/ActionButtons'
import ActionEntry from '../components/ActionEntry'
import NexaColours from '../constants/NexaColours';
import RoundedButton from '../components/RoundedButton';

export default class TestScreen3 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entryValue: null,
      keyboardType: 'default'
    }
  }

  static navigationOptions = {
    title: 'Test Screen 3'
  }

  onPress = (name) => {
    if (name === 'cancel') this.props.navigation.navigate('BatchList')
  }

  onChange = (value, exit) => {
    this.setState({entryValue: value})
  }

  render() {
    const buttons = [ButtonStyles.Previous, ButtonStyles.No, ButtonStyles.Yes]
    return (
      <View style={{flexDirection: 'column'}}>
        <ActionButtons onPress={this.onPress} buttons={buttons}/>
        <View style={{flexDirection: 'column'}}>
          <ActionEntry
            entry={{label: 'ID', entryType: 'Integer', entryTypeEnum: 1}}
            value={this.state.entryValue}
            useCamera={true} 
            onChange={this.onChange}/>
          <TextInput style={
              {
                backgroundColor: NexaColours.GreyLight,
                padding: 8,
                borderColor: NexaColours.GreyDarkest,
                borderWidth: StyleSheet.hairlineWidth*2,
                margin: 12,
                alignSelf: 'flex-start',
                minWidth: 300
              }}
            underlineColorAndroid='transparent'
            keyboardType={this.state.keyboardType}
          />
          <Picker prompt='Keyboard Type' selectedValue={this.state.keyboardType} onValueChange={(value) => {this.setState({keyboardType: value})}}>
            <Picker.Item label='Default' value='default' />              
            <Picker.Item label='Numeric' value='numeric' />              
            <Picker.Item label='Email Address' value='email-address' />              
            <Picker.Item label='ASCII Capable' value='ascii-capable' />              
            <Picker.Item label='Numbers and Punctuation' value='numbers-and-punctuation' />              
            <Picker.Item label='URL' value='url' />              
            <Picker.Item label='Number Pad' value='number-pad' />              
            <Picker.Item label='Phone Pad' value='phone-pad' />              
            <Picker.Item label='Name Phone Pad' value='name-phone-pad' />              
            <Picker.Item label='Decimal Pad' value='decimal-pad' />              
            <Picker.Item label='Twitter' value='twitter' />              
            <Picker.Item label='Web Search' value='web-search' />              
          </Picker>
        </View>
      </View>
    )
  }
}
