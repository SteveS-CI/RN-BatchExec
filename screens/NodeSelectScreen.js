import React from 'react';
import { View } from 'react-native';
import i18n from 'i18n-js';
import NexaColours from '../constants/NexaColours';
import ButtonBar from '../components/ButtonBar';
import RoundedButton from '../components/RoundedButton';
import TextBar from '../components/TextBar';
import ScrollList from '../components/ScrollList';
import { methods } from '../api/api';
import { NavChoice } from '../Utils/utils';

export default class NodeSelectScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const batchData = navigation.getParam('batchData');
    let name = 'default';
    if (batchData) {
      const { nodeDepth } = batchData;
      name = NodeSelectScreen.nodeName(nodeDepth, false);
    }
    return {
      title: i18n.t('screens.nodeSelect.title', { name }),
    };
  };

  static nodeName(depth, plural) {
    const count = plural ? 2 : 1;
    const nodeName = i18n.t(`node.names.${['', 'stage', 'operation', 'action'][depth]}`, { count });
    return nodeName;
  }

  constructor(props) {
    super(props);
    this.state = {
      batchData: null,
      selectedIndex: -1,
      selectedItemID: 0
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const batchData = navigation.getParam('batchData');
    const locationCode = navigation.getParam('locationCode');
    this.locationCode = locationCode;
    this.setState({ batchData });
  }

  rowClicked = (index, node) => {
    this.node = node;
    this.setState({
      selectedItemID: node.procID,
      selectedIndex: index,
    });
  };

  selectClicked = () => {
    if (this.node) {
      const { navigation } = this.props;
      const { batchData, selectedItemID } = this.state;
      // set loading prior to request
      const postData = {
        batchID: batchData.batchID,
        procID: selectedItemID,
        location: this.locationCode,
      };
      methods.nextProc(postData)
        .then((data) => {
          NavChoice(data, navigation, this.locationCode);
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    }
  };

  render() {
    const { navigation } = this.props;
    const { batchData, selectedItemID, selectedIndex } = this.state;
    if (batchData) {
      const depth = batchData.nodeDepth;
      const name = i18n.t(`node.names.${['stage', 'operation', 'action'][depth - 1]}`, { count: 1 });
      const headers = [
        { caption: i18n.t('nodeSelect.header.id'), source: 'procID', flex: 1 },
        { caption: i18n.t('nodeSelect.header.name', { name }), source: 'name', flex: 2 },
        { caption: i18n.t('nodeSelect.header.notes'), source: 'notes', flex: 4 },
      ];
      const level = i18n.t(`node.names.${['stage', 'operation', 'action'][depth - 1]}`, { count: 2 });
      const prompt = i18n.t('screens.nodeSelect.prompt', { name: level });
      return (
        <View style={{ flex: 1 }}>
          <ButtonBar justify="space-between">
            <RoundedButton
              backColor={NexaColours.GreyUltraLight}
              title={i18n.t('button.captions.cancel')}
              onPress={() => {
                navigation.replace('BatchList');
              }}
            />
            <RoundedButton
              backColor={NexaColours.AlertGreen}
              title={i18n.t('button.captions.select')}
              onPress={this.selectClicked}
              disabled={selectedItemID === 0}
            />
          </ButtonBar>
          <TextBar backColor={NexaColours.Cyan}>{prompt}</TextBar>
          <ScrollList
            headers={headers}
            data={batchData.nodes}
            selectedIndex={selectedIndex}
            onPress={this.rowClicked}
          />
        </View>
      );
    }
    return null;
  }
}
