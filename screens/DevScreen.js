import React, { PureComponent } from "react";
import { View, ScrollView, Button, StyleSheet, ToastAndroid } from "react-native";
import Settings from "../Store/Settings";
import NexaColours from "../constants/NexaColours";
import ButtonBar from "../components/ButtonBar";
import RoundedButton from "../components/RoundedButton";
import { methods } from "../api/api";

const styles = StyleSheet.create({
  button: {
    margin: 8,
    padding: 8,
    backgroundColor: "red"
  }
});

export default class DevScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.nav = this.props.navigation;
    this.state = {printing: false}
  }

  static navigationOptions = {
    title: "Developer"
  };

  resetHardware = () => {
    methods.resetHardware().then(() => this.nav.navigate("Location"));
  };

  clearCache = () => {
    methods.clearCache().then(() => this.nav.navigate("BatchList"));
  };

  testScreen = () => {
    this.nav.navigate("Test");
  };

  testScreen2 = () => {
    this.nav.navigate("Test2");
  };

  printTest = () => {
    Settings.readObject("location").then(locationObject => {
      if (locationObject) {
        const location = locationObject.code;
        this.setState({printing: true})
        methods
          .testPrint({ location })
          .then(result => {
            this.setState({printing: false})
            ToastAndroid.showWithGravity(result.StatusDescription,ToastAndroid.LONG, ToastAndroid.CENTER);
          })
          .catch(error => {
            this.setState({printing: false})
            alert(JSON.stringify(error));
          });
      }
    });
  };

  testScreen3 = () => {
    this.nav.navigate("Test3");
  };

  testScreen4 = () => {
    this.nav.navigate("Test4");
  };

  testScreen5 = () => {
    this.nav.navigate("Test5");
  };

  testScreen6 = () => {
    this.nav.navigate("Test6");
  };

  update = () => {
    this.props.screenProps.update();
  };

  destroy = () => {
    Settings.deleteSettings();
    this.props.screenProps.refresh();
  };

  render() {
    return (
      <View style={{ flexDirection: "column", flex: 1 }}>
        <ButtonBar justify="space-between">
          <RoundedButton
            backColor={NexaColours.AlertYellow}
            title="Cancel"
            onPress={() => {
              this.nav.navigate("BatchList");
            }}
          />
        </ButtonBar>
        <ScrollView style={{ flexDirection: "column" }}>
          <RoundedButton
            style={styles.button}
            title="Clear Location"
            onPress={() => {
              Settings.removeItem("location").then(() => Expo.Updates.reload());
            }}
          />
          <RoundedButton
            style={styles.button}
            title="Reset Location & Equipment States"
            onPress={this.resetHardware}
          />
          <RoundedButton
            style={styles.button}
            title="Clear Batch Cache"
            onPress={this.clearCache}
          />
          <RoundedButton
            style={styles.button}
            title="Show Test Screen"
            onPress={this.testScreen}
          />
          <RoundedButton
            style={styles.button}
            title="Show Test Screen 2"
            onPress={this.testScreen2}
          />
          <RoundedButton
            style={styles.button}
            title="Print Test"
            onPress={this.printTest}
            backColor={NexaColours.Orange}
            disabled={this.state.printing}
          />
          <RoundedButton
            style={styles.button}
            title="Barcode Reader Test"
            onPress={this.testScreen3}
            backColor={NexaColours.AlertCyan}
          />
          <RoundedButton
            style={styles.button}
            title="WebView Test"
            onPress={this.testScreen4}
            backColor={NexaColours.AlertYellow}
          />
          <RoundedButton
            style={styles.button}
            title="Virtual (keyboard) balance"
            onPress={this.testScreen5}
            backColor={NexaColours.YellowAccent}
          />
          <RoundedButton
            style={styles.button}
            title="Custom Keyboard"
            onPress={this.testScreen6}
          />
          <RoundedButton
            style={styles.button}
            title="Get Updates"
            onPress={this.update}
            backColor={NexaColours.AlertYellow}
          />
          <RoundedButton
            style={styles.button}
            title="Destroy Settings !!!!"
            onPress={this.destroy}
            backColor={NexaColours.AlertRed}
          />
        </ScrollView>
      </View>
    );
  }
}
