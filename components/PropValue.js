import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

export default class PropValue extends PureComponent {
  static defaultProps = {
    children: {},
  }

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props;
    return (
      <Text style={{ color: 'black', paddingLeft: 10, fontFamily: 'euro-std' }}>
        {children}
      </Text>
    );
  }
}
