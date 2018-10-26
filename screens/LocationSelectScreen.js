import React, { Component } from 'react';
import { StyleSheet, View, Button, ScrollView, Text, RefreshControl } from 'react-native';
import mockedLocations from '../Mocked/locations.json'
import LocationItem from '../components/LocationItem';
import NexaColours, {tableRowEven, tableRowOdd, tableRowSelected} from '../constants/NexaColours';
import {getLocations} from '../api/api';
import endpoints from '../api/endpoints';
import Settings from '../Store/Settings'
import RoundedButton from '../components/RoundedButton'
import store from '../Store/store'

export default class LocationSelectScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {locations: null, selectedItem: 0, loading: false}
  }

  static navigationOptions = {title: 'Select Location'}

  componentDidMount() {
    const mocked = store.getMocked()
    if (mocked) {
      this.setState({locations: mockedLocations})
    } else {
      this.fetch()
    }
  }

  fetch = () => {
    this.setState({loading: true})
    getLocations().then((response) => {
      this.setState({locations: response.data, loading: false})
    })
  }

  rowClicked = (item) => {
    const id = item.id
    this.item = item
    this.setState({selectedItem: id})
  }

  selectClicked = () => {
    if (this.item) {
      const location = {code: this.item.code, name: this.item.name} 
      Settings.saveObject('location', location)
      .then(() => {
        this.props.screenProps.refresh()
        //this.props.navigation.navigate('BatchList'), {locationCode: this.item.code}})
      })
    }
  }

  onRefresh = () => {
    this.fetch()
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
            onPress={this.selectClicked}
            disabled={this.state.selectedItem==0}
          />
        </View>
        <View style={{flex: 1}}>
          <ScrollView refreshControl={<RefreshControl refreshing={this.state.loading} onRefresh={this.onRefresh}/>}
          >
            {locList}
          </ScrollView>
        </View>      
      </View>
    )
  }
}
