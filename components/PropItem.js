import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import NexaColours from '../constants/NexaColours';
import { FontSizes } from '../constants/Layout';

const HairWidth = StyleSheet.hairlineWidth * 2;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginBottom: HairWidth,
    borderBottomWidth: HairWidth,
    borderColor: NexaColours.GreyDark,
  },
  caption: {
    textAlign: 'right',
    paddingVertical: 8,
    paddingRight: 8,
    flex: 2,
    fontSize: FontSizes.smaller,
    color: NexaColours.Blue,
    textAlignVertical: 'center',
    borderRightWidth: HairWidth,
    borderColor: NexaColours.GreyDark,
  },
  value: {
    paddingVertical: 8,
    paddingLeft: 8,
    flex: 5,
    textAlignVertical: 'center',
    fontSize: FontSizes.smaller,
  },
});

export default class PropItem extends PureComponent {
  static defaultProps = {
    brighten: false,
    color: NexaColours.GreyDark,
  }

  static propTypes = {
    caption: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    brighten: PropTypes.bool,
    color: PropTypes.string,
  }

  render() {
    const backColor = this.props.brighten ? NexaColours.GreyUltraLight : NexaColours.GreyLight;
    const itemStyle = StyleSheet.flatten([styles.item, { backgroundColor: backColor }]);
    const valueStyle = StyleSheet.flatten([styles.value, { color: this.props.color }]);
    return (
      <View style={itemStyle}>
        <Text style={styles.caption}>{this.props.caption}</Text>
        <Text style={valueStyle}>{this.props.value}</Text>
      </View>
    );
  }
}
