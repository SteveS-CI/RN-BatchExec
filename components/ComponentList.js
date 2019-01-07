import React, { Component, PureComponent } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { ComponentProps } from '../constants/DataProps'
import ModalContent from '../components/ModalContent'
import NexaColours from '../constants/NexaColours';

const styles = StyleSheet.create({
  component: {
  },
  weighlist: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  label: {
    marginHorizontal: 3,
    marginVertical: 5,
    padding: 3,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth
  }
})

export default class ComponentList extends Component {

  static defaultProps = {
    visible: false
  }

  static propTypes = {
    components: PropTypes.arrayOf(ComponentProps),
    visible: PropTypes.bool,
    onDismiss: PropTypes.func.isRequired
  }

  makeCompList() {
    const complist = this.props.components.map((comp, index) => {
      if (comp.status === 'Dispense') {
        const weighlist = comp.weighings.map((weigh, idx) => {
          const colorStyle = weigh.scanned 
            ? {color: NexaColours.White, backgroundColor: NexaColours.Green}
            : {color: NexaColours.White, backgroundColor: NexaColours.GreyLight}
          const labStyle = StyleSheet.flatten([styles.label, colorStyle])
          return (
            <Text key={idx} style={labStyle}>{weigh.id}</Text>
          )
        })
        return (
          <View key={index} style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text>{comp.lineNumber}</Text>
              <Text>{comp.materialCode}</Text>
              <Text>{comp.materialName}</Text>
            </View>
            <View style={styles.weighlist}>
              {weighlist}
            </View>
          </View>
        )
      }
    })
    return complist
  }

  render() {
    if (this.props.visible) {
      const complist = this.makeCompList()
      return (
        <ModalContent visible={this.props.visible} onDismiss={this.props.onDismiss}>
          <ScrollView>
            {complist}
          </ScrollView>
        </ModalContent>
      )
    } else {
      return null
    }
  }

}