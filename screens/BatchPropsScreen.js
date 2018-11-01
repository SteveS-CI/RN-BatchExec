import React from 'react';
import { View, Text, Button } from 'react-native'
import NexaColours from '../constants/NexaColours'
import FieldHeader from '../components/FieldHeader'
import FieldValue from '../components/FieldValue'
import PropList from '../components/PropList';

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
    { display: 'Status', source: 'status' },
    { display: 'Start Errors', source: 'startErrors' }
  ]

  render() {
    const nav = this.props.navigation
    const bat = nav.getParam('batch')
    return (
      <PropList headers={this.headers} data={bat} />
    )
  }

}
