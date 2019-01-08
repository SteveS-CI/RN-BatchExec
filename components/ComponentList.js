import React, { Component, PureComponent } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { ComponentProps } from '../constants/DataProps'
import ModalContent from '../components/ModalContent'
import NexaColours from '../constants/NexaColours';
import { FontSizes, scale } from '../constants/Layout';

const styles = StyleSheet.create({
  outer: {
    flexDirection: 'column',
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: scale(8)
  },
  componentContainer: {
    flexDirection: 'row',
  },
  lineNumber: {
    fontSize: FontSizes.standard,
    borderRadius: scale(12),
    borderWidth: StyleSheet.hairlineWidth,
    textAlignVertical: 'center', textAlign: 'center',
    marginRight: scale(5),
    minWidth: scale(24), minHeight: scale(24),
    backgroundColor: NexaColours.Yellow
  },
  component: {
    fontSize: FontSizes.standard,
    marginHorizontal: scale(5)
  },
  weighlist: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  label: {
    marginHorizontal: scale(3),
    marginVertical: scale(5),
    padding: scale(3),
    borderRadius: scale(5),
    borderWidth: StyleSheet.hairlineWidth,
    fontSize: FontSizes.smaller
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
          <View key={index} style={styles.outer}>
            <View style={styles.componentContainer}>
              <Text style={styles.lineNumber}>{comp.lineNumber}</Text>
              <Text style={styles.component}>{comp.materialCode}</Text>
              <Text style={styles.component}>{comp.materialName}</Text>
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