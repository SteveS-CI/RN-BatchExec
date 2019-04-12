import React, { PureComponent } from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import NexaColours from '../constants/NexaColours';
import { optimalForeColor } from '../Utils/utils';
import { FontSizes } from '../constants/Layout';

const styles = StyleSheet.create(
  {
    base: {
      fontSize: FontSizes.standard,
      padding: 8,
      marginHorizontal: 8,
      marginBottom: 8,
      borderRadius: 5,
      textAlign: 'center',
    },
  },
);

export default class TextBar extends PureComponent {

  static defaultProps = {
    backColor: NexaColours.AlertCyan,
    style: {},
  }

  static propTypes = {
    backColor: PropTypes.oneOf(Object.values(NexaColours)),
    style: PropTypes.object
  }

  render() {
    const { backColor, style, children } = this.props;
    const fc = optimalForeColor(backColor);
    const textStyle = StyleSheet.flatten([styles.base, { backgroundColor: backColor, color: fc }, style]);
    return (
      <Text style={textStyle}>
        {children}
      </Text>
    );
  }
}
