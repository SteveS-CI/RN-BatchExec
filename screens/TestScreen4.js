import React from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";
import { Video } from 'expo';
import ButtonStyles from "../constants/ButtonStyles";
import ActionButtons from "../components/ActionButtons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default class TestScreen4 extends React.Component {

  static navigationOptions = {
    title: "Video Test"
  };

  onPress = name => {
    if (name === "cancel") this.props.navigation.navigate("Dev");
  };

  render() {
    const { width } = Dimensions.get("window");
    return (
      <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start' }}>
        <ActionButtons onPress={this.onPress} />
        <View style={styles.container}>
          <Text style={{ textAlign: "center" }}> React Native Video </Text>
          <Video
            source={{uri: "http://192.168.1.96:8080/api/File/Image?name=mini_hopper_flow.mp4"}}
            posterSource = {{uri: "http://192.168.1.96:8080/api/File/Image?name=video_loading.jpg"}}
            shouldPlay
            resizeMode="contain"
            style={{ width, height: 300 }}
            useNativeControls
            usePoster
            isLooping
          />
        </View>
      </View>
    );
  }
}
