import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import i18n from 'i18n-js';
import ButtonBar from '../components/ButtonBar';
import TextBar from '../components/TextBar';
import RoundedButton from '../components/RoundedButton';
import ScrollList from '../components/ScrollList';
import NexaColours from '../constants/NexaColours';
import Settings from '../Store/Settings';
import { methods } from '../api/api';
import { NavChoice } from '../Utils/utils';
import ModalMessage from '../components/ModalMessage';

export default class BatchSelectScreen extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      navigation: PropTypes.object,
    }).isRequired,
  }

  static navigationOptions = () => ({
    title: i18n.t('screens.batchList.title'),
  });

  headers = [
    {
      caption: i18n.t('batchList.header.product'),
      source: 'product',
      flex: 4,
    },
    {
      caption: i18n.t('batchList.header.batchCode'),
      source: 'code',
      flex: 2,
    },
    {
      caption: i18n.t('batchList.header.quantity'),
      source: 'quantity',
      flex: 2,
    },
    {
      caption: i18n.t('batchList.header.status'),
      source: 'state',
      flex: 2,
    },
  ]

  constructor(props) {
    super(props);
    this.state = {
      batchList: null,
      selectedIndex: -1,
      selectedItemID: 0,
      loading: false,
      continueDisabled: false,
      message: null,
    };
  }

  componentDidMount() {
    Settings.readObject('location').then((location) => {
      if (location) {
        this.locationCode = location.code;
        this.fetchBatchList(location.code);
      }
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
      const { navigation } = this.props;
      // set loading prior to request
      this.setState({ loading: true });
      methods.getBatch(this.batch.batchID, this.locationCode)
        .then((data) => {
          this.setState({ loading: false });
          this.batch = data;
          // Navigate to the TabNavigator, not a specific screen (Props/Comps/Equip)
          // The parameter is passed to all screens of the TabNavigator
          // (all screens are rendered at once)
          navigation.navigate('BatchDetail', {
            batch: {
              ...data,
              state: i18n.t(`enums.BatchStatus.${data.status}`),
            },
            locationCode: this.locationCode,
          });
        })
        .catch((error) => {
          this.setState({ loading: false });
          console.log(JSON.stringify(error));
        });
    }
  };

  continueClicked = () => {
    if (this.batch) {
      const { navigation } = this.props;
      // set loading prior to request
      this.setState({ loading: true });
      const postData = {
        batchID: this.batch.batchID,
        procID: 0,
        location: this.locationCode,
      };
      methods.nextProc(postData)
        .then((batchData) => {
          const message = NavChoice(batchData, navigation, this.locationCode);
          if (message) { this.setState({ message, loading: false }); }
        })
        .catch((error) => {
          this.setState({ message: error.message, loading: false });
        });
    }
  };

  listOnRefresh = () => {
    this.fetchBatchList(this.locationCode);
  }

  transform = (row) => {
    const newRow = {
      ...row,
      product: `${row.productCode}\n${row.productName}`,
      state: i18n.t(`enums.BatchStatus.${row.status}`),
    };
    return newRow;
  }

  onExit = () => {
    this.setState({ message: null });
  }

  fetchBatchList(locationCode) {
    this.setState({ batchList: null, loading: true });
    methods.getBatchList(locationCode)
      .then((data) => {
        this.setState({ batchList: data, loading: false });
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        this.setState({ loading: false });
      });
  }

  render() {
    const warn = 'There is no Location set';
    const {
      batchList, selectedIndex, loading, continueDisabled, selectedItemID, message
    } = this.state;
    let list = null;
    let contDisabled = true;
    if (!this.locationCode) {
      list = (
        <TextBar backColor={NexaColours.AlertOrange} style={{ marginTop: 12 }}>{warn}</TextBar>
      );
    } else {
      list = (
        <ScrollList
          headers={this.headers}
          data={batchList}
          selectedIndex={selectedIndex}
          onPress={this.listOnPress}
          noData="No Batches are available"
          loading={loading}
          onRefresh={this.listOnRefresh}
          topMargin={false}
          transform={this.transform}
        />
      );
    }
    contDisabled = continueDisabled || selectedItemID === 0;
    return (
      <View style={{ flex: 1 }}>
        <ButtonBar justify="flex-end">
          <RoundedButton
            disabled={selectedItemID === 0}
            title={i18n.t('button.captions.details')}
            onPress={this.detailClicked}
          />
          <RoundedButton
            disabled={contDisabled}
            title={i18n.t('button.captions.continue')}
            onPress={this.continueClicked}
          />
        </ButtonBar>
        {list}
        <ModalMessage messageText={message} onExit={this.onExit} />
      </View>
    );
  }
}
