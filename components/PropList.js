import React, {PureComponent} from 'react'
import {StyleSheet, ScrollView, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import NexaColours from '../constants/NexaColours';
import PropItem from '../components/PropItem'

const styles = StyleSheet.create({
  scroll: {
    flexDirection: 'column'
  }
})

export default class PropList extends PureComponent {

  static propTypes = {
    headers: PropTypes.arrayOf(PropTypes.shape(
      {
        display: PropTypes.string.isRequired,
        source: PropTypes.string.isRequired
      })).isRequired,
    data: PropTypes.any.isRequired
  }
  
  render() {
    const headers = this.props.headers
    const data = this.props.data
    const cols = headers.map((head, idx) => {
      const brighten = (idx % 2 == 0)
      return (
        <PropItem key={idx}
          caption={head.display}
          value={data[head.source]}
          brighten={brighten}
        />
      )
    })
    return (
      <ScrollView style={styles.scroll}>
        {cols}
      </ScrollView>
    )
  }
}
