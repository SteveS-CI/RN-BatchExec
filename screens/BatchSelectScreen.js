import React from 'react';
import { StyleSheet, View, Button, ScrollView, TouchableOpacity, Text } from 'react-native';
import mockedBatchList from '../Mocked/batchlist.json'
import BatchItem from '../components/BatchItem';
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
      title: 'Batch Selection',
      headerRight: <Button title='Next' onPress={() => navigation.navigate('BatchProps')} />
    };
  }

  componentDidMount() {
    const mocked = false
    if (mocked) {
      this.setState({batchList: mockedBatchList})
    } else {
      Settings.getSetting(Settings.keys.locationCode).then((locationCode) => {this.getBatchList(locationCode)})
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
    this.item = item
    this.setState({selectedItem: id})
  }

  buttClicked = () => {
    if (this.item) {
      this.props.navigation.navigate('BatchDetail', {batchID: this.item.batchID})
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
        <View>
          <Button title='Select' onPress={this.buttClicked}/>
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

