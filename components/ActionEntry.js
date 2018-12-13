import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as DataProps from '../constants/DataProps'
import GenericEntry from './GenericEntry'
import DistinctEntry from './DistinctEntry'

export default class ActionEntry extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { editing: false }
  }

  static defaultProps = {
    enabled: true,
    autoFocus: false
  }

  static propTypes = {
    entry: DataProps.EntryProps,
    value: PropTypes.any,
    onChange: PropTypes.func,
    enabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    useCamera: PropTypes.bool
  }

  validate(value) {
    if (this.entry) { return this.entry.validate(value) }
    else { return true }
  }

  render() {
    const hasEntry = this.props.entry ? true : false
    if (hasEntry) {
      const entryType = this.props.entry.entryType
      if (entryType === 'Distinct') {
        return (
          <DistinctEntry ref={(ref) => { this.entry = ref }} {...this.props} />
        )
      } else {
        return (
          <GenericEntry ref={(ref) => { this.entry = ref }} {...this.props} />
        )
      }
    } else {
      return null
    }
  }
}
