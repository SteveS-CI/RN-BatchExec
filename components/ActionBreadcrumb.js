import React, { PureComponent } from 'react'
import { StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'
import NexaColours from '../constants/NexaColours'
import {FontSizes} from '../constants/Layout'

const styles = StyleSheet.create(
  {
    breadcrumb: {
      color: 'white',
      padding: 5,
      backgroundColor: NexaColours.Grey,
      fontSize: FontSizes.smaller
    }
  }
)

export default class ActionBreadcrumb extends PureComponent {

  static propTypes = {
    text: PropTypes.string.isRequired
  }

  render() {
    return (
      <Text style={styles.breadcrumb}>{this.props.text}</Text>
    )
  }
}
