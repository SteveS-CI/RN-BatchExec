import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { ComponentProps } from './SmallDisplayProps';

export default class IdentWeighingProps extends PureComponent {
  styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
  })

  static propTypes = {
    node: PropTypes.object,
  }

  render() {
    const { node } = this.props;
    const hasData = (node && node.actionType === 'IdentifyWeighing');
    if (hasData) {
      const comp = ComponentProps(node.component);
      return (
        <View style={this.styles.container}>
          {comp}
        </View>
      );
    }
    return null;
  }
}
