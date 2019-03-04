import React, { PureComponent } from 'react';
import {
  StyleSheet, View, Text, Picker,
} from 'react-native';
import PropTypes from 'prop-types';
import * as DataProps from '../constants/DataProps';
import NexaColours from '../constants/NexaColours';
import { FontSizes } from '../constants/Layout';
import CustomPicker from './CustomPicker';

const inputBorderWidth = StyleSheet.hairlineWidth;

const styles = StyleSheet.create(
  {
    pickerContainer: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      marginHorizontal: 8,
      marginTop: 8,
      padding: 0,
      borderColor: NexaColours.GreyDark,
      borderWidth: inputBorderWidth,
      backgroundColor: NexaColours.GreyLight,
    },
    pickerLabel: {
      backgroundColor: NexaColours.GreyAccent,
      paddingHorizontal: 8,
      paddingVertical: 0,
      textAlignVertical: 'center',
      borderColor: NexaColours.GreyDark,
      borderWidth: inputBorderWidth,
      fontSize: FontSizes.standard,
    },
    pickerSuffix: {
      backgroundColor: NexaColours.GreyAccent,
      paddingHorizontal: 8,
      paddingVertical: 0,
      textAlignVertical: 'center',
      borderColor: NexaColours.GreyDark,
      borderWidth: inputBorderWidth,
      fontSize: FontSizes.standard,
    },
  },
);

export default class DistinctEntry extends PureComponent {
  static defaultProps = {
    enabled: true,
  }

  static propTypes = {
    entry: DataProps.EntryProps.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func,
    enabled: PropTypes.bool,
  }

  componentDidMount() {
    if (this.props.value) {
      this.onValueChange(this.props.value);
    } else {
      this.onValueChange(this.props.entry.validation.choices[0]);
    }
  }

  onValueChange = (itemValue, itemIndex) => {
    if (this.props.onChange) this.props.onChange(itemValue);
  }

  validate(value) {
    // Distinct entries will always validate true
    return true;
  }

  render() {
    const { entry } = this.props;
    const hasLabel = !!entry.label;
    const hasSuffix = !!entry.suffix;
    const { validation } = entry;
    const { choices } = validation;
    const caption = (entry.label ? entry.label : '') + (entry.suffix ? ` (${entry.suffix})` : '');
    const title = caption || 'Select';
    return (
      <View style={styles.pickerContainer}>
        {hasLabel && <Text style={styles.pickerLabel}>{entry.label}</Text>}
        <CustomPicker title={title} items={choices} value={this.props.value} onChange={this.onValueChange} />
        {hasSuffix && <Text style={styles.pickerSuffix}>{entry.suffix}</Text>}
      </View>
    );
  }
}
