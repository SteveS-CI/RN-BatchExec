import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { EntryProps } from '../constants/DataProps';
import ActionEntry from './ActionEntry';

// This component is a container for one or more ActionEntry components
export default class ActionEntryArray extends Component {

  static propTypes = {
    entries: PropTypes.arrayOf(EntryProps).isRequired,
    onChange: PropTypes.func.isRequired,
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
    this.entries = [];
    this.values = [];
  }

  onChange = (value) => {

  }

  validate(value) {

  }

  render() {
    // build elements from props
    const {
      entries,
      onChange,
      enabled,
      autoFocus,
      useCamera
    } = this.props;
    let list = null;
    list = entries.map((entry, index) => {
      this.values.push(null);
      console.log(entry.name);
      return (
        <ActionEntry
          key={entry.name}
          ref={(ref) => { this.entries.push(ref); }}
          entry={entry}
          value={this.values[index]}
          onChange={onChange}
          enabled={enabled}
          autoFocus={autoFocus}
          useCamera={useCamera}
          index={index}
        />
      );
    });
    return (
      <ScrollView>
        {list}
      </ScrollView>
    );
  }
}
