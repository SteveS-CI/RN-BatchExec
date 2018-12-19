import React, {PureComponent} from 'react'
import {StyleSheet, Switch, View, Text} from 'react-native';
import PropTypes from 'prop-types'
import NexaColours from '../constants/NexaColours'
import {FontSizes} from '../constants/Layout'

const FontSize = FontSizes.smaller

export default class SwitchSetting extends PureComponent {
  render() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', borderWidth: StyleSheet.hairlineWidth, padding: 8}}>
        <View style={{flexDirection: 'column'}}>
          <Text style={{fontSize: FontSize}}>{this.props.title}</Text>
          <Text style={{color: NexaColours.Grey, fontSize: FontSize}}>{this.props.subTitle}</Text>
        </View>
        <Switch value={this.props.value} onValueChange={this.props.onValueChange}></Switch>
      </View>
    )
  }
}

SwitchSetting.propTypes = {
  value: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  onValueChange: PropTypes.func.isRequired
}