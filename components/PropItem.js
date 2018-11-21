import React, {PureComponent} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
import NexaColours from '../constants/NexaColours';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8
  },
  caption: {
    textAlign: 'right',
    marginRight: 8,
    flexBasis: '25%',
    fontSize: 16,
    color: NexaColours.Blue,
    textAlignVertical: 'center'
  },
  value: {
    textAlignVertical: 'center'
  }
})

export default class PropItem extends PureComponent {

  static defaultProps = {
    brighten: false,
    color: NexaColours.GreyDark
  }

  static propTypes = {
    caption: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    brighten: PropTypes.bool,
    color: PropTypes.string
  }

  render() {
    const backColor = this.props.brighten ? NexaColours.GreyUltraLight : NexaColours.GreyLight
    const itemStyle = StyleSheet.flatten([styles.item, {backgroundColor: backColor}])
    const valueStyle = StyleSheet.flatten([styles.value, {color: this.props.color}])
    return (
      <View style={itemStyle}>
        <Text style={styles.caption}>{this.props.caption}</Text>
        <Text style={valueStyle}>{this.props.value}</Text>
      </View>
    )
  }
}