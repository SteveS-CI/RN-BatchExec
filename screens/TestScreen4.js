import React from 'react';
import {View, WebView } from 'react-native';
import Layout from '../constants/Layout'
import ButtonStyles from '../constants/ButtonStyles'
import ActionButtons from '../components/ActionButtons'

export default class TestScreen4 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entryValue: null
    }
  }

  static navigationOptions = {
    title: 'Test Screen 4'
  }

  onPress = (name) => {
    if (name === 'cancel') this.props.navigation.navigate('Dev')
  }

  render() {
    const buttons = [ButtonStyles.Previous, ButtonStyles.No, ButtonStyles.Yes]
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        <ActionButtons onPress={this.onPress} buttons={buttons}/>
        <WebView
          style={{ width: Layout.screen.width * 0.9, marginLeft: 20 }}
          source={{
          html: `
          <h3 style='color: red'>Use a WebView to display html files</h3>
          <p style='color: blue'>
            The <i style='color: green'>quick</i> brown <small style='color: magenta'>fox</small> jumps <em>over</em> the lazy dog.
          </p>
        `,
        }}
      />
   </View>
  )
  }
}
