import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Text
} from "react-native";
import mockedBatchList from "../Mocked/batchlist.json";
import BatchItem from "../components/BatchItem";
import ButtonBar from "../components/ButtonBar";
import TextBar from "../components/TextBar";
import RoundedButton from "../components/RoundedButton";
import LoadingOverlay from "../components/LoadingOverlay";
import NexaColours, {
  tableRowOdd,
  tableRowEven,
  tableRowSelected
} from "../constants/NexaColours";
import {getBatchList, getBatch, nextProc} from "../api/api";
import Settings from "../Store/Settings";
import store from "../Store/store";
import mockBatch from "../Mocked/batch.json";

export default class BatchSelectScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batchList: null,
      selectedItem: 0,
      loading: false,
      continueDisabled: false
    };
  }

  static navigationOptions = {
    title: "Batch Selection"
  };

  componentDidMount() {
    const mocked = store.getMocked();
    if (mocked) {
      this.setState({ batchList: mockedBatchList });
    } else {
      Settings.readObject("location").then(location => {
        if (location) {
          this.locationCode = location.code;
          this.fetchBatchList(location.code);
        }
      });
    }
  }

  fetchBatchList(locationCode) {
    getBatchList(locationCode)
      .then(response => {
        this.setState({ batchList: response.data, loading: false });
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        this.setState({ loading: false });
      });
  }

  rowClicked = item => {
    const selectedItem = item.batchID;
    this.batch = item;
    const continueDisabled = item.startErrors > 0;
    this.setState({ selectedItem, continueDisabled });
  };

  detailClicked = () => {
    if (this.batch) {
      const mocked = store.getMocked();
      if (mocked) {
        this.batch = mockBatch;
        this.props.navigation.navigate("BatchDetail", {
          batch: this.batch,
          locationCode: this.locationCode
        });
      } else {
        // set loading prior to request
        this.setState({ loading: true });
        getBatch(this.batch.batchID, this.locationCode)
          .then(response => {
            this.setState({ loading: false });
            this.batch = response.data;
            // Navigate to the TabNavigator, not a specific screen (Props/Comps/Equip)
            // The parameter is passed to all screens of the TabNavigator
            // (all screens are rendered at once)
            this.props.navigation.navigate("BatchDetail", {
              batch: this.batch,
              locationCode: this.locationCode
            });
          })
          .catch(error => {
            this.setState({ loading: false });
            console.log(JSON.stringify(error));
          });
      }
    }
  };

  continueClicked = () => {
    if (this.batch) {
      const nav = this.props.navigation;
      const mocked = store.getMocked();
      if (mocked) {
        this.batch = mockBatch;
        nav.navigate("ActionDetail", {
          batch: this.batch,
          locationCode: this.locationCode
        });
      } else {
        // set loading prior to request
        this.setState({ loading: true });
        nextProc(this.batch.batchID, 0, this.locationCode)
          .then(response => {
            this.setState({ loading: false });
            const batchData = response.data;
            // depending on data shape, navigate to the appropriate screen, passing batchData
            if (batchData.nodes.length > 1) {
              // Multiple nodes
              nav.navigate("NodeSelect", {
                batchData,
                locationCode: this.locationCode
              });
            } else {
              // Single nodes
              if (batchData.nodeDepth === 3) {
                // Action node
                nav.navigate("ActionDetail", {
                  batchData,
                  locationCode: this.locationCode
                });
              } else {
                // Operation/Stage/Process - for Confirmation/Signature/Approval
                nav.navigate("NodeDetail", {
                  batchData,
                  locationCode: this.locationCode
                });
              }
            }
          })
          .catch(error => {
            this.setState({ loading: false });
            console.log(JSON.stringify(error));
          });
      }
    }
  };

  render() {
    const batchData = this.state.batchList;
    let batchList = null;
    let contDisabled = true;
    if (this.locationCode) {
      if (batchData) {
        if (batchData.length > 0) {
          batchList = batchData.map((batch, index) => {
            const rowStyle = index & 1 ? tableRowOdd : tableRowEven;
            const selected = batch.batchID === this.state.selectedItem;
            const style = selected ? tableRowSelected : rowStyle;
            return (
              <BatchItem
                key={index}
                item={batch}
                rowClicked={this.rowClicked}
                selected={selected}
                rowStyle={style}
              />
            );
          });
        } else {
          batchList = (
            <TextBar backColor={NexaColours.AlertYellow}>
              There are no Batches available for the selected location.
            </TextBar>
          );
        }
      }
    } else {
      batchList = (
        <TextBar backColor={NexaColours.AlertRed}>
          There is no Location set
        </TextBar>
      );
    }
    contDisabled = this.state.continueDisabled || this.state.selectedItem == 0;
    return (
      <View style={{ flex: 1 }}>
        <ButtonBar justify="flex-end">
          <RoundedButton
            disabled={this.state.selectedItem == 0}
            title="Details"
            onPress={this.detailClicked}
          />
          <RoundedButton
            disabled={contDisabled}
            title="Continue"
            onPress={this.continueClicked}
          />
        </ButtonBar>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ backgroundColor: NexaColours.GreyLight }}>
            {batchList}
          </ScrollView>
        </View>
        <LoadingOverlay loading={this.state.loading} />
      </View>
    );
  }
}
