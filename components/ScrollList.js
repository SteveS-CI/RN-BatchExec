import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {ListHeaderProps} from '../constants/DataProps'

export default class ScrollList extends Component {

  static propTypes = {
    headers: PropTypes.arrayOf(PropTypes.shape(ListHeaderProps)).isRequired,
    data: PropTypes.arrayOf(PropTypes.any).isRequired
  }
 
  render() {
    return (
      null
    )
  }
  
}