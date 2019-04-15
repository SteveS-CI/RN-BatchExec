import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import i18n from 'i18n-js';
import Settings from '../Store/Settings';
import ScreenHeader from '../components/ScreenHeader';
import ScrollList from '../components/ScrollList';
import { methods } from '../api/api';

export default class LocationSelectScreen extends Component {

  static propTypes = {
    screenProps: PropTypes.shape({
      update: PropTypes.func,
      refresh: PropTypes.func
    }).isRequired,
    navigation: PropTypes.shape({ state: PropTypes.object }).isRequired
  }

  static navigationOptions = () => ({
    title: i18n.t('screens.locations.title'),
  })

  headers = [
    {
      caption: i18n.t('locations.header.name'),
      source: 'name',
      flex: 2,
    },
    {
      caption: i18n.t('locations.header.code'),
      source: 'code',
      flex: 1,
    },
    {
      caption: i18n.t('locations.header.status'),
      source: 'status',
      flex: 3,
    },
  ]

  constructor(props) {
    super(props);
    this.state = {
      locations: null,
      selectedIndex: -1,
      selectedItemID: 0,
      loading: false,
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    this.setState({ loading: true });
    methods.getLocations().then((data) => {
      this.setState({ locations: data, loading: false });
    });
  }

  rowClicked = (index, item) => {
    const { id } = item;
    this.item = item;
    this.setState({ selectedItemID: id, selectedIndex: index });
  }

  selectClicked = () => {
    if (this.item) {
      const location = { code: this.item.code, name: this.item.name };
      Settings.saveObject('location', location)
        .then(() => {
          const { screenProps } = this.props;
          // this reloads the app
          screenProps.refresh();
        });
    }
  }

  transform = (data) => {
    let status = `${i18n.t(`enums.CleanStatus.${data.cleanStatus}`)}\n${
      i18n.t(`enums.Availability.${data.availability}`)}`;
    if (data.unavailableReason) {
      status = status.concat(`\n${data.unavailableReason}`);
    }
    const newData = {
      ...data,
      status
    };
    return newData;
  }

  render() {
    const { navigation } = this.props;
    const {
      locations, loading, selectedItemID, selectedIndex
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScreenHeader
          okCaption={i18n.t('button.captions.select')}
          onOK={this.selectClicked}
          onCancel={() => { navigation.navigate('BatchList'); }}
          okDisabled={selectedItemID === 0}
        />
        <ScrollList
          headers={this.headers}
          data={locations}
          selectedIndex={selectedIndex}
          onPress={this.rowClicked}
          noData="No Locations available"
          loading={loading}
          onRefresh={this.fetch}
          topMargin={false}
          transform={this.transform}
        />
      </View>
    );
  }
}
