import React from 'react';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Platform, View, Image, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Rating from 'react-native-rating';
import mapIcon from '../assets/icons/mapIcon.png';
import { appColors, appColorsTransparency } from '../constants';

const starIcons = {
  filled: require('../assets/icons/star_filled.png'),
  unfilled: require('../assets/icons/star_unfilled.png'),
};

const HeartIcon = () => (
  <Ionicons
    name="ios-heart"
    size={35}
    style={{color: appColors.citrine}}
  />
);

const TrashIcon = () => (
  <Ionicons
    name="ios-trash"
    size={35}
    style={{color: appColors.begonia}}
  />
);

const BackgroundHeartIcon = ({ favorite }) => (
  <Ionicons
    name="ios-heart"
    size={40}
    style={{
      color: appColorsTransparency(1).lightBlue, position: 'absolute', right: 2, top: 1, margin: -4,
    }}
  />
);

const ProfileRoutes = ({
  routes, showTripLocation, navigate, deleteUserRoute, user,
}) => {
  const goToMap = () => {
    navigate('Map');
  };
  return routes.map((trip, i) => (
    // eslint-disable-next-line
    <ImageBackground
      key={trip.id}
      style={{}}
      source={trip.photo_url ? { uri: trip.photo_url } : require('../assets/images/default.jpg')}
    >
      <View
        style={styles.container}
        key={trip.id}
      >
        <TouchableOpacity
          onPress={() => deleteUserRoute(user.id, trip.id)}
        >
          <TrashIcon />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{trip.display_name}</Text>
          <Text style={styles.startingAddress}>{trip.route_name}</Text>
          <View style={styles.subtitle}>
            <Rating
              initial={Math.floor(trip.current_rating)}
              selectedStar={starIcons.filled}
              unselectedStar={starIcons.unfilled}
              maxScale={1.4}
              starStyle={{
                width: 17,
                height: 17,
              }}
              editable={false}
            />
          </View>
        </View>
        <View style={styles.actionContainer}>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => showTripLocation(trip, goToMap)}
            >
              <Image
                source={
                  trip.route_preview ?
                    { uri: trip.route_preview } :
                    mapIcon
                }
                showIcon
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.favoriteContainer}>
            <BackgroundHeartIcon />
            <HeartIcon />
            <Text style={styles.favoriteCount}>{trip.favorite_count}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
));
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: 157,
    borderWidth: StyleSheet.hairlineWidth,
  },
  textContainer: {
    flex: 5,
    borderRadius: 2,
    padding: 5,
    margin: 10,
    backgroundColor: appColorsTransparency(0.7).navyBlue,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: appColors.transparent,
    color: appColors.lightBlue,
    textAlign: 'left',
    fontFamily: Platform.OS === 'ios' ? 'GurmukhiMN-Bold' : null,
  },
  startingAddress: {
    marginTop: 3,
    fontSize: 15,
    backgroundColor: appColors.transparent,
    color: appColors.lightBlue,
    textAlign: 'left',
  },
  subtitle: {
    marginTop: 3,
    backgroundColor: appColors.transparent,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 148,
    width: 50,
    backgroundColor: appColors.transparent,
  },
  actionContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 9,
    borderRadius: 100,
    paddingTop: 5,
    backgroundColor: appColors.transparent,
  },
  favoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainerText: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: appColors.navyBlue,
    marginTop: 30,
  },
  imageStyle: {
    alignSelf: 'center',
    marginTop: 5,
    height: 75,
    width: 75,
  },
  favoriteCount: {
    position: 'absolute',
    paddingLeft: 10,
    paddingTop: 6,
    paddingBottom: 10,
    paddingRight: 10,
    fontSize: 10,
    color: appColors.lightBlue,
    textAlign: 'left',
    fontWeight: 'bold',
  },
});

ProfileRoutes.propTypes = {
  navigate: PropTypes.func.isRequired,
  showTripLocation: PropTypes.func.isRequired, 
  //eslint-disable-next-line
  routes: PropTypes.array.isRequired,
};

export default ProfileRoutes;
