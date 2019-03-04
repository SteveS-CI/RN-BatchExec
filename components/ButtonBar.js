import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

export default class ButtonBar extends PureComponent {
  static propTypes ={
    justify: PropTypes.oneOf([
      'center',
      'flex-start',
      'flex-end',
      'space-between',
      'space-around',
      'space-evenly',
    ]).isRequired,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]).isRequired,
    style: PropTypes.object,
  }

  static defaultProps = {
    style: {},
  }

  render() {
    const { justify, style, children } = this.props;
    const defStyle = { flexDirection: 'row', justifyContent: justify, alignItems: 'baseline' };
    const viewStyle = StyleSheet.flatten([defStyle, style]);
    return (
      <View style={viewStyle}>
        {children}
      </View>
    );
  }
}
