import React from 'react';
import { View, Text, Button } from 'react-native'
import NexaColours from '../constants/NexaColours'
import PropList from '../components/PropList';
import PropItem from '../components/PropItem'
import {GetBatchStartErrors} from '../constants/StartErrors';

export default class BatchPropsScreen extends React.Component {
  static navigationOptions = {
    title: 'Properties'
  };

  headers = [
    { display: 'Batch ID', source: 'batchID' },
    { display: 'Batch Code', source: 'code' },
    { display: 'Product Code', source: 'productCode' },
    { display: 'Product Name', source: 'productName' },
    { display: 'Quantity', source: 'quantity' },
    { display: 'Status', source: 'state' },
  ]

  render() {
    const nav = this.props.navigation
    const bat = nav.getParam('batch')
    const errors = GetBatchStartErrors(bat.startErrors)
    return (
      <View>
        <PropList headers={this.headers} data={bat} />
        <PropItem caption='Start Errors' value={errors} brighten={true} color={NexaColours.AlertRed}/>
      </View>
    )
  }

}
