import React, {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import PropTypes from 'prop-types'

export default class ButtonBar extends PureComponent {
  render() {
    return (
      <View style={{flexDirection: 'row', justifyContent: this.props.justify}}>
        {this.props.children}
      </View>
    )
  }
}

ButtonBar.propTypes = {
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
  ])
}