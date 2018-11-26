import React, { Component } from 'react';
import { View } from 'react-native';
import i18n from 'i18n-js'
import mockedLocations from '../Mocked/locations.json'
import Settings from '../Store/Settings'
import ScreenHeader from '../components/ScreenHeader'
import ScrollList from '../components/ScrollList'
import {methods} from '../api/api'

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
      status: i18n.t('enums.Availability.' + data.availability) + '\n'
        + i18n.t('enums.CleanStatus.' + data.cleanStatus) + '\n'
        + i18n.t('enums.Condition.' + data.condition)
    }
    return newData
  }

  headers = [
    {
      caption: i18n.t('locations.header.name'),
      source: "name",
      flex: 2
    },
    {
      caption: i18n.t('locations.header.code'),
      source: 'code',
      flex: 1
    },
    {
      caption: i18n.t('locations.header.status'),
      source: 'status',
      flex: 3
    }
  ]

  render() {
    const locData = this.state.locations
    return (
      <View style={{ flex: 1 }}>
        <ScreenHeader
          title={i18n.t('screens.locations.title')}
          okCaption={i18n.t('button.captions.select')}
          onOK={this.selectClicked}
          onCancel={() => { this.props.navigation.navigate('BatchList') }}
          okDisabled={this.state.selectedItemID == 0}
        />
        <ScrollList
          headers={this.headers}
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
