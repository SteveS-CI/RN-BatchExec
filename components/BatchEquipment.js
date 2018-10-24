import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import PropList from "../components/PropList";
import NexaColours from "../constants/NexaColours";

const rowSelected = { color: "white" };
const rowPlain = { color: NexaColours.GreyDark };

export default class BatchComponent extends Component {

  render() {
    const equip = this.props.item;
    const textStyle = rowPlain;
    const style = { ...textStyle, padding: 3 };
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

BatchComponent.propTypes = {
  item: PropTypes.any.isRequired,
  rowStyle: PropTypes.any
};
