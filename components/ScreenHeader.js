import React, { Component } from 'react';
import { StyleSheet, View, Button, ScrollView, Text, RefreshControl } from 'react-native';
import mockedLocations from '../Mocked/locations.json'
import LocationItem from '../components/LocationItem';
import NexaColours, { tableRowEven, tableRowOdd, tableRowSelected } from '../constants/NexaColours';
import { getLocations } from '../api/api';
import endpoints from '../api/endpoints';
import Settings from '../Store/Settings'
import PropTypes from 'prop-types'
import ButtonBar from '../components/ButtonBar'
import TextBar from '../components/TextBar'
import RoundedButton from '../components/RoundedButton'
import {methods} from '../api/api'

const styles = StyleSheet.create(
  {
    base: {
      color: NexaColours.GreyUltraLight,
      fontFamily: 'euro-bold',
      fontSize: 20,
      padding: 8,
      marginTop: 8,
      marginBottom: 0,
      textAlign: 'center',
    }
  }
)

export default class ScreenHeader extends React.Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    showOK: true,
    onOK: this.nullFunction,
    onCancel: this.nullFunction,
    okDisabled: false
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    okCaption: PropTypes.string,
    onOK: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
    okDisabled: PropTypes.bool
  }

  nullFunction = () => {}

  render() {
    const right = this.props.okCaption
      ? <RoundedButton
        backColor={NexaColours.AlertGreen}
        title={this.props.okCaption}
        onPress={this.props.onOK}
        disabled={this.props.okDisabled}
        />
      : <Text style={{width: 80}} />
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: NexaColours.Blue }}>
        <RoundedButton
          backColor={NexaColours.AlertYellow}
          title='Cancel'
          onPress={this.props.onCancel}
        />
        <Text style={styles.base}>
          {this.props.title}
        </Text>
        {right}
      </View>
    )
  }
}
