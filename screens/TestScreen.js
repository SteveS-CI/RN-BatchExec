import React from 'react';
import {StyleSheet, ScrollView, Switch, View, Text, TextInput, TouchableHighlight, Button, Image } from 'react-native';
import RoundedButton from '../components/RoundedButton'
import NexaColours from '../constants/NexaColours';
import ButtonBar from '../components/ButtonBar'
import FileContent from '../components/FileContent'
import {getTextFile} from '../api/api'

export default class TestScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: ''}
  }

  static navigationOptions = {
    title: 'Test Screen'
  }
  
  componentDidMount() {
  }

  render() {
    
    return (
      <View>
        <ButtonBar justify='flex-start'>
          <RoundedButton title='Back' backColor={NexaColours.AlertYellow} onPress={() => this.props.navigation.navigate('BatchList')}/>
        </ButtonBar>
        <View style={{flexDirection: 'column'}}>
          <Image
            source={{uri: 'http://192.168.1.225:8080/api/File/Image?name=lid-open.gif&language=en'}}
            style={{width: 200, height: 200, resizeMode: Image.resizeMode.contain}}
          />
          <FileContent fileName='General05.txt' backColor={NexaColours.BlueAccent}/>
        </View>
      </View>
    )
  }
}
