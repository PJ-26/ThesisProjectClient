import React from 'react';
import { Platform, View, Image, ImageBackground, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Rating from 'react-native-rating';
import mapIcon from '../assets/icons/mapIcon.png';
import { appColors, appColorsTransparency } from '../constants';

const starIcons = {
  filled: require('../assets/icons/star_filled.png'),
  unfilled: require('../assets/icons/star_unfilled.png'),
};

const HeartIcon = ({favorite}) => (
  <Ionicons
    name="ios-heart"
    size={35}
    style={favorite ? { color: appColors.begonia } : {color: appColors.logoBlue}}
  />
);

const BackgroundHeartIcon = ({favorite}) => (
  <Ionicons
    name="ios-heart"
    size={40}
    style={favorite ?
      {
        color: appColorsTransparency(1).lightBlue, position: 'absolute', right: 2, top: 1, margin: -4,
      } :
      {
        color: appColorsTransparency(1).midLightBlue, position: 'absolute', right: 2, top: 1, margin: -4,
      }
    }
  />
);

const Trip = ({
   navigate, trips, showTripLocation, addFavorite, user, favorites, deleteFavorite,
}) => {
  const goToMap = () => {
    navigate('Map');
  };

  const favoriteId = favorites.reduce((prev, current) => {
    prev[current.id] = true;
    return prev;
  }, {});
  const createTrip = () => trips.map((trip, index) => {
    const {
      photo_url,
      id,
      route_name,
      current_rating,
      display_name,
      route_preview,
    } = trip;
    let { favorite_count } = trip;

    let action = favoriteId[id] ? () => { trips[index].favorite_count -= 1; deleteFavorite(user.id, id); } : () => { trips[index].favorite_count += 1; addFavorite(user.id, id); };
    return (
      <ImageBackground
        key={id}
        style={{}}
        source={photo_url ? { uri: photo_url } : require('../assets/images/default.jpg')}
      >
        <View
          style={styles.container}
          key={id}
        >
          <View style={styles.textContainer}>
            <Text style={styles.title}>{display_name}</Text>
            <Text style={styles.startingAddress}>{route_name}</Text>
            <View style={styles.subtitle}>
              <Rating
                initial={Math.floor(current_rating)}
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
                    route_preview ?
                    { uri: route_preview} :
                    mapIcon
                  }
                  showIcon
                  style={styles.imageStyle}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.favoriteContainer}>
              <TouchableOpacity
                onPress={action}
              >
                <BackgroundHeartIcon
                  favorite={favoriteId[id]}
                />
                <HeartIcon
                  favorite={favoriteId[id]}
                />
              </TouchableOpacity>
              <Text style={styles.favoriteCount}>{favorite_count}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  });

  return <View>{createTrip()}</View>;
};

Trip.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  navigate: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
  trips: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showTripLocation: PropTypes.func.isRequired,
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
    height: 148,
    width: 50,
    backgroundColor: appColors.transparent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContainer: {
    flex: 2,
    margin: 9,
    borderRadius: 100,
    paddingTop: 5,
    backgroundColor: appColors.transparent,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderColor: appColors.spanishBlue,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
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

export default Trip;

