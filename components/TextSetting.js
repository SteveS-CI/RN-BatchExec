import React, {PureComponent} from 'react'
import {StyleSheet, Switch, View, Text} from 'react-native';
import PropTypes from 'prop-types'
import NexaColours from '../constants/NexaColours'

export default class TextSetting extends PureComponent {
  constructor(props) {
    super(props)
    this.state={value: "", editing: false}
  }

  render() {
    return (
      <View style={{flexDirection: 'column'}}>
        <Text onPress={() => {this.setState({editing: true})}}>{this.props.title}</Text>
        <Text style={{color: NexaColours.Grey}}>
          {this.props.subTitle}
        </Text>
          {this.state.editing && <View>
          <Text>MODAL TEXT INPUT</Text>
        </View>}
      </View>
    )
  }
}

TextSetting.propTypes = {
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired
}