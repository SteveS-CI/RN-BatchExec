import React, { Component } from 'react';
import {
  NativeModules,
  StyleSheet,
  View,
} from 'react-native';
import RoundedButton from '../components/RoundedButton';

import MyCustomKeyboard from '../components/CustomKeyboard';

export default class TestScreen6 extends Component {
  constructor(props) {
    super(props);
    state = {
      value: '',
    };
  }

  onChangeText = (text) => {
    this.setState({ value: text });
  }

  render() {
    const install = NativeModules.insertText;
    console.log(JSON.stringify(install));
    return (
      <View style={styles.container}>
        <RoundedButton title="Cancel" onPress={() => this.props.navigation.navigate('Dev')} />
        <MyCustomKeyboard />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'grey',
    width: 270,
    fontSize: 19,
  },
});
