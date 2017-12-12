import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import HomeStack from './home-stack';
import MapStack from './map-stack';
import ProfileStack from './profile-stack';
import PhotoStack from './uploadPhotoStack';

const tabBarIcon = ({ tintColor, focused }) => (
  <Ionicons
    name={focused ? 'ios-map' : 'ios-map-outline'}
    size={26}
    style={{ color: tintColor }}
  />
);

const RootNavigator = TabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon,
      }
    },
    Map: {
      screen: MapStack,
      navigationOptions: {
        tabBarLabel: "Map",
        tabBarIcon,
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? "ios-person" : "ios-person-outline"}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    },
    Photo: {
      screen: PhotoStack,
      navigationOptions: {
        tabBarLabel: "Photo",
        tabBarIcon,
      }
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: "#2242CC",
      activeBackgroundColor: "#fff",
      inactiveTintColor: "#000",
      inactiveBackgroundColor: "#fff",
      labelStyle: {
        fontSize: 13
      },
      style: {
        // Currently there is no great way to center two tab icons, so we do
        // it manually here by assuming that each tab icon is about 125 points wide
        paddingHorizontal: (Dimensions.get("window").width - 225) / 2,
        backgroundColor: "#fff",
        height: 55
      }
    }
  }
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
  focused: PropTypes.string.isRequired,
};

export default RootNavigator;
