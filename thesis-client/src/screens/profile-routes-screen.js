import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";
import { getUserRoutes, getUserSessions, removeUserTrip } from "../actions/getUserInfo-action";
import { getActiveTrip } from "../actions/activeTrip-action";
import { appColors } from '../constants';
import ProfileRoutes from "../components/profile-routes-component";

const styles = StyleSheet.create({
  wrapper: {},
  header: {
    height: 38,
    // padding: 10,
    // paddingTop: 25,
    backgroundColor: appColors.navyBlue,
  },
  headerText: {
    paddingBottom: 6,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: appColors.midLightBlue,
  },
  back: {
    color: appColors.aquamarine,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

class ProfileRoutesScreen extends Component {
  static propTypes = {
    showTripLocation: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired,
    getUserRoutes: PropTypes.func.isRequired,
    deleteUserRoute: PropTypes.func.isRequired,
    //eslint-disable-next-line
    user: PropTypes.object.isRequired,
    // eslint-disable-next-line
    sessions: PropTypes.array.isRequired,
    // eslint-disable-next-line
    routes: PropTypes.array.isRequired
  };

  static navigationOptions = {
    title: "Routes",
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerBackTitleStyle: styles.back,
  };

  componentWillMount() {
    this.props.getUserRoutes(this.props.user.id);
  }

  render() {
    return (
      <View>
        <ScrollView>
          <ProfileRoutes
            user={this.props.user}
            deleteUserRoute={this.props.deleteUserRoute}
            routes={this.props.routes}
            navigate={this.props.navigation.navigate}
            showTripLocation={this.props.showTripLocation}
          />
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    routes: state.userRoutes.routes,
    sessions: state.userSessions.sessions
  };
}

const mapDispatchToProps = dispatch => ({
  showTripLocation: (trip, cb) => {
    dispatch(getActiveTrip(trip, cb));
  },
  getUserSessions: userId => {
    dispatch(getUserSessions(userId));
  },
  getUserRoutes: userId => {
    dispatch(getUserRoutes(userId));
  },
  deleteUserRoute: (userId, routeId) => {
    dispatch(removeUserTrip(userId, routeId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileRoutesScreen);
