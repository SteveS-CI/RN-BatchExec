import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import parseDecimalNumber from 'parse-decimal-number';
import * as DataProps from '../constants/DataProps';
import ErrorBar from './ErrorBar';
import NexaColours from '../constants/NexaColours';
import IconButton from './IconButton';
import BarcodeReader from './BarcodeReader';
import { FontSizes, scale } from '../constants/Layout';

const inputBorderWidth = StyleSheet.hairlineWidth;
const inputBorderRadius = scale(8);

const styles = StyleSheet.create(
  {
    inputContainer: {
      flexDirection: 'row',
      marginHorizontal: scale(8),
      marginTop: scale(8),
      padding: 0,
      alignSelf: 'flex-start',
    },
    inputLabel: {
      backgroundColor: NexaColours.GreyAccent,
      paddingHorizontal: scale(8),
      paddingVertical: scale(4),
      textAlignVertical: 'center',
      borderColor: NexaColours.GreyDark,
      borderWidth: inputBorderWidth,
      borderTopLeftRadius: inputBorderRadius,
      borderBottomLeftRadius: inputBorderRadius,
      fontSize: FontSizes.standard,
    },
    inputSuffix: {
      backgroundColor: NexaColours.GreyAccent,
      paddingHorizontal: scale(8),
      paddingVertical: scale(4),
      textAlignVertical: 'center',
      borderColor: NexaColours.GreyDark,
      borderWidth: inputBorderWidth,
      borderTopRightRadius: inputBorderRadius,
      borderBottomRightRadius: inputBorderRadius,
      fontSize: FontSizes.standard,
    },
    inputBox: {
      borderColor: NexaColours.GreyDark,
      borderBottomWidth: inputBorderWidth,
      borderTopWidth: inputBorderWidth,
      paddingHorizontal: scale(8),
      paddingVertical: scale(4),
      minWidth: '30%',
      fontSize: FontSizes.standard,
    },
  },
);

export default class GenericEntry extends PureComponent {
  static defaultProps = {
    enabled: true,
    autoFocus: false,
    useCamera: false,
    index: 0,
    onChange: () => { }
  }

  static propTypes = {
    entry: DataProps.EntryProps.isRequired,
    onChange: PropTypes.func,
    enabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    useCamera: PropTypes.bool,
    index: PropTypes.number,
    value: PropTypes.any
  }

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      showCam: false,
      error: null,
    };
  }

  componentDidMount() {
    const { entry } = this.props;
    this.suppressNextKey = false;
    this.locale = i18n.currentLocale();
    this.formats = i18n.translations[this.locale].formats;
    // Shortened parse function
    this.parse = parseDecimalNumber.withOptions(this.formats);
    // Set initial value if entry object has it (will need to be redisplayed on signature/approval)
    if (entry.value) { this.onChangeText(entry.value); }
  }

  scanned = (type, data) => {
    const { onChange, index } = this.props;
    this.setState({ showCam: false });
    if (type === 0) {
      onChange('', false);
    } else {
      onChange(data, index);
    }
  }

  // Validate when keyboard closed
  onBlur = () => {
    const { value } = this.props;
    this.setState({ editing: false });
    this.validate(value);
  }

  onChangeText = (newValue) => {
    const { onChange, value, index } = this.props;
    if (this.suppressNextKey) {
      this.suppressNextKey = false;
      onChange(value, index);
    } else {
      onChange(newValue.toString(), index);
    }
    this.setState({ error: null });
  }

  onKeyPress = (e) => {
    const { entry } = this.props;
    const type = entry.entryType;
    const { key } = e.nativeEvent;
    if (type === 'Decimal') {
      if (key === this.formats.thousands || key === ' ') { this.suppressNextKey = true; }
    } else if (type === 'Integer') {
      if (key === this.formats.decimal || key === this.formats.thousands || key === ' ') { this.suppressNextKey = true; }
    }
  }

  checkStringLimits(value, validation) {
    if (validation) {
      if (validation.minLength && (value.length < validation.minLength)) {
        this.setState({ error: `Length is less than the minimum of ${validation.minLength}` });
        return false;
      } if (validation.maxLength && (value.length > validation.maxLength)) {
        this.setState({ error: `Length is greater than the maximum of ${validation.maxLength}` });
        return false;
      }
    }
    return true;
  }

  checkNumericLimits(value, validation) {
    if (validation) {
      if (validation.lower && value < validation.lower) {
        this.setState({ error: `Value is less than lower limit of ${validation.lower}` });
        return false;
      } if (validation.upper && value > validation.upper) {
        this.setState({ error: `Value is greater than the upper limit of ${validation.upper}` });
        return false;
      } if (validation.increment && (value % validation.increment > 0)) {
        this.setState({ error: `Value should be in increments of ${validation.increment}` });
        return false;
      }
      return true;
    }
    return true;
  }

  checkRegEx(value, validation) {
    if (validation) {
      const exp = validation.regExp;
      if (exp) {
        const test = new RegExp(`^${exp}$`).test(value);
        if (!test) {
          this.setState({ error: `Value does not match the required pattern: ${exp}` });
          return false;
        }
      }
    }
    return true;
  }

  validate() {
    const { entry, value } = this.props;
    const { validation } = entry;
    if (value) {
      const type = entry.entryType;

      if (type === 'Integer' || type === 'Decimal') { // Numerics
        // Convert to 'standard' number
        const realVal = this.parse(value);
        if (isNaN(realVal)) {
          this.setState({ error: 'Not a valid number' });
          return false;
        }
        if (type === 'Integer' && (realVal % 1 > 0)) {
          this.setState({ error: 'Value must be an integer, not a decimal' });
          return false;
        }
        return this.checkNumericLimits(realVal, validation);
      }
      if (type === 'String') { return this.checkStringLimits(value, validation); }
      if (type === 'Custom' || type === 'Date') { return this.checkRegEx(value, validation); }
    }
    this.setState({ error: 'A value is required' });
    return false;
  }

  render() {
    const { showCam, editing, error } = this.state;
    const {
      entry,
      enabled,
      autoFocus,
      useCamera,
      value
    } = this.props;
    const hasLabel = !!entry.label;
    const hasSuffix = !!entry.suffix;
    const keyboardType = (entry.entryType === 'Integer' || entry.entryType === 'Decimal') ? 'number-pad' : 'default';
    const boxColor = editing ? NexaColours.GreyUltraLight : NexaColours.GreyLight;
    const boxLeft = !hasSuffix ? {
      borderTopRightRadius: inputBorderRadius,
      borderBottomRightRadius: inputBorderRadius,
      borderRightWidth: inputBorderWidth,
    } : null;
    const boxRight = !hasLabel ? {
      borderTopLeftRadius: inputBorderRadius,
      borderBottomLeftRadius: inputBorderRadius,
      borderLeftWidth: inputBorderWidth,
    } : null;
    const boxStyle = StyleSheet.flatten(
      [styles.inputBox,
        { backgroundColor: boxColor },
        boxLeft,
        boxRight
      ]
    );
    return (
      <View style={{ flexDirection: 'column' }}>
        <View style={styles.inputContainer}>
          {hasLabel && <Text style={styles.inputLabel}>{entry.label}</Text>}
          <TextInput
            style={boxStyle}
            value={value}
            onChangeText={this.onChangeText}
            blurOnSubmit
            onFocus={() => this.setState({ editing: true })}
            onBlur={this.onBlur}
            underlineColorAndroid="transparent"
            editable={enabled}
            autoFocus={autoFocus}
            keyboardType={keyboardType}
            onKeyPress={this.onKeyPress}
          />
          {hasSuffix && <Text style={styles.inputSuffix}>{entry.suffix}</Text>}
          {useCamera && <IconButton iconName="camera" onPress={() => this.setState({ showCam: true })} />}
          <BarcodeReader visible={showCam} onScanned={this.scanned} />
        </View>
        <ErrorBar text={error} onPress={() => this.setState({ error: null })} />
      </View>
    );
  }
}
