import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, Picker } from 'react-native'
import PropTypes from 'prop-types'
import * as DataProps from '../constants/DataProps'
import NexaColours from '../constants/NexaColours'

const inputBorderWidth = StyleSheet.hairlineWidth * 2
const inputBorderRadius = 10

const styles = StyleSheet.create(
  {
    pickerContainer: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      marginHorizontal: 8, marginTop: 8, padding: 0,
      borderColor: NexaColours.GreyDark, borderWidth: inputBorderWidth,
      borderRadius: inputBorderRadius,
      backgroundColor: NexaColours.GreyLight
    },
    pickerLabel: {
      backgroundColor: NexaColours.GreyAccent,
      paddingHorizontal: 8, paddingVertical: 0,
      textAlignVertical: 'center',
      borderColor: NexaColours.GreyDark, borderWidth: inputBorderWidth,
      borderTopLeftRadius: inputBorderRadius,
      borderBottomLeftRadius: inputBorderRadius
    },
    pickerSuffix: {
      backgroundColor: NexaColours.GreyAccent,
      paddingHorizontal: 8, paddingVertical: 0,
      textAlignVertical: 'center',
      borderColor: NexaColours.GreyDark, borderWidth: inputBorderWidth,
      borderTopRightRadius: inputBorderRadius,
      borderBottomRightRadius: inputBorderRadius
    }
  }
)

export default class DistinctEntry extends PureComponent {

  static defaultProps = {
    enabled: true
  }

  static propTypes = {
    entry: DataProps.EntryProps.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func,
    enabled: PropTypes.bool
  }

  componentDidMount() {
    this.onValueChange(this.props.entry.validation.choices[0])
  }

  onValueChange = (itemValue, itemIndex) => {
    if (this.props.onChange) this.props.onChange(itemValue)
  }

  validate(value) {
    // Distinct entries will always validate true
    return true
  }

  render() {
    const entry = this.props.entry
    const hasLabel = entry.label ? true : false
    const hasSuffix = entry.suffix ? true : false
    const validation = entry.validation
    const choices = validation.choices
    const items = choices.map((item, idx) => {
      return (
        <Picker.Item key={idx} label={item} value={item} />
      )
    })
    return (
      <View style={styles.pickerContainer}>
        {hasLabel && <Text style={styles.pickerLabel}>{entry.label}</Text>}
        <Picker style={{ minWidth: 230 }}
          selectedValue={this.props.value}
          onValueChange={this.onValueChange}
          enabled={this.props.enabled}
          mode='dropdown'>
          {items}
        </Picker>
        {hasSuffix && <Text style={styles.pickerSuffix}>{entry.suffix}</Text>}
      </View>
    )
  }
}
