import React from 'react';
import ScrollList from '../components/ScrollList'
import i18n from 'i18n-js'

const headers = [
  {
    caption: "Line",
    source: "lineNumber",
    flex: 1
  },
  {
    caption: "Type",
    source: "componentType",
    flex: 2
  },
  {
    caption: "Material",
    source: "material",
    flex: 4
  },
  {
    caption: "Quantity",
    source: "quantity",
    flex: 2
  },
  {
    caption: "Status",
    source: "state",
    flex: 2
  }
]

export default class BatchCompsScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: i18n.t('screens.batchDetail.components')
    }
  }

  transform = (data) => {
    const newData = {
      ...data,
      material: data.materialCode + '\n' + data.materialName,
      state: data.status //transform from Enum name to text
    }
    return newData
  }

  render() {
    const nav = this.props.navigation
    const bat = nav.getParam('batch')
    const compData = bat.components
    return (
      <ScrollList 
        headers={headers}
        data={compData}
        transform={this.transform}
      />
    )
  }

}
