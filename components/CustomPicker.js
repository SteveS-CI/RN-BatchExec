import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Modal, Text } from 'react-native'
import PropTypes from 'prop-types'
import NexaColours from '../constants/NexaColours';
import RoundedButton from './RoundedButton';
import { FontSizes } from '../constants/Layout'
import FontAwesome, { Icons } from 'react-native-fontawesome';

const styles = StyleSheet.create(
  {
    entry: {
      fontSize: FontSizes.standard,
      textAlignVertical: 'center',
      paddingLeft: 8,
      backgroundColor: NexaColours.GreyLight,
      borderColor: NexaColours.GreyDark,
      borderWidth: StyleSheet.hairlineWidth * 2,
      borderRightWidth: 0,
      minWidth: '33%'
    },
    title: {
      fontSize: FontSizes.standard,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 8,
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    items: {
      fontSize: FontSizes.standard,
      marginVertical: 8
    },
    arrow: {
      fontSize: FontSizes.standard * 2,
      color: NexaColours.Grey,
      backgroundColor: NexaColours.GreyLight,
      paddingHorizontal: 4,
      borderColor: NexaColours.GreyDark,
      borderWidth: StyleSheet.hairlineWidth * 2,
      borderLeftWidth: 0
    },
    inner: {
      position: 'absolute',
      padding: 12, marginTop: 120,
      backgroundColor: 'white',
      borderWidth: 1,
      borderRadius: 12,
      borderColor: NexaColours.Blue,
      elevation: 8,
      minWidth: '80%',
    },
    outer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
  }
)

class PickerInner extends Component {

  static propTypes = {
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.any),
    display: PropTypes.string,
    visible: PropTypes.bool,
    onChange: PropTypes.func.isRequired
  }

  valueChange = (value) => {
    this.props.onChange(value)
  }

  onCancel = () => {
    this.props.onChange(null)
  }

  getItems() {
    const items = this.props.items
    const list = items.map((item, idx) => {
      const display = this.props.display ? item[this.props.display] : item
      return <Text key={idx} style={styles.items} onPress={() => this.valueChange(item)}>{display}</Text>
    }
    )
    return (
      <ScrollView>
        {list}
      </ScrollView>
    )
  }

  render() {
    const visible = this.props.visible
    if (visible) {
      const title = this.props.title
      const list = this.getItems()
      return (
        <Modal onRequestClose={this.onCancel} transparent={true}>
          <View style={styles.outer}>
            <View style={styles.inner}>
              {title && <Text style={styles.title}>{title}</Text>}
              {list}
              <RoundedButton title='OK' onPress={this.onExit} />
            </View>
          </View>
        </Modal>
      )
    } else {
      return null
    }
  }
}

export default class CustomPicker extends Component {
  constructor(props) {
    super(props)
    this.state = (
      {
        value: null,
        editing: false
      }
    )
  }

  static defaultProps = {
    display: null
  }

  static propTypes = {
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.any),
    display: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
  }

  picked = (value) => {
    const newVal = value ? value : this.state.value
    this.props.onChange(newVal)
    this.setState({value: newVal, editing: false})
  }

  startEdit = () => {
    this.setState({ editing: true })
  }

  render() {
    const arrow = <FontAwesome style={styles.arrow} onPress={this.startEdit}>{Icons.caretDown}</FontAwesome>
    const value = this.props.display ? this.props.value[this.props.display] : this.props.value
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.entry} onPress={this.startEdit}>{value}</Text>
        {arrow}
        <PickerInner visible={this.state.editing} title={this.props.title} items={this.props.items} onChange={this.picked} display={this.props.display}/>
      </View>
    )
  }

}