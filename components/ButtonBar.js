import React, { PureComponent } from 'react';
import { View } from 'react-native';
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
    ]).isRequired
  }

  render() {
    const { justify, children } = this.props;
    const defStyle = { flexDirection: 'row', justifyContent: justify, alignItems: 'baseline' };
    return (
      <View style={defStyle}>
        {children}
      </View>
    );
  }
}
