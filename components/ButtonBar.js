import React, {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import PropTypes from 'prop-types'

export default class ButtonBar extends PureComponent {

  static propTypes ={
    justify: PropTypes.oneOf([
      'center',
      'flex-start',
      'flex-end',
      'space-between',
      'space-around',
      'space-evenly'
    ]).isRequired,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    style: PropTypes.any
  }

  render() {
    const defStyle = {flexDirection: 'row', justifyContent: this.props.justify, alignItems: 'baseline'}
    const style = StyleSheet.flatten([defStyle, this.props.style])
    return (
      <View style={style}>
        {this.props.children}
      </View>
    )
  }
}
