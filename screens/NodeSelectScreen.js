import React from "react";
import { View, ScrollView, Text, Button } from "react-native";
import NexaColours, {tableRowEven, tableRowOdd, tableRowSelected} from "../constants/NexaColours";
import ButtonBar from '../components/ButtonBar'
import RoundedButton from "../components/RoundedButton";
import NodeItem from "../components/NodeItem";
import LoadingOverlay from '../components/LoadingOverlay'
import TextBar from '../components/TextBar'
import api from '../api/api'
import endpoints from '../api/endpoints'

export default class NodeSelectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { batchData: null, selectedItem: 0, loading: false };
  }

  static navigationOptions = { title: "Node Selection" };

  componentDidMount() {
    const batchData = this.props.navigation.getParam("batchData")
    const locationCode = this.props.navigation.getParam("locationCode")
    this.locationCode = locationCode
    this.setState({batchData})
  }

  rowClicked = node => {
    const procID = node.procID;
    this.node = node;
    this.setState({ selectedItem: procID });
  };

  selectClicked = () => {
    if (this.node) {
      const nav = this.props.navigation;
      // set loading prior to request
      this.setState({ loading: true });
      const request = {
        ...endpoints.nextProc,
        data: {
          batchID: this.state.batchData.batchID,
          procID: this.node.procID,
          location: this.locationCode
        }
      };
      api.request(request)
        .then(response => {
          this.setState({ loading: false });
          const batchData = response.data;
          // depending on data shape, navigate to the appropriate screen, passing batchData
          if (batchData.nodes.length > 1) {
            // Multiple nodes; stay on this screen
            this.setState({batchData})
          } else {
            // Single nodes
            if (batchData.nodeDepth === 3) {
              // Action node
              nav.navigate("ActionDetail", { batchData, locationCode: this.locationCode });
            } else {
              // Operation/Stage/Process - for Confirmation/Signature/Approval
              nav.navigate("NodeDetail", { batchData, locationCode: this.locationCode });
            }
          }
        })
        .catch(error => {
          this.setState({ loading: false });
          console.log(JSON.stringify(error));
        });
    }
  };

  render() {
    const nav = this.props.navigation
    const batchData = this.state.batchData
    let nodeList = null
    let level = ''
    if (batchData) {
      level = ['','Stages','Operations','Actions'][this.state.batchData.nodeDepth]
      nodeList = batchData.nodes.map((node, index) => {
        const rowStyle = index & 1 ? tableRowOdd : tableRowEven;
        const selected = node.procID === this.state.selectedItem;
        const style = selected ? tableRowSelected : rowStyle;
        return (
          <NodeItem
            key={index}
            item={node}
            rowClicked={this.rowClicked}
            selected={selected}
            rowStyle={style}
          />
        );
      });
    }
    return (
      <View style={{flex: 1}}>
        <ButtonBar justify="space-between">
          <RoundedButton
            backColor={NexaColours.AlertYellow}
            title="Cancel"
            onPress={() => {
              nav.navigate("BatchList");
            }}
          />
          <TextBar backColor={NexaColours.CyanAccent}>Select one of the following {level}:</TextBar>
          <RoundedButton
            backColor={NexaColours.AlertGreen}
            title="Select"
            onPress={this.selectClicked}
            disabled={this.state.selectedItem == 0}
          />
        </ButtonBar>
        <View style={{ flex: 1 }}>
          <ScrollView>{nodeList}</ScrollView>
        </View>
        <LoadingOverlay loading={this.state.loading} />      
      </View>
    );
  }
}
