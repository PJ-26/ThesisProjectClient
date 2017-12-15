import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import HomeStack from './home-stack';
import MapStack from './map-stack';
import ProfileStack from './profile-stack';
import FavoriteStack from './favorite-stack';
import { appColors } from '../constants';

const tabBarHomeIcon = ({ tintColor, focused }) => (
  <Ionicons
    name={focused ? 'ios-home' : 'ios-home-outline'}
    size={26}
    style={{ color: tintColor }}
  />
);

const tabBarMapIcon = ({ tintColor, focused }) => (
  <Ionicons
    name={focused ? 'ios-map' : 'ios-map-outline'}
    size={26}
    style={{ color: tintColor }}
  />
);

const tabBarProfileIcon = ({ tintColor, focused }) => (
  <Ionicons
    name={focused ? 'ios-person' : 'ios-person-outline'}
    size={26}
    style={{ color: tintColor }}
  />
);

const tabBarFavoriteIcon = ({ tintColor, focused }) => (
  <Ionicons
    name={focused ? 'ios-heart' : 'ios-heart-outline'}
    size={26}
    style={{ color: tintColor }}
  />
)

const RootNavigator = TabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: tabBarHomeIcon,
      },
    },
    Favorite: {
      screen: FavoriteStack,
      navigationOptions: {
        tabBarLabel: 'Favorites',
        tabBarIcon: tabBarFavoriteIcon,
      },
    },
    Map: {
      screen: MapStack,
      navigationOptions: {
        tabBarLabel: 'Map',
        tabBarIcon: tabBarMapIcon,
      },
    },        
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: tabBarProfileIcon,
      }
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: appColors.begonia,
      activeBackgroundColor: appColors.navyBlue,
      inactiveTintColor: appColors.aquamarine,
      inactiveBackgroundColor: appColors.navyBlue,
      labelStyle: {
        fontSize: 13,
      },
      style: {
        // Currently there is no great way to center two tab icons, so we do
        // it manually here by assuming that each tab icon is about 125 points wide
        paddingHorizontal: (Dimensions.get('window').width - 325) / 4,
        backgroundColor: appColors.navyBlue,
        height: 55,
      },
    },
  }
);

tabBarHomeIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
  focused: PropTypes.string.isRequired,
};

tabBarMapIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
  focused: PropTypes.string.isRequired,
};

tabBarProfileIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
  focused: PropTypes.string.isRequired,
};

tabBarFavoriteIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
  focused: PropTypes.string.isRequired,
};

export default RootNavigator;
