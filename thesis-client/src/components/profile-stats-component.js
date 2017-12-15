import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { appColors, appColorsTransparency } from "../constants";


const ProfileStats = ({ sessions }) => {

  const total = sessions.reduce((prev, current, i, a) => {
    prev.total_time = (prev.total_time || 0) + Number(current.time);
    prev.total_distance = (prev.total_distance || 0) + Number(current.distance);
    prev.total_calories = (prev.total_calories || 0) + Number(current.distance) * 40;
    if (i === a.length - 1) {
      prev.total_sessions = a.length;
      prev.average_time = prev.total_time / a.length;
      prev.average_distance = prev.total_distance / a.length;
      prev.average_calories = prev.total_calories / a.length;
    }
    return prev;
  }, {});

  if (String(total.total_distance)[0] === '0') {
    total.total_distance = total.total_distance.substring(1);
  }
  if (String(total.total_time)[0] === '0') {
    total.total_time = total.total_time.substring(1);    
  }
  return  (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTextLeft}>Total</Text>
        <Text style={styles.headerTextRight}>Average</Text>
      </View>
      <View style={styles.allStatsContainer}>
        <View style={styles.statsContainerDistance}>
          <View style={styles.labelContainer}>
            <Text style={styles.textBox}>
              {total.total_distance || 0}
            </Text>
          </View>
          <View style={styles.labelContainer}>
            <View style={styles.profilePicWrap}>
              <Image
                style={styles.distancePic}
                source={require("../assets/stats-icons/totaldistance.png")} 
              />
            </View>
            <Text style={styles.text}>Distance</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.textBox}>
              {total.average_distance || 0}
            </Text>
          </View>
        </View>
        <View style={styles.statsContainerCalories}>
          <View style={styles.labelContainer}>
            <Text style={styles.textBox}>
              {total.total_calories || 0}
            </Text>
          </View>
          <View style={styles.labelContainer}>
            <View style={styles.profilePicWrap}>
              <Image
                style={styles.caloriesPic} 
                source={require("../assets/stats-icons/totalcalories.png")} 
              />
            </View>
            <Text style={styles.text}>Calories</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.textBox}>
              {total.average_calories || 0}
            </Text>
          </View>
        </View>
        <View style={styles.statsContainerTime}>
          <View style={styles.labelContainer}>
            <Text style={styles.textBox}>
              {total.total_time || 0}
            </Text>
          </View>
          <View style={styles.labelContainer}>
            <View style={styles.profilePicWrap}>
              <Image
                style={styles.timePic}
                source={require("../assets/stats-icons/totaltime.png")}
              />
            </View>
            <Text style={styles.text}>Time</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.textBox}>
              {total.average_time || 0}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePicWrap: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 16,
  },
  distancePic: {
    flex: 1,
    width: null,
    alignSelf: "stretch",
    borderRadius: 40,
    borderColor: appColors.begonia,
    borderWidth: 3,
  },
  caloriesPic: {
    flex: 1,
    width: null,
    alignSelf: "stretch",
    borderRadius: 40,
    borderColor: appColors.citrine,
    borderWidth: 3,
  },
  timePic: {
    flex: 1,
    width: null,
    alignSelf: "stretch",
    borderRadius: 40,
    borderColor: appColors.aquamarine,
    borderWidth: 3,
  },
  allStatsContainer: {
    flex: 9,
    alignItems: "stretch",
    justifyContent: "center",
  },
  labelContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: appColorsTransparency(0.1).spanishBlue,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "white",
    borderTopColor: "white",
  },
  headerTextLeft: {
    marginLeft: 30,
    fontSize: 35,
    color: "white",
    fontFamily: Platform.OS === 'ios' ? 'GurmukhiMN' : null,
  },
  headerTextRight: {
    marginRight: 10,
    fontSize: 35,
    color: "white",
    fontFamily: Platform.OS === 'ios' ? 'GurmukhiMN' : null,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: appColorsTransparency(1).navyBlue,
  },
  statsContainerDistance: {
    flex: 1,
    flexDirection: 'row',
    borderColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: appColorsTransparency(0.45).spanishBlue,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "white",
  },
  statsContainerCalories: {
    flex: 1,
    flexDirection: 'row',
    borderColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: appColorsTransparency(0.45).spanishBlue,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "white",
  },
  statsContainerTime: {
    flex: 1,
    flexDirection: 'row',
    borderColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: appColorsTransparency(0.45).spanishBlue,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "white",
  },
  textBox: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    paddingTop: 8,
    color: 'white',
    fontSize: 18,
  },
});

ProfileStats.propTypes = {
  //eslint-disable-next-line
  sessions: PropTypes.array.isRequired,
};

export default ProfileStats;
