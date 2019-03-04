import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import i18n from 'i18n-js';
import NexaColours from '../constants/NexaColours';
import PropList from '../components/PropList';
import PropItem from '../components/PropItem';
import GetBatchStartErrors from '../constants/StartErrors';

export default class BatchPropsScreen extends React.Component {
  static navigationOptions = () => ({
    title: i18n.t('screens.batchDetail.properties'),
  })

static propTypes = {
  navigation: PropTypes.shape({
    navigation: PropTypes.object,
  }).isRequired,
}

  headers = [
    { display: i18n.t('properties.header.id'), source: 'batchID' },
    { display: i18n.t('properties.header.code'), source: 'code' },
    { display: i18n.t('properties.header.productCode'), source: 'productCode' },
    { display: i18n.t('properties.header.productName'), source: 'productName' },
    { display: i18n.t('properties.header.productionDate'), source: 'productionDate' },
    { display: i18n.t('properties.header.quantity'), source: 'quantity' },
    { display: i18n.t('properties.header.status'), source: 'state' },
  ]

  render() {
    const { navigation } = this.props;
    const bat = navigation.getParam('batch');
    const errors = GetBatchStartErrors(bat.startErrors);
    return (
      <View>
        <PropList headers={this.headers} data={bat} />
        <PropItem caption={i18n.t('properties.header.startErrors')} value={errors} brighten color={NexaColours.AlertRed} />
      </View>
    );
  }
}
