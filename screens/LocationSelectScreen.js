import React, { Component } from 'react';
import { StyleSheet, View, Button, ScrollView, Text } from 'react-native';
import mockedLocations from '../Mocked/locations.json'
import LocationItem from '../components/LocationItem';
import NexaColours from '../constants/NexaColours';
import api from '../api/api';
import endpoints from '../api/endpoints';
import Settings from '../Store/Settings'
import RoundedButton from '../components/RoundedButton'
import store from '../Store/store'

const tableRowOdd = { backgroundColor: NexaColours.GreyUltraLight }
const tableRowEven=  { backgroundColor: NexaColours.GreyLight }
const tableRowSelected = {backgroundColor: NexaColours.Orange}

export default class LocationSelectScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {locations: null, selectedItem: 0}
  }

  static navigationOptions = {
    title: 'Select Location'
  }

  componentDidMount() {
    const mocked = store.getMocked()
    if (mocked) {
      this.setState({locations: mockedLocations})
    } else {
      api.request(
        {...endpoints.locations}
      ).then((response) => {
        this.setState({locations: response.data})
      })
    }
  }

  rowClicked = (item) => {
    const id = item.id
    this.item = item
    this.setState({selectedItem: id})
  }

  buttClicked = () => {
    if (this.item) {
      const location = {code: this.item.code, name: this.item.name} 
      Settings.saveObject('location', location)
      .then(() => {
        this.props.navigation.navigate('BatchList'), {locationCode: this.item.code}}
      )
    }
  }

  render() {
    const locData = this.state.locations
    let locList = null
    if (locData) {
      locList = locData.map((location, index) => {
        const rowStyle = (index & 1) ? tableRowOdd : tableRowEven
        const selected = (location.id===this.state.selectedItem)
        const style = selected ? tableRowSelected : rowStyle
        return (<LocationItem
          key={index}
          item={location}
          rowClicked={this.rowClicked}
          selected={selected}
          rowStyle={style}
        />)
      })
    }
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <RoundedButton 
            backColor={NexaColours.AlertYellow} 
            title='Cancel' 
            onPress={() => {this.props.navigation.navigate('BatchList')}}
          />
          <RoundedButton
            backColor={NexaColours.AlertGreen} 
            title='Select' 
            onPress={this.buttClicked}
            disabled={this.state.selectedItem==0}
          />
        </View>
        <View style={{flex: 1}}>
          <ScrollView>
            {locList}
          </ScrollView>
        </View>      
      </View>
    )
  }
}
