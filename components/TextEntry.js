import React, { PureComponent } from 'react';
import {
  StyleSheet, View, Text, TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import NexaColours from '../constants/NexaColours';
import { scale, FontSizes } from '../constants/Layout';

const styles = StyleSheet.create(
  {
    inputContainer: {
      flexDirection: 'row',
      marginHorizontal: scale(8),
      marginTop: scale(8),
      alignSelf: 'flex-start',
    },
    inputLabel: {
      paddingHorizontal: scale(8),
      paddingVertical: scale(5),
      textAlignVertical: 'center',
      textAlign: 'right',
      minWidth: '25%',
      fontSize: FontSizes.smaller,
    },
    inputBox: {
      fontSize: FontSizes.smaller,
      paddingHorizontal: scale(8),
      paddingVertical: scale(5),
      minWidth: '50%',
    },
  },
);

export default class TextEntry extends PureComponent {

  static defaultProps = {
    value: null,
    secure: false,
    enabled: true,
    autoFocus: false,
    blurOnSubmit: true,
    onSubmit: () => {},
  }

  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    secure: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    enabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    returnKeyType: PropTypes.string.isRequired,
    keyboardType: PropTypes.string.isRequired,
    blurOnSubmit: PropTypes.bool,
    onSubmit: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = { editing: false };
  }

  onChangeText = (value) => {
    const { onChange } = this.props;
    if (onChange) onChange(value);
  }

  focus() {
    this.ref.focus();
  }

  render() {
    const { editing } = this.state;
    const {
      label, value, blurOnSubmit, enabled, secure, autoFocus, returnKeyType, keyboardType, onSubmit
    } = this.props;
    const boxColor = editing ? NexaColours.GreyUltraLight : NexaColours.GreyLight;
    const boxStyle = StyleSheet.flatten([styles.inputBox, { backgroundColor: boxColor }]);
    return (
      <View style={styles.inputContainer}>
        {label && <Text style={styles.inputLabel}>{label}</Text>}
        <TextInput
          style={boxStyle}
          ref={(ref) => { this.ref = ref; }}
          value={value}
          onChangeText={this.onChangeText}
          blurOnSubmit={blurOnSubmit}
          onFocus={() => this.setState({ editing: true })}
          onBlur={() => this.setState({ editing: false })}
          underlineColorAndroid="transparent"
          editable={enabled}
          secureTextEntry={secure}
          autoFocus={autoFocus}
          returnKeyType={returnKeyType}
          keyboardType={keyboardType}
          onSubmitEditing={onSubmit}
        />
      </View>
    );
  }
}
