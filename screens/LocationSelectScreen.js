import React, { Component } from 'react';
import { View } from 'react-native';
import mockedLocations from '../Mocked/locations.json'
import Settings from '../Store/Settings'
import ScreenHeader from '../components/ScreenHeader'
import ScrollList from '../components/ScrollList'
import {methods} from '../api/api'

const headers = [
  {
    caption: "Name",
    source: "name",
    flex: 2
  },
  {
    caption: "Code",
    source: "code",
    flex: 1
  },
  {
    caption: "Status",
    source: "status",
    flex: 3
  }
]

export default class LocationSelectScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: null,
      selectedIndex: -1,
      selectedItemID: 0,
      loading: false
    }
    this.mocked = this.props.screenProps.mocked
  }

  componentDidMount() {
    if (this.mocked) {
      this.setState({ locations: mockedLocations })
    } else {
      this.fetch()
    }
  }

  fetch = () => {
    this.setState({ loading: true })
    methods.getLocations().then(data => {
      this.setState({ locations: data, loading: false })
    })
  }

  rowClicked = (index, item) => {
    const id = item.id
    this.item = item
    this.setState({ selectedItemID: id, selectedIndex: index })
  }

  selectClicked = () => {
    if (this.item) {
      const location = { code: this.item.code, name: this.item.name }
      Settings.saveObject('location', location)
        .then(() => {
          this.props.screenProps.refresh()
        })
    }
  }

  transform = (data) => {
    const newData = {
      ...data,
      status: data.availability + ', ' + data.cleanStatus + ', ' + data.condition
    }
    return newData
  }

  render() {
    const locData = this.state.locations
    return (
      <View style={{ flex: 1 }}>
        <ScreenHeader
          title='Select a Location'
          okCaption='Select'
          onOK={this.selectClicked}
          onCancel={() => { this.props.navigation.navigate('BatchList') }}
          okDisabled={this.state.selectedItemID == 0}
        />
        <ScrollList
          headers={headers}
          data={locData}
          selectedIndex={this.state.selectedIndex}
          onPress={this.rowClicked}
          noData='No Locations available'
          loading={this.state.loading}
          onRefresh={this.fetch}
          topMargin={false}
          transform={this.transform}
        />
      </View>
    )
  }
}
