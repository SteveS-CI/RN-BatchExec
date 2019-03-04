import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationContainer } from 'react-navigation';
import {
  StyleSheet, ScrollView, View, KeyboardAvoidingView,
} from 'react-native';
import RoundedButton from '../components/RoundedButton';
import ActionButtons from '../components/ActionButtons';
import ButtonStyles from '../constants/ButtonStyles';
import NexaColours from '../constants/NexaColours';
import FileContent from '../components/FileContent';
import ActionImage from '../components/ActionImage';
import TextBar from '../components/TextBar';
import ActionTitle from '../components/ActionTitle';
import ActionPrompt from '../components/ActionPrompt';
import ActionEntry from '../components/ActionEntry';
import Signature from '../components/Signature';
import Comments from '../components/Comments';
import { methods } from '../api/api';
import ComponentList from '../components/ComponentList';

const LongList = [
  'The',
  'Quick',
  'Brown',
  'Fox',
  'Jumps',
  'Over',
  'The',
  'Lazy',
  'Dog',
  'The',
  'Quick',
  'Brown',
  'Fox',
  'Jumps',
  'Over',
  'The',
  'Lazy',
  'Dog',
  'The',
  'Quick',
  'Brown',
  'Fox',
  'Jumps',
  'Over',
  'The',
  'Lazy',
  'Dog',
  'The',
  'Quick',
  'Brown',
  'Fox',
  'Jumps',
  'Over',
  'The',
  'Lazy',
  'Dog',
];

const stringEntry1 = {
  entryType: 'String',
};

const stringEntry2 = {
  label: 'Label',
  entryType: 'String',
};

const stringEntry3 = {
  suffix: 'Suffix',
  entryType: 'String',
};

const stringEntry4 = {
  label: 'Label',
  suffix: 'Suffix',
  entryType: 'String',
};

const distinctEntry1 = {
  entryType: 'Distinct',
  validation: {
    choices: [
      'One', 'Two', 'Three',
    ],
  },
};

const distinctEntry2 = {
  label: 'Weight',
  entryType: 'Distinct',
  validation: {
    choices: [
      'First', 'Second', 'Third',
    ],
  },
};

const distinctEntry3 = {
  suffix: 'Kg',
  entryType: 'Distinct',
  validation: {
    choices: LongList,
  },
};

const distinctEntry4 = {
  label: 'Weight',
  suffix: 'Kg',
  entryType: 'Distinct',
  validation: {
    choices: [
      '250', '275', '300',
    ],
  },
};

const styles = StyleSheet.create(
  {
    textBar: {
      borderColor: NexaColours.Black,
      borderWidth: StyleSheet.hairlineWidth * 2,
    },
  },
);

export default class TestScreen extends Component {
  static navigationOptions = {
    title: 'Test Screen',
  }

  static propTypes = {
    navigation: PropTypes.instanceOf(NavigationContainer).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      value: '123',
      distinctValue: '3',
      signing: false,
      approving: false,
      commenting: false,
      pickerValue: 'Original',
      comps: null,
      showComps: false,
    };
  }

  componentDidMount() {
  }

  onPress = (name) => {
    const { navigation } = this.props;
    if (name === 'cancel') navigation.navigate('Dev');
    if (name === 'components') {
      methods.getComponents(12345, 23456).then((data) => {
        this.setState({ comps: data, showComps: true });
      });
    }
  }

  onSign = (sign, token, comment) => {
    this.setState({ signing: false, approving: false });
  }

  onComment = (valid, comments) => {
    console.log('onComment', comments);
    this.setState({ commenting: false });
  }

  pickerChange = (value) => {
    this.setState({ pickerValue: value });
  }

  render() {
    const buttons = [ButtonStyles.Previous, ButtonStyles.No, ButtonStyles.Yes, ButtonStyles.Components];
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <ActionTitle text="The Action Name" />
        <ActionButtons onPress={this.onPress} buttons={buttons} />
        <KeyboardAvoidingView behavior="position" enabled style={{ flex: 1 }}>
          <ScrollView style={{ flexDirection: 'column' }}>
            <ActionPrompt prompt="This is the text of an action prompt" notes="This is the text for optional action notes" />
            <RoundedButton title="Sign Test" onPress={() => this.setState({ signing: true })} />
            <RoundedButton title="Approval Test" onPress={() => this.setState({ approving: true })} />
            <RoundedButton title="Comment Test" onPress={() => this.setState({ commenting: true })} />
            <View>
              <ActionEntry value={this.state.value} entry={stringEntry1} onChange={value => this.setState({ value })} />
              <ActionEntry value={this.state.value} entry={stringEntry2} onChange={value => this.setState({ value })} />
              <ActionEntry value={this.state.value} entry={stringEntry3} onChange={value => this.setState({ value })} />
              <ActionEntry value={this.state.value} entry={stringEntry4} onChange={value => this.setState({ value })} />
              <ActionEntry value={this.state.distinctValue} entry={distinctEntry1} onChange={distinctValue => this.setState({ distinctValue })} enabled />
              <ActionEntry value={this.state.distinctValue} entry={distinctEntry2} onChange={distinctValue => this.setState({ distinctValue })} enabled />
              <ActionEntry value={this.state.distinctValue} entry={distinctEntry3} onChange={distinctValue => this.setState({ distinctValue })} enabled />
              <ActionEntry value={this.state.distinctValue} entry={distinctEntry4} onChange={distinctValue => this.setState({ distinctValue })} enabled />
            </View>
            <ComponentList components={this.state.comps} visible={this.state.showComps} onDismiss={() => this.setState({ showComps: false })} />
            <ActionImage fileName="setup.jpg" />
            <ActionImage fileName="db_Russell_Sieve1.jpg" />
            <FileContent fileName="General05.txt" backColor={NexaColours.BlueAccent} />
            <TextBar style={styles.textBar} backColor={NexaColours.Black}>Black (Not Nexa)</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.GreyDarkest}>Darkest Grey (not a true Nexa colour)</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.GreyDark}>Dark Grey</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.Grey}>Grey</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.GreyAccent}>Grey Accent</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.GreyLight}>Light Grey</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.GreyUltraLight}>Ultra-Light Grey</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.White}>White (Not Nexa)</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.Blue}>Blue</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.Cyan}>Cyan</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.AlertGreen}>Green</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.AlertOrange}>Orange</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.AlertRed}>Red</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.AlertYellow}>Yellow</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.BlueAccent}>Blue Accent</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.CyanAccent}>Cyan Accent</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.GreenAccent}>Green Accent (Not Nexa)</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.OrangeAccent}>Orange Accent (Not Nexa)</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.RedAccent}>Red Accent (Not Nexa)</TextBar>
            <TextBar style={styles.textBar} backColor={NexaColours.YellowAccent}>Yellow Accent (Not Nexa)</TextBar>
            <Signature visible={this.state.signing} onSign={this.onSign} isApproval={false} title="This Action requires a signature" />
            <Signature visible={this.state.approving} onSign={this.onSign} isApproval title="This Action requires approval" />
            <Comments visible={this.state.commenting} onComment={this.onComment} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
