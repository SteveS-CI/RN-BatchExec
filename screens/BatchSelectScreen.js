import React from 'react';
import { StyleSheet, View, Button, ScrollView, TouchableOpacity, Text } from 'react-native';
import mockedBatchList from '../Mocked/batchlist.json'
import BatchItem from '../components/BatchItem';
import RoundedButton from '../components/RoundedButton'
import NexaColours from '../constants/NexaColours';
import api from '../api/api'
import endpoints from '../api/endpoints'
import Settings from '../Store/Settings'

const tableRowOdd = { backgroundColor: NexaColours.GreyUltraLight }
const tableRowEven=  { backgroundColor: NexaColours.GreyLight }
const tableRowSelected = {backgroundColor: NexaColours.Orange}

export default class BatchSelectScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {batchList: null, selectedItem: 0}
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Batch Selection'
    };
  }

  componentDidMount() {
    const mocked = false
    if (mocked) {
      this.setState({batchList: mockedBatchList})
    } else {
      Settings.readObject('location').then((location) => {
        this.locationCode = location.code
        this.getBatchList(location.code)
      })
    }
  }

  getBatchList(locationCode) {
    const request = {...endpoints.batchlist, params: {locationCode}}
    api.request(
      request
    ).then((response) => {
      this.setState({batchList: response.data})
    }).catch((error) => {
    })
  }

  rowClicked = (item) => {
    const id = item.batchID
    this.batch = item
    this.setState({selectedItem: id})
  }

  buttClicked = () => {
    if (this.batch) {
      const request = {...endpoints.getBatch, params: {locationCode: this.locationCode, batchID: this.batch.batchID}}
      api.request(
        request
      ).then((response) => {
        // Navigate to the TabNavigator, not any of the screens (Props/Comps/Equip)
        // The parameter is passed to all screens of the TabNavigator
        // (all screens are rendered at once)
        this.props.navigation.navigate('BatchDetail', {batch: response.data})
      })
    }
  }

  render() {
    const batchData = this.state.batchList
    let batchList = null
    if (batchData) {
      batchList = batchData.map((batch, index) => {
        const rowStyle = (index & 1) ? tableRowOdd : tableRowEven
        const selected = (batch.batchID===this.state.selectedItem)
        const style = selected ? tableRowSelected : rowStyle
        return (<BatchItem
          key={index}
          item={batch}
          rowClicked={this.rowClicked}
          selected={selected}
          rowStyle={style}
        />)
      })
    }
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <RoundedButton disabled={this.state.selectedItem==0} title='Select' onPress={this.buttClicked}/>
        </View>
        <View style={{flex: 1}}>
          <ScrollView>
            {batchList}
          </ScrollView>
        </View>      
      </View>
    )
  }
}

