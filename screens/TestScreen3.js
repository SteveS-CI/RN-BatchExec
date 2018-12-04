import React from 'react';
import {View } from 'react-native';
import ButtonStyles from '../constants/ButtonStyles'
import ActionButtons from '../components/ActionButtons'
import ActionEntry from '../components/ActionEntry'

export default class TestScreen3 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entryValue: null
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
        <View>
          <ActionEntry
            entry={{label: 'ID', entryType: 'Integer', entryTypeEnum: 1}}
            value={this.state.entryValue}
            useCamera={true} 
            onChange={this.onChange}/>
        </View>
      </View>
    )
  }
}
