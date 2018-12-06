import React, { Component } from "react";
import { View } from "react-native"
import i18n from 'i18n-js';
import mockedBatchList from "../Mocked/batchlist.json"
import ButtonBar from "../components/ButtonBar"
import TextBar from "../components/TextBar"
import RoundedButton from "../components/RoundedButton"
import ScrollList from '../components/ScrollList'
import NexaColours from "../constants/NexaColours";
import Settings from "../Store/Settings";
import {methods} from '../api/api'
import mockBatch from "../Mocked/batch.json";
import {NavChoice, MeasureTextLength} from '../Utils/utils'

export default class BatchSelectScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batchList: null,
      selectedIndex: -1,
      selectedItemID: 0,
      loading: false,
      continueDisabled: false
    };
    this.mocked = this.props.screenProps.mocked
  }

  static navigationOptions = () => {
    return {
      title: i18n.t('screens.batchList.title')
    }
  };

  headers = [
    {
      caption: i18n.t('batchList.header.product'),
      source: "product",
      flex: 4
    },
    {
      caption: i18n.t("batchList.header.batchCode"),
      source: "code",
      flex: 2
    },
    {
      caption: i18n.t("batchList.header.quantity"),
      source: "quantity",
      flex: 2
    },
    {
      caption: i18n.t("batchList.header.status"),
      source: "state",
      flex: 2
    }
  ]

  componentDidMount() {
    if (this.mocked) {
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
    this.setState({batchList: null, loading: true })
    methods.getBatchList(locationCode)
      .then(data => {
        this.setState({ batchList: data, loading: false });
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        this.setState({ loading: false });
      });
  }

  listOnPress = (index, item) => {
    const selectedItemID = item.batchID;
    this.batch = item;
    const continueDisabled = item.startErrors > 0;
    this.setState({ selectedItemID, continueDisabled, selectedIndex: index });
  };

  detailClicked = () => {
    if (this.batch) {
      if (this.mocked) {
        this.batch = mockBatch;
        this.props.navigation.navigate("BatchDetail", {
          batch: this.batch,
          locationCode: this.locationCode
        });
      } else {
        // set loading prior to request
        this.setState({ loading: true });
        methods.getBatch(this.batch.batchID, this.locationCode)
          .then(data => {
            this.setState({ loading: false });
            this.batch = data;
            // Navigate to the TabNavigator, not a specific screen (Props/Comps/Equip)
            // The parameter is passed to all screens of the TabNavigator
            // (all screens are rendered at once)
            this.props.navigation.navigate("BatchDetail", {
              batch: {...data,
                state: i18n.t("enums.BatchStatus." + data.status)
              },
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
      if (this.mocked) {
        this.batch = mockBatch;
        nav.navigate("ActionDetail", {
          batch: this.batch,
          locationCode: this.locationCode
        });
      } else {
        // set loading prior to request
        this.setState({ loading: true })
        const postData = {
          batchID: this.batch.batchID,
          procID: 0,
          location: this.locationCode
        }
        methods.nextProc(postData)
          .then(batchData => {
            NavChoice(batchData, nav, this.locationCode)
          })
          .catch(error => {
            this.setState({ loading: false });
            console.log('continueClicked-ERROR: ',JSON.stringify(error));
          });
      }
    }
  };

  listOnRefresh = () => {
    this.fetchBatchList(this.locationCode)
  }

  transform = (row) => {
    const newRow = {
      ...row,
      product: row.productCode + '\n' + row.productName,
      state: i18n.t("enums.BatchStatus." + row.status)
    }
    return newRow
  }

  render() {
    const batchData = this.state.batchList;
    let batchList = null;
    let contDisabled = true;
    if (!this.locationCode) {
      batchList = (
        <TextBar backColor={NexaColours.AlertOrange} style={{marginTop: 12}}>
          There is no Location set
        </TextBar>
      )
    } else {
      batchList = <ScrollList
        headers={this.headers} data={batchData}
        selectedIndex={this.state.selectedIndex}
        onPress={this.listOnPress}
        noData='No Batches are available'
        loading={this.state.loading}
        onRefresh={this.listOnRefresh}
        topMargin={false}
        transform={this.transform}
      />
    }
    contDisabled = this.state.continueDisabled || this.state.selectedItemID == 0;
    return (
      <View style={{ flex: 1 }}>
        <ButtonBar justify="flex-end">
          <RoundedButton
            disabled={this.state.selectedItemID == 0}
            title={i18n.t("button.captions.details")}
            onPress={this.detailClicked}
          />
          <RoundedButton
            disabled={contDisabled}
            title={i18n.t("button.captions.continue")}
            onPress={this.continueClicked}
          />
        </ButtonBar>
        {batchList}
      </View>
    );
  }
}
