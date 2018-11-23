import React from 'react';
import { View, Text, Button } from 'react-native'
import NexaColours from '../constants/NexaColours'
import PropList from '../components/PropList';
import PropItem from '../components/PropItem'
import {GetBatchStartErrors} from '../constants/StartErrors';
import i18n from 'i18n-js'

export default class BatchPropsScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: i18n.t('screens.batchDetail.properties')
    }
  }

  headers = [
    { display: i18n.t('properties.batch.id'), source: 'batchID' },
    { display: i18n.t('properties.batch.code'), source: 'code' },
    { display: i18n.t('properties.batch.productCode'), source: 'productCode' },
    { display: i18n.t('properties.batch.productName'), source: 'productName' },
    { display: i18n.t('properties.batch.productionDate'), source: 'productionDate' },
    { display: i18n.t('properties.batch.quantity'), source: 'quantity' },
    { display: i18n.t('properties.batch.status'), source: 'state' },
  ]

  render() {
    const nav = this.props.navigation
    const bat = nav.getParam('batch')
    const errors = GetBatchStartErrors(bat.startErrors)
    return (
      <View>
        <PropList headers={this.headers} data={bat} />
        <PropItem caption={i18n.t('properties.batch.startErrors')} value={errors} brighten={true} color={NexaColours.AlertRed}/>
      </View>
    )
  }

}
