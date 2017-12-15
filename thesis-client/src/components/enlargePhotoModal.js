import React from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Image,
  Easing,
  ActivityIndicator,
  Alert,
  TextInput
} from "react-native";
import { LinearGradient } from "expo";
import Modal from "react-native-modal";
import Rating from "react-native-rating";
import PropTypes from "prop-types";
import { appColors } from "../constants";
import AddPhoto from "./addPhotoButton";

const buttonColor = appColors.aquamarine;

const PhotoModal = ({
  visibleModal,
  photo,
  share,
  saveTrip,
  cancelTrip,
  googleMapImage,
  tripName,
  tripData,
  speedCounter,
  avgSpeed,
  rating,
  closeModal,
  openRatingModal,
  setRating,
  starIcons,
  getImage,
  imageBase64,
  routeName,
  getRouteName
}) => {
  console.log(photo);
  return (
    <View>
      <Modal
        isVisible={visibleModal === 1}
        backdropOpacity={0.7}
        backdropColor={appColors.logoBlue}
      >
        <View style={styles.modalContent}>
          <LinearGradient
            colors={["rgba(0,96,255,0.02)", "transparent"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 600,
            }}
          />
          <View style={styles.modalBody}>
            <View style={styles.imageContainer}>
              <View style={styles.imageInnerContainer}>
                <Image style={styles.image} source={{uri: photo}} />
              </View>
            </View>
          </View>
          <View style={styles.buttons}>
            <View style={styles.buttonLeft}>
              <Button
                onPress={() => {
                  closeModal();
                }}
                title="Close"
                color={buttonColor}
              />
            </View>
            <View style={styles.buttonRight}>
              <Button
                onPress={() => {
                  share();
                }}
                title="Share"
                color={buttonColor}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    backgroundColor: "rgba(0,0,0,0)",
    color: appColors.lightBlue,
    fontSize: 25,
    paddingBottom: 10,
    fontWeight: "bold",
    textAlign: "center"
  },
  paragraph: {
    backgroundColor: "rgba(0,0,0,0)",
    padding: 15
  },
  text: {
    color: appColors.lightBlue,
    fontSize: 18,
    textAlign: "center"
  },
  modalContent: {
    backgroundColor: appColors.navyBlue,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalBody: {
    backgroundColor: "rgba(0,0,0,0)",
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    flexDirection: "row"
  },
  image: {
    zIndex: 1,
    width: 320  ,
    height: 330,
    borderRadius: 6,
    borderWidth: 4,
    borderColor: appColors.logoBlue
  },
  imageLoading: {
    position: "absolute",
    zIndex: 0,
    width: 340,
    height: 330,
    justifyContent: "center",
    alignItems: "center"
  },
  imageInnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  ratingContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0)"
  },
  rating: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 5
  },
  addPhotoContainer: {
    // flexDirection: "row"
  },
  addPhoto: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5
  },
  buttons: {
    flexDirection: "row",
    alignItems: "stretch",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(104, 146, 179, 0.25)"
  },
  buttonRight: {
    flex: 2,
    backgroundColor: "rgba(0,0,0,0)",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(104, 146, 179, 0.25)"
  },
  buttonLeft: {
    flex: 2,
    backgroundColor: "rgba(0,0,0,0)",
    paddingHorizontal: 22,
    paddingVertical: 10
  },
  routeNameInput: {
    textAlign: "center",
    height: 40,
    width: 225,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    color: "white",
    fontSize: 25
  }
});

const mapImage = googleMapImage => (
  <Image style={styles.image} source={{ uri: googleMapImage }} />
);

const loadingImage = () => (
  <View style={styles.imageLoading}>
    <ActivityIndicator size="large" color={appColors.begonia} />
  </View>
);

PhotoModal.propTypes = {
  visibleModal: PropTypes.number,
  closeModal: PropTypes.func.isRequired,
};

PhotoModal.defaultProps = {
  visibleModal: null,
};

export default PhotoModal;
