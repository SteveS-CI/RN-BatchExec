import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import PropList from "../components/PropList";
import NexaColours from "../constants/NexaColours";

const styles = StyleSheet.create({
  columnOuter: {
    flexDirection: 'row',
    backgroundColor: NexaColours.Grey,
    borderColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  columns: {
    color: 'white',
    padding: 8,
    fontSize: 16
  },
  rowOuter: {
    flexDirection: 'row',
    padding: 8
  },
  rows: {
    color: NexaColours.GreyDark,
    padding: 8,
    fontSize: 14
  }
})

const widths = [
  "35%",
  "30%",
  "25%",
]

export class EquipmentHeader extends Component {
  render() {
    const style = StyleSheet.flatten([styles.columns, this.props.style])
    return (
      <View style={styles.columnOuter}>
        <Text style={{...style, flexBasis: widths[0]}}>Category</Text>
        <Text style={{...style, flexBasis: widths[1]}}>Model</Text>
        <Text style={{...style, flexBasis: widths[2]}}>Serial No</Text>
      </View>
    )
  }
}

export default class BatchEquipment extends Component {

  static propTypes = {
    item: PropTypes.any.isRequired,
    rowStyle: PropTypes.any
  }

  render() {
    const equip = this.props.item;
    const style = { color: 'white', padding: 3 };
    const fieldStyle = { ...style, color: NexaColours.Blue };
    const rowStyle = {
      ...this.props.rowStyle,
      borderBottomWidth: StyleSheet.hairlineWidth,
      flexDirection: "row",
      paddingVertical: 12
    };
    return (
      <View>
        <View style={rowStyle}>
          <Text style={fieldStyle}>Category:</Text>
          <Text style={style}>{equip.category}</Text>
          <Text style={fieldStyle}>Model:</Text>
          <Text style={style}>{equip.model}</Text>
          <Text style={fieldStyle}>Serial No:</Text>
          <Text style={style}>{equip.serialNo}</Text>
        </View>
      </View>
    );
  }
}

{
  /*}
"id": 336060,
"lineNumber": 1,
"materialCode": "MMSMAT01",
"materialName": "Lactose",
"componentType": "Input",
"quantity": "2.500 kg",
"status": "NotStarted"
*/
}
