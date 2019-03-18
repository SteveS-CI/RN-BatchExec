import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as DataProps from '../constants/DataProps';
import GenericEntry from './GenericEntry';
import DistinctEntry from './DistinctEntry';
import TimeEntry from './TimeEntry';

export default class ActionEntry extends PureComponent {
  static defaultProps = {
    enabled: true,
    autoFocus: false,
    useCamera: false,
    index: 0
  }

  static propTypes = {
    entry: DataProps.EntryProps.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    enabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    useCamera: PropTypes.bool,
    index: PropTypes.number
  }

  validate(value) {
    if (this.entry) { return this.entry.validate(value); }
    return true;
  }

  render() {
    const { entry } = this.props;
    const hasEntry = !!entry;
    if (hasEntry) {
      const { entryType } = entry;
      if (entryType === 'Distinct') {
        return (
          <DistinctEntry ref={(ref) => { this.entry = ref; }} {...this.props} />
        );
      }
      if (entryType === 'Time') {
        return (
          <TimeEntry ref={(ref) => { this.entry = ref; }} {...this.props} />
        );
      }
      return (
        <GenericEntry ref={(ref) => { this.entry = ref; }} {...this.props} />
      );
    }
    return null;
  }
}
