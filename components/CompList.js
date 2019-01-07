import React, {Component} from 'react'
import {View} from 'react-native'
import { ComponentProps } from '../constants/DataProps'

export default class ComponentList extends Component {

  static propTypes = {
    components: ComponentProps
  }

  render() {
    const components = this.props.components
    if (components) {
      return (
        <ModalContent>
          <Text>This is Modal?</Text>
        </ModalContent>
      )
    } else {
      return null
    }
  }

}