import React from 'react';
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

export default class TextBar extends React.Component {
  static defaultProps = {
    backColor: NexaColours.AlertCyan,
    style: {},
  }

  static propTypes = {
    backColor: PropTypes.oneOf(Object.values(NexaColours)).isRequired,
    style: PropTypes.any,
  }

  render() {
    const bc = this.props.backColor;
    const fc = optimalForeColor(bc);
    const style = StyleSheet.flatten([styles.base, { backgroundColor: bc, color: fc }, this.props.style]);
    return (
      <Text style={style}>
        {this.props.children}
      </Text>
    );
  }
}
