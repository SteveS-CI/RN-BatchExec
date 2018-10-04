import React, {PureComponent} from 'react'
import {ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import FieldHeader from './FieldHeader';
import FieldValue from './FieldValue';
import NexaColours from '../constants/NexaColours';

class PropList extends PureComponent {

  render() {
    const headers = this.props.headers
    const data = this.props.data
    const cols = headers.map((head, idx) => {
      const backCol = (idx % 2 == 0) ? NexaColours.GreyUltraLight : NexaColours.GreyLight
      return (
        <View key={idx} style={{backgroundColor: backCol, flexDirection: 'row'}}>
          <FieldHeader>{head.display}</FieldHeader>
          <FieldValue>{data[head.source]}</FieldValue>
        </View>
      )
    })
    return (
      <ScrollView style={{flexDirection: 'column'}}>
        {cols}
      </ScrollView>
    )
  }
}

PropList.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.shape(
    {
      display: PropTypes.string.isRequired,
      source: PropTypes.string.isRequired
    })).isRequired,
  data: PropTypes.any.isRequired
}

export default PropList

