import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import { EntryProps } from '../constants/DataProps';
import ActionEntry from './ActionEntry';

// This component is a container for one or more ActionEntry components
export default class ActionEntryArray extends Component {

  static propTypes = {
    inputs: PropTypes.arrayOf(EntryProps).isRequired,
    enabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    useCamera: PropTypes.bool
  }

  static defaultProps = {
    enabled: true,
    autoFocus: false,
    useCamera: false
  }

  constructor(props) {
    super(props);
    this.entries = []; // references to each of the ActionEntries, needed for calling validate
    const values = [];
    const { inputs } = this.props;
    values.length = inputs.length; // Values should match number of inputs
    this.state = { values };
  }

  onChange = (value, index) => {
    const { values } = this.state;
    values[index] = value;
    this.setState({ values });
  }

  value() {
    // return a single value, or a concatenated set of values
    const { values } = this.state;
    return values.join('|');
  }

  validate() {
    let result = true;
    const { values } = this.state;
    values.forEach((value, index) => {
      const validate = this.entries[index].validate(value);
      result = result && validate;
      console.log('V:', value, ' I:', index, ' R:', result);
    });
    return result;
  }

  render() {
    // build elements from props
    const {
      inputs,
      enabled,
      autoFocus,
      useCamera
    } = this.props;
    let list = null;
    list = inputs.map((entry, index) => {
      const { values } = this.state;
      return (
        <ActionEntry
          key={entry.name}
          ref={(ref) => { this.entries.push(ref); }}
          entry={entry}
          value={values[index]}
          onChange={this.onChange}
          enabled={enabled}
          autoFocus={autoFocus}
          useCamera={useCamera}
          index={index}
        />
      );
    });
    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={300} style={{ flex: 1 }}>
        <ScrollView>
          {list}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
