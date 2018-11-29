import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, TextInput, Picker } from 'react-native'
import PropTypes from 'prop-types'
import * as DataProps from '../constants/DataProps'
import TextBar from './TextBar'
import NexaColours from '../constants/NexaColours'
import { optimalForeColor } from '../Utils/utils'

import MeasureText from 'react-native-measure-text'

const styles = StyleSheet.create(
  {
    container: {
      flexDirection: 'column',
      marginTop: -12,
    },
    overlay: {
      position: 'relative', zIndex: 1,
      top: 20, left: 16,
      alignSelf: 'flex-start',
    },
    titleText: {
      paddingHorizontal: 8, paddingVertical: 3,
      fontSize: 16, fontWeight: 'bold',
      borderRadius: 8, borderColor: NexaColours.GreyDark, borderWidth: StyleSheet.hairlineWidth * 2
    },
    inner: {
      flexDirection: 'column',
      margin: 8,
      padding: 8, paddingTop: 12,
      borderWidth: StyleSheet.hairlineWidth * 2,
      borderRadius: 12, borderTopLeftRadius: 0,
      borderColor: NexaColours.GreyDarkest,
      alignSelf: 'flex-start'
    }
  }
)

export default class SmallPropWindow extends PureComponent {

  static defaultProps = {
    title: 'Title',
    baseBackColor: 'Green'
  }

  static propTypes = {
    title: PropTypes.string,
    headers: PropTypes.arrayOf(DataProps.HeaderProps),
    data: PropTypes.any,
    baseBackColor: PropTypes.string
  }

  captionWidth(headers) {
    // maximum caption length
    var w = 0
    for (var x = 0; x < headers.length; x++) {
      w = Math.max(w, headers[x].caption.length)
    }
    return w * 9
  }

  valueWidth(headers, data) {
    // maximum value width
    var w = 0
    for (var x = 0; x < headers.length; x++) {
      const src = data[headers[x].source]
      if (src) { w = Math.max(w, data[headers[x].source].length) }
    }
    return w * 9
  }

  makeRows = (foreColor) => {
    const headers = this.props.headers
    const data = this.props.data
    const capWidth = this.captionWidth(headers)
    const valWidth = this.valueWidth(headers, data)
    const textLeftStyle = { width: capWidth, textAlign: 'right', paddingRight: 5, fontWeight: 'bold', color: foreColor }
    const textRightStyle = { width: valWidth, textAlign: 'left', color: foreColor }
    const rowData = headers.map((header, index) => {
      return (
        <View key={index} style={{ flexDirection: 'row' }}>
          <Text style={textLeftStyle}>{header.caption}:</Text>
          <Text style={textRightStyle}>{data[header.source]}</Text>
        </View>
      )
    })
    return rowData
  }

  render() {
    const hasData = this.props.data ? true : false
    if (hasData) {
      const titleBackColor = NexaColours[this.props.baseBackColor]
      const titleForeColor = optimalForeColor(titleBackColor)
      const propsBackColor = NexaColours[this.props.baseBackColor + 'Accent']
      const propsForeColor = optimalForeColor(propsBackColor)
      const rowData = this.makeRows(propsForeColor)
      const titleStyle = StyleSheet.flatten([styles.titleText, { backgroundColor: titleBackColor, color: titleForeColor }])
      const innerStyle = StyleSheet.flatten([styles.inner, { backgroundColor: propsBackColor }])
      return (
        <View style={styles.container}>
          <View style={styles.overlay}>
            <Text style={titleStyle}>{this.props.title}</Text>
          </View>
          <View style={innerStyle}>
            {rowData}
          </View>
        </View>
      )
    } else {
      return null
    }
  }
}