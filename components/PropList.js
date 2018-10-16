import React, {PureComponent} from 'react'
import {StyleSheet, ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import PropHeader from './PropHeader';
import PropValue from './PropValue';
import NexaColours from '../constants/NexaColours';

class PropList extends PureComponent {

  render() {
    const headers = this.props.headers
    const data = this.props.data
    const cols = headers.map((head, idx) => {
      const backCol = (idx % 2 == 0) ? NexaColours.GreyUltraLight : NexaColours.GreyLight
      return (
        <View key={idx} style={{backgroundColor: backCol, flexDirection: 'column', borderTopWidth: StyleSheet.hairlineWidth, paddingVertical: 12}}>
          <PropHeader>{head.display}</PropHeader>
          <PropValue>{data[head.source]}</PropValue>
        </View>
      )
    })
    return (
      <ScrollView style={{flexDirection: 'column', borderBottomWidth: StyleSheet.hairlineWidth}}>
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

