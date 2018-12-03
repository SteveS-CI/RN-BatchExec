import React,  {PureComponent} from 'react'
import PropTypes from 'prop-types'
import * as DataProps from '../constants/DataProps'
import SmallPropWindow from './SmallPropWindow'
import NexaColours from '../constants/NexaColours'

export default class WeighInfo extends PureComponent{

  static propTypes = {
    weighData: DataProps.WeighingProps
  }

  weighHeaders = [
    {caption: 'Line', source: 'lineNumber'},
    {caption: 'Material Code', source: 'materialCode'},
    {caption: 'Material Name', source: 'materialName'},
    {caption: 'Weigh ID', source: 'id'},
    {caption: 'Quantity', source: 'netWeight'}
  ]

  render() {
    const hasData = this.props.weighData ? true : false
    if (hasData) {
      const comp = this.props.weighData.component
      const data = {...this.props.weighData, lineNumber: comp.lineNumber, materialCode: comp.materialCode, materialName: comp.materialName}
      return (
        <SmallPropWindow
          title='Weigh Data'
          headers={this.weighHeaders}
          data={data}
          baseBackColor='Orange'
        />
      )
    } else {
      return null
    } 
  }
}