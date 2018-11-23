import React, {Component} from 'react';
import ScrollList from '../components/ScrollList';
import i18n from 'i18n-js'

const headers = [
  {
    caption: "Category",
    source: "category",
    flex: 4
  },
  {
    caption: "Model",
    source: "model",
    flex: 3
  },
  {
    caption: "Serial No",
    source: "serialNumber",
    flex: 3
  },
  {
    caption: "Status",
    source: "status",
    flex: 4
  }
]

export default class BatchCompsScreen extends Component {
  static navigationOptions = () => {
    return {
      title: i18n.t('screens.batchDetail.equipment')
    }
  };

  transform = (data) => {
    const newData = {
      ...data,
      status: data.availability + ', ' + data.cleanStatus + ', ' + data.condition
    }
    return newData
  }

  render() {
    const nav = this.props.navigation
    const bat = nav.getParam('batch')
    const equipData = bat.equipment
    return (
      <ScrollList 
        headers={headers}
        data={equipData}
        transform={this.transform}
      />
    )
  }

}
