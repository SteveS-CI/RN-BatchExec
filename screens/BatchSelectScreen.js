import React from 'react';
import { StyleSheet, View, Button, ScrollView, TouchableOpacity, Text } from 'react-native';
import mockedBatchList from '../Mocked/batchlist.json'
import BatchItem from '../components/BatchItem';
import ButtonBar from '../components/ButtonBar'
import RoundedButton from '../components/RoundedButton'
import LoadingOverlay from '../components/LoadingOverlay'
import NexaColours from '../constants/NexaColours';
import api from '../api/api'
import endpoints from '../api/endpoints'
import Settings from '../Store/Settings'
import store from '../Store/store'
import mockBatch from '../Mocked/batch.json'

const tableRowOdd = { backgroundColor: NexaColours.GreyUltraLight }
const tableRowEven=  { backgroundColor: NexaColours.GreyLight }
const tableRowSelected = {backgroundColor: NexaColours.Orange}

export default class BatchSelectScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {batchList: null, selectedItem: 0, loading: false}
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Batch Selection'
    };
  }

  componentDidMount() {
    const mocked = store.getMocked()
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

  detailClicked = () => {
    if (this.batch) {
      const mocked = store.getMocked()
      if (mocked) {
        this.batch = mockBatch
        this.props.navigation.navigate('BatchDetail', {batch: this.batch, location: this.locationCode})
      } else {
        // set loading prior to request
        this.setState({loading: true})
        const request = {...endpoints.getBatch, params: {locationCode: this.locationCode, batchID: this.batch.batchID}}
        api.request(
          request
        ).then((response) => {
          this.setState({loading: false})
          this.batch = response.data
          // Navigate to the TabNavigator, not a specific screen (Props/Comps/Equip)
          // The parameter is passed to all screens of the TabNavigator
          // (all screens are rendered at once)
          this.props.navigation.navigate('BatchDetail', {batch: this.batch, location: this.locationCode})
        }).catch((error) => {
          this.setState({loading: false})
          console.log(JSON.stringify(error))
        })
      }
    }
  }

  continueClicked = () => {
    if (this.batch) {
      const nav = this.props.navigation
      const mocked = store.getMocked()
      if (mocked) {
        this.batch = mockBatch
        nav.navigate('ActionDetail', {batch: this.batch, location: this.locationCode})
      } else {
        // set loading prior to request
        this.setState({loading: true})
        const request = {...endpoints.nextProc, data: {batchID: this.batch.batchID, procID: 0, location: this.locationCode}}
        api.request(
          request
        ).then((response) => {
          this.setState({loading: false})
          const batchData = response.data
          // depending on data shape, navigate to the appropriate screen, passing batchData
          if (batchData.nodes.length > 1) {
            // Multiple nodes
            nav.navigate('NodeSelect', {batchData})
          } else {
            // Single nodes
            if (batchData.nodeDepth===3) {
              // Action node
              nav.navigate('ActionDetail', {batchData})    
            } else {
              // Operation/Stage/Process - for Confirmation/Signature/Approval
              nav.navigate('NodeDetail', {batchData})
            }
          }
        }).catch((error) => {
          this.setState({loading: false})
          console.log(JSON.stringify(error))
        })
      }
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
    } else {
      batchlist = <Text>LOADING</Text>
    }
    return (
      <View style={{flex: 1}}>
        <ButtonBar justify='flex-end'>
          <RoundedButton disabled={this.state.selectedItem==0} title='Details' onPress={this.detailClicked}/>
          <RoundedButton disabled={this.state.selectedItem==0} title='Continue' onPress={this.continueClicked}/>
        </ButtonBar>
        <View style={{flex: 1}}>
          <ScrollView>
            {batchList}
          </ScrollView>
        </View>
        <LoadingOverlay loading={this.state.loading} />      
      </View>
    )
  }
}

