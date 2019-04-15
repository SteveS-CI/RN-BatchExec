import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import ScrollList from '../components/ScrollList';

const headers = [
  {
    caption: 'Category',
    source: 'category',
    flex: 4,
  },
  {
    caption: 'Model',
    source: 'model',
    flex: 3,
  },
  {
    caption: 'Serial No',
    source: 'serialNumber',
    flex: 3,
  },
  {
    caption: 'Status',
    source: 'status',
    flex: 4,
  },
];

export default class BatchCompsScreen extends Component {

  static propTypes = {
    navigation: PropTypes.shape({ state: PropTypes.object }).isRequired
  }

  static navigationOptions = () => ({
    title: i18n.t('screens.batchDetail.equipment'),
  });

  transform = (data) => {
    let state = `${i18n.t(`enums.CleanStatus.${data.cleanStatus}`)}\n${
      i18n.t(`enums.Availability.${data.availability}`)}`;
    if (data.unavailableReason) {
      state = state.concat(`\n${data.unavailableReason}`);
    }
    const status = data.serialNumber ? state : 'Not yet identified';
    const newData = {
      ...data,
      status
    };
    return newData;
  }

  render() {
    const { navigation } = this.props;
    const bat = navigation.getParam('batch');
    const equipData = bat.equipment;
    return (
      <ScrollList
        headers={headers}
        data={equipData}
        transform={this.transform}
      />
    );
  }
}
