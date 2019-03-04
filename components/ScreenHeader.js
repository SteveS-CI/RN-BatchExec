import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import NexaColours from '../constants/NexaColours';
import RoundedButton from './RoundedButton';
import IconButton from './IconButton';
import { FontSizes } from '../constants/Layout';

const styles = StyleSheet.create(
  {
    base: {
      color: NexaColours.Blue,
      fontSize: FontSizes.standard,
      padding: 8,
      marginTop: 8,
      marginBottom: 0,
      textAlign: 'center',
    },
  },
);

export default class ScreenHeader extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    title: null,
    showOK: true,
    onOK: this.nullFunction,
    onCancel: this.nullFunction,
    okDisabled: false,
  }

  static propTypes = {
    title: PropTypes.string,
    okCaption: PropTypes.string,
    onOK: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
    okDisabled: PropTypes.bool,
  }

  nullFunction = () => { }

  render() {
    const right = this.props.okCaption
      ? (
        <RoundedButton
          backColor={NexaColours.AlertGreen}
          title={this.props.okCaption}
          onPress={this.props.onOK}
          disabled={this.props.okDisabled}
        />
      )
      : <Text style={{ width: 80 }} />;
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: NexaColours.GreyLight }}>
        <RoundedButton
          backColor={NexaColours.GreyUltraLight}
          title={i18n.t('button.captions.cancel')}
          onPress={this.props.onCancel}
        />
        <Text style={styles.base}>
          {this.props.title}
        </Text>
        {right}
      </View>
    );
  }
}
