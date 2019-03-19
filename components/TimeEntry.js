import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TimePickerAndroid
} from 'react-native';
import PropTypes from 'prop-types';
import * as DataProps from '../constants/DataProps';
import ErrorBar from './ErrorBar';
import NexaColours from '../constants/NexaColours';
import { FontSizes, scale } from '../constants/Layout';

const inputBorderWidth = StyleSheet.hairlineWidth;
const inputBorderRadius = scale(8);

const styles = StyleSheet.create(
  {
    inputContainer: {
      flexDirection: 'row',
      marginHorizontal: scale(8),
      marginTop: scale(8),
      padding: 1,
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
    inputBox: {
      borderColor: NexaColours.GreyDark,
      borderWidth: inputBorderWidth,
      borderTopRightRadius: inputBorderRadius,
      borderBottomRightRadius: inputBorderRadius,
      paddingHorizontal: scale(8),
      paddingVertical: scale(4),
      minWidth: '30%',
      fontSize: FontSizes.standard,
    },
  },
);

export default class TimeEntry extends PureComponent {
  static defaultProps = {
    enabled: true,
    index: 0,
    value: '12:00',
    onChange: () => { }
  }

  static propTypes = {
    entry: DataProps.EntryProps.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    enabled: PropTypes.bool,
    index: PropTypes.number
  }

  static formatTime(hour, minute) {
    const hh = hour < 10 ? `0${hour}` : hour;
    const mm = minute < 10 ? `0${minute}` : minute;
    return `${hh}:${mm}`;
  }

  constructor(props) {
    super(props);
    this.state = { error: null };
    this.showDialog = this.showDialog.bind(this);
  }

  componentDidMount() {
    const { entry, value } = this.props;
    if (entry.value) { this.onChangeText(entry.value); } else { this.onChangeText(value); }
  }

  onChangeText = (newValue) => {
    const { onChange, index } = this.props;
    onChange(newValue.toString(), index);
    this.setState({ error: null });
  }

  async showDialog() {
    const { action, hour, minute } = await TimePickerAndroid.open({
      hour: 14, minute: 0, is24Hour: true, mode: 'spinner'
    });
    if (action !== TimePickerAndroid.dismissedAction) {
      this.onChangeText(TimeEntry.formatTime(hour, minute));
    }
  }

  validate(value) {
    const { entry } = this.props;
    const { validation } = entry;
    if (value) {
      return this.checkRegEx(value, validation);
    }
    this.setState({ error: 'A value is required' });
    return false;
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

  render() {
    const { error } = this.state;
    const { entry, value, enabled } = this.props;
    const hasLabel = !!entry.label;
    return (
      <View style={{ flexDirection: 'column' }}>
        <View style={styles.inputContainer}>
          {hasLabel && <Text style={styles.inputLabel}>{entry.label}</Text>}
          <Text style={styles.inputBox} onPress={this.showDialog} disabled={!enabled}>{value}</Text>
        </View>
        <ErrorBar text={error} onPress={() => this.setState({ error: null })} />
      </View>
    );
  }
}
