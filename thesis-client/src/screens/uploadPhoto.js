import React from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import Exponent, { Constants, ImagePicker, registerRootComponent } from "expo";

export default class App extends React.Component {
  state = {
    image: null,
    uploading: false,
    imageBase64: null,
  };

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 50,
          borderRadius: 3,
          elevation: 2,
          shadowColor: "rgba(0,0,0,1)",
          shadowOpacity: 0.2,
          shadowOffset: { width: 4, height: 4 },
          shadowRadius: 5,
        }}
      >
        <TouchableHighlight
          onPress={() => this._share()}
        >
          <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />
        </TouchableHighlight>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: 'New Route on BIKE MAP NOLA!',
      title: "Check out this photo",
      url: this.state.image,
    });
  };

  _takePhoto = async () => {
    let imageTaken = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    this._handleImagePicked(imageTaken);
  };

  _pickImage = async () => {
    let imagePicked = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    this._handleImagePicked(imagePicked);
  };

  _handleImagePicked = async imageResult => {    
    try {
      this.setState({ uploading: true });

      if (!imageResult.cancelled) {
        this.setState({ image: imageResult.uri, imageBase64: imageResult.base64 });
      }
    } catch (e) {
      console.log({ e });
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false });
    }
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 20,
            textAlign: "center",
            marginHorizontal: 15,
          }}
        />
        <Button
          onPress={this._pickImage}
          title="Upload Photo"
        />
        <Button onPress={this._takePhoto} title="Take Photo" />

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}

        <StatusBar barStyle="default" />
      </View>
    );
  }
}