import React from "react";
import { View, Text } from "react-native";
import i18n from 'i18n-js'
import NexaColours from "../constants/NexaColours";
import ButtonBar from '../components/ButtonBar'
import RoundedButton from "../components/RoundedButton";
import TextBar from '../components/TextBar'
import ScrollList from '../components/ScrollList'
import { methods } from '../api/api'
import {CheckNav, NavResult} from '../Utils/utils'

export default class NodeSelectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      batchData: null,
      selectedIndex: -1,
      selectedItemID: 0,
      loading: false
    };
  }

  static navigationOptions = ({navigation}) => {
    const batchData = navigation.getParam("batchData")
    var name = 'default'
    if (batchData) {
      const nodeDepth = batchData.nodeDepth
      name = NodeSelectScreen.nodeName(nodeDepth, false)
    }
    return {
      title: i18n.t('screens.nodeSelect.title', {name}),
      headerLeft: null
    }
  };

  static nodeName(depth, plural) {
    const count = plural ? 2 : 1
    const nodeName = i18n.t('node.names.' + ['','stage','operation','action'][depth], {count})
    return nodeName
  }

  componentDidMount() {
    const batchData = this.props.navigation.getParam("batchData")
    const locationCode = this.props.navigation.getParam("locationCode")
    this.locationCode = locationCode
    this.setState({ batchData })
  }

  rowClicked = (index, node) => {
    this.node = node;
    this.setState({
      selectedItemID: node.procID,
      selectedIndex: index
    });
  };

  chooseNav(batchData) {
    const nav = this.props.navigation
    const result = CheckNav(batchData, nav, this.locationCode)
    switch (result) {
      case NavResult.BATCH_COMPLETE:
        Alert.alert('Batch Complete', 'Batch is complete, select another batch')
        nav.replace('BatchList', { refresh: true })
        break
      case NavResult.STAGE_COMPLETE:
        Alert.alert('Stage Complete', 'Stage is complete, select another batch\nor move to another location.')
        nav.replace('BatchList', { refresh: true })
        break
      case NavResult.ACTION:
        //this.batchData = batchData
        //this.procID = batchData.nodes[0].procID
        //this.setState({ node: batchData.nodes[0], loading: false, value: null })
        nav.replace("ActionDetail", { batchData, locationCode: this.locationCode })
        break
      case NavResult.CHOICE:
        nav.replace("NodeSelect", { batchData, locationCode: this.locationCode })
        break
      case NavResult.CONFIRM:
        nav.replace("NodeDetail", { batchData, locationCode: this.locationCode })
        break
      case NavResult.EXECUTE:
        this.batchData = batchData
        this.procID = batchData.nodes[0].procID
        this.completeAction('Y')
        break
      default:
    }
  }

  selectClicked = () => {
    if (this.node) {
      const nav = this.props.navigation;
      // set loading prior to request
      this.setState({ loading: true });
      const postData = {
        batchID: this.state.batchData.batchID,
        procID: this.state.selectedItemID,
        location: this.locationCode
      }
      methods.nextProc(postData)
        .then(data => {
          this.setState({ loading: false });
          this.chooseNav(data)
          // const batchData = data;
          // // depending on data shape, navigate to the appropriate screen, passing batchData
          // if (batchData.nodes.length > 1) {
          //   // Multiple nodes; stay on this screen
          //   this.setState({ batchData, selectedItemID: 0, selectedIndex: -1 })
          //   nav.replace("NodeSelect", { batchData, locationCode: this.locationCode });
          // } else {
          //   // Single node
          //   if (batchData.nodeDepth === 3) {
          //     // Action node
          //     nav.navigate("ActionDetail", { batchData, locationCode: this.locationCode });
          //   } else {
          //     // Operation/Stage/Process - for Confirmation/Signature/Approval
          //     nav.navigate("NodeDetail", { batchData, locationCode: this.locationCode });
          //   }
          // }
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
    if (batchData) {
      const depth = this.state.batchData.nodeDepth
      const name = i18n.t('node.names.' + ['stage', 'operation', 'action'][depth - 1], {count: 1})
      const headers = [
        { caption: i18n.t('nodeSelect.header.id'), source: "procID", flex: 1 },
        { caption: i18n.t('nodeSelect.header.name', {name}), source: "name", flex: 2 },
        { caption: i18n.t('nodeSelect.header.notes'), source: "notes", flex: 4 }
      ]
      const level = i18n.t('node.names.' + ['stage', 'operation', 'action'][depth - 1], {count: 2})
      const prompt = i18n.t('screens.nodeSelect.prompt', {name: level})
      return (
        <View style={{ flex: 1}}>
          <ButtonBar justify="space-between">
            <RoundedButton
              backColor={NexaColours.GreyUltraLight}
              title={i18n.t('button.captions.cancel')}
              onPress={() => {
                nav.replace("BatchList");
              }}
            />
            <RoundedButton
              backColor={NexaColours.AlertGreen}
              title={i18n.t('button.captions.select')}
              onPress={this.selectClicked}
              disabled={this.state.selectedItemID == 0}
            />
          </ButtonBar>
          <TextBar backColor={NexaColours.Cyan}>{prompt}</TextBar>
          <ScrollList
            headers={headers}
            data={batchData.nodes}
            selectedIndex={this.state.selectedIndex}
            onPress={this.rowClicked}
          />
        </View>
      )
    } else {
      return null
    }
  }
}
