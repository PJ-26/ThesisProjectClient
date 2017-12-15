import jwtDecode from 'jwt-decode';
import { Alert } from 'react-native';
import { Location, Permissions } from 'expo';
import Polyline from '@mapbox/polyline';
import { all, call, put, takeEvery, takeLatest, take, fork, cancel } from 'redux-saga/effects';
import { dbPOST, dbSecureGET, dbSecurePOST, dbSecureDELETE } from '../utilities/server-calls';
import { storeItem } from '../utilities/async-storage';
import {
  getRedirectUrl,
  facebookAuth,
  googleDirectionsCall,
  getGoogleRouteImage,
  getSmallGoogleRouteImage,
} from '../utilities/api-calls';
import {
  INITIATE_LOGIN_DEMO,
  INITIATE_LOGIN,
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  STORAGE_KEY,
  ENABLE_LOGIN,
  DISABLE_LOGIN,
  CREATE_TRIP,
  CREATE_TRIP_SAVE,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_FAILED,
  CREATE_TRIP_CANCELLED,
  RETRIEVED_MAP_IMAGE,
  RETRIEVED_TRIP_DATA,
  SAVE_SESSION,
  SAVE_SESSION_SUCCESS,
  SAVE_SESSION_FAILED,
  demoUser,
  GET_TRIPS_SUCCESS,
  GET_USER_LOCATION_SUCCESS,
  GET_USER_LOCATION_FAILED,
  UPDATE_MAP_REGION,
  UPDATE_ROUTE_COORDS,
  GET_USER_TRIPS_SUCCESS,
  GET_USER_SESSIONS_SUCCESS,
  GET_TRIPS,
  GET_USER_TRIPS,
  GET_USER_SESSIONS,
  GET_DIRECTIONS,
  GET_USER_LOCATION,
  POST_FAVORITE,
  GET_USER_FAVORITES_SUCCESS,
  GET_USER_FAVORITES,
  REMOVE_FAVORITE,
  DELETE_USER_TRIP,
  } from '../constants';
import { GOOGLE_API_KEY } from '../../config';

const authorizeUser = function* (params) {
  const redirectUrl = getRedirectUrl;
  try {
    yield put({ type: DISABLE_LOGIN });

    const { type, params: { code, error } } = params.type === INITIATE_LOGIN ? yield call(facebookAuth, redirectUrl) : { type: "success", params: { code: demoUser, error: null } };

    if (type === 'success' && !error) {
      // ! Quick hack to make loader run, probably should fix later
      yield put({ type: ENABLE_LOGIN });
      yield put({ type: DISABLE_LOGIN });
      const {
        type: apiType,
        id_token,
        access_token,
      } = yield call(dbPOST, '/authorize', { code, redirectUrl });

      if (apiType === 'success!') {

        const user = jwtDecode(id_token);
        yield all([
          yield put({ type: LOGIN, user }),
          yield call(storeItem, STORAGE_KEY, access_token),
          yield put({ type: ENABLE_LOGIN }),
        ]);

      } else {
        throw new Error('Database call failed', type);
      }
    } else {
      throw new Error('Facebook login failed', type);
    }

  } catch (error) {
    console.log('error', error);
    Alert.alert('Cancelled');
    yield all([
        yield put({ type: LOGIN_ERROR, error }),
        yield put({ type: ENABLE_LOGIN }),
    ]);
  }
};

const getTripsAsync = function* ({payload: {coords: {latitude, longitude}}}) {
  try {
    const filter = {
      lat: latitude,
      lng: longitude,
    };
    const tripsRequest = yield call(dbSecureGET, 'route&nearby', filter);
    const unique = (arr) => {
      const result = [];
      arr.reduce((prev, current) => {
        if (!prev[current.id_route]) {
          result.push(current);
          prev[current.id] = true;
        }
        return prev;
      }, {});
      return result;
    };

    const uniqueTrips = unique(tripsRequest);

    const mappedClosest = uniqueTrips.map((e) => {
      e.distance = Math.sqrt((latitude - e.lat) ** 2 + (longitude - e.lng) ** 2);
      return e;
    }).sort((a, b) => a.distance - b.distance);

    yield put({ type: GET_TRIPS_SUCCESS, payload: mappedClosest });
  } catch (error) {
    console.log('async', JSON.stringify(error));
  }
};

const getUserLocationAsync = function* () {
  try {
    const { status } = yield call(Permissions.askAsync, Permissions.LOCATION);
    if (status !== 'granted') {
      yield put({ type: GET_USER_LOCATION_FAILED, payload: 'Permission to access location was denied' });
    }
    const userLocation = yield call(Location.getCurrentPositionAsync, {});
    yield put({
      type: UPDATE_MAP_REGION,
      payload: {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
        },
    });
    yield put({ type: GET_USER_LOCATION_SUCCESS, payload: userLocation });
  } catch (error) {
    console.log(error);
  }
};

const getUserDirectionsAsync = function* ({ payload: { origin, destination, joinedWaypoints } }) {

  try {
      let res;
      if (joinedWaypoints) {
        res = yield call(googleDirectionsCall, `https://maps.googleapis.com/maps/api/directions/json?&mode=bicycling&origin=${
            origin
          }&destination=${destination}&waypoints=via:enc:${joinedWaypoints}:&key=${GOOGLE_API_KEY}`);
      } else {
        res = yield call(googleDirectionsCall, `https://maps.googleapis.com/maps/api/directions/json?&mode=bicycling&origin=${
            origin
          }&destination=${destination}&key=${GOOGLE_API_KEY}`);
      }
      const points = Polyline.decode(res.data.routes[0].overview_polyline.points);
      const coords = points.map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));

      yield put({ type: UPDATE_ROUTE_COORDS, payload: coords });
      return coords;

    } catch (error) {
      console.log(error);
    }
};

const getActiveTripAsync = function* (action) {
  let filter = {
    'id_route': action.payload.id,
  };
  try {
    const activeTrip = yield call(dbSecureGET, 'route&location', filter);
    const activeTripWaypoints = activeTrip.waypoints;
    yield put({
      type: 'UPDATE_MAP_REGION',
      payload: {
        latitude: Number(activeTripWaypoints[0].lat),
        longitude: Number(activeTripWaypoints[0].lng),
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
        },
      });
    const coords = activeTripWaypoints.map(waypoint => {
      return {
        latitude: Number(waypoint.lat),
        longitude: Number(waypoint.lng),
      };
    });
    activeTrip['coords'] = coords;
    yield put({ type: 'GET_ACTIVE_TRIP_SUCCESS', payload: activeTrip });  } catch (error) {
    console.error(error);
  }
};

const createTripAsync = function* (payload) {
  const {
    payload: {
      origin,
      destination,
      wayPoints,
      userId,
    },
  } = payload;
  try {
    const res = yield call(
      googleDirectionsCall,
      'https://maps.googleapis.com/maps/api/directions/json?' +
      '&mode=bicycling' +
      `&origin=${origin}` +
      `&destination=${destination}` +
      `&waypoints=via:enc:${wayPoints}:` +
      `&key=${GOOGLE_API_KEY}`
    );
    if (res.status === 200) {
      const {
        data: {
          routes: [{
            legs: [{
              distance: { text },
              end_address,
              start_address,
              via_waypoint,
            }],
            overview_polyline: { points },
          }],
        },
      } = res;
      const routeTitle = `${start_address.split(',')[0]} to ${end_address.split(',')[0]}`;
      const mapImage = yield call(getGoogleRouteImage, points);
      yield put({ type: RETRIEVED_MAP_IMAGE, payload: { mapImage, routeTitle } });
      const route_preview = yield call(getSmallGoogleRouteImage, points);
      yield put({
        type: RETRIEVED_TRIP_DATA, payload: {
          text, routeTitle, via_waypoint, userId, route_preview,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const saveTripAsync = function* ({payload}) {
  const { tripData, tripStats } = payload;
  try {
    const result = yield call(dbSecurePOST, 'route', { tripData, tripStats });
    yield put({ type: CREATE_TRIP_SUCCESS, payload: result });
    yield put({ type: 'GET_USER_PHOTOS', payload: tripData.userId});
  } catch (error) {
    console.error(error);
  }
};

const saveSessionAsync = function* ({payload}) {
  const { tripData, tripStats } = payload;
  try {
    const result = yield call(dbSecurePOST, 'session', { tripData, tripStats });
    yield put({ type: SAVE_SESSION_SUCCESS, payload: result });
  } catch (error) {
    yield put({ type: SAVE_SESSION_FAILED });
    console.error(error);
  }
};

const loginFlow = function* () {
  while (true) {
    const initiateAction = yield take([INITIATE_LOGIN, INITIATE_LOGIN_DEMO]);

    const task = yield fork(authorizeUser, initiateAction);
    const action = yield take([LOGOUT, LOGIN_ERROR]);

    if (action.type === LOGOUT) {
      yield cancel(task);
    }
  }
};

const getUserTrips = function* ({ payload: { userId } }) {
  let filter = {
    id_user_account: userId,
  };
  try {
  const userTripRequest = yield call(dbSecureGET, 'route', filter);
    yield put({type: GET_USER_TRIPS_SUCCESS, payload: userTripRequest});
  } catch (error) {
    console.error(error);
  }
};

const removeUserTrip = function* ({ payload: { userId, routeId } }) {
  const filter = {
    id_user_account: userId,
    id: routeId,
  };
  try {
    const removeUserRequest = yield call(dbSecureDELETE, 'route', filter);
    yield put({type: GET_USER_TRIPS_SUCCESS, payload: removeUserRequest});
  } catch (error) {
    console.error(error);
  }
};

const getUserSessions = function* ({ payload: { userId } }) {
  let filter = {
    id_user_account: userId,
  };
  try {
  const userSessionRequest = yield call(dbSecureGET, 'session', filter);
    yield put({type: GET_USER_SESSIONS_SUCCESS, payload: userSessionRequest});
  } catch (error) {
    console.error(error);
  }
};

const postFavorite = function* ({payload: {userId, routeId}}) {
  try {
    const data = {
      id_user_account: userId,
      id_route: routeId,
    };
    const favoritePostRequest = yield call(dbSecurePOST, 'favorite', data);
    yield put({type: GET_USER_FAVORITES_SUCCESS, payload: favoritePostRequest});
  } catch (error) {
    console.error(error);
  }
};

const removeFavorite = function* ({payload: {userId, routeId}}) {
  try {
    const data = {
      id_user_account: userId,
      id_route: routeId,
    };
    const favoriteDeleteRequest = yield call(dbSecureDELETE, 'favorite', data);
    yield put({type: GET_USER_FAVORITES_SUCCESS, payload: favoriteDeleteRequest});
  } catch (error) {
    console.error(error);
  }
};

const getFavorite = function* ({payload: {userId}}) {
  try {
    const filter = {
      "favorite.id_user_account": userId,
    };
    const userFavorites = yield call(dbSecureGET, 'favorite', filter);
    yield put({type: GET_USER_FAVORITES_SUCCESS, payload: userFavorites});
  } catch (error) {
    console.error(error);
  }
};

const getUserPhotosAsync = function* ({payload: {userId}}) {
  try {
    const filter = {
      'id_user_account': userId,
    };
    const userPhotos = yield call(dbSecureGET, 'user_account&photos', filter);
    yield put({type: 'GET_USER_PHOTOS_SUCCESS', payload: userPhotos});
  } catch (error) {
    console.error(error);
  }
};
const watchCreateTrip = function* () {
  while (true) {
    const initiateAction = yield take(CREATE_TRIP);

    const task = yield fork(createTripAsync, initiateAction);
    const action = yield take([CREATE_TRIP_CANCELLED, CREATE_TRIP_FAILED]);

    if (action.type === CREATE_TRIP_CANCELLED) {
      yield cancel(task);
    }
  }
};

const watchRemoveTrip = function* () {
  yield takeEvery(DELETE_USER_TRIP, removeUserTrip);
};

const watchSaveTrip = function* () {
  yield takeLatest(CREATE_TRIP_SAVE, saveTripAsync);
};

const watchSaveSession = function* () {
  yield takeLatest(SAVE_SESSION, saveSessionAsync);
};

const watchGetTrips = function* () {
  yield takeEvery(GET_USER_LOCATION_SUCCESS, getTripsAsync);
};

const watchGetUserLocation = function* () {
  yield takeEvery(GET_USER_LOCATION, getUserLocationAsync);
};

const watchGetDirections = function* () {
  yield takeEvery(GET_DIRECTIONS, getUserDirectionsAsync);
};

const watchUserTrips = function* () {
  yield takeLatest(GET_USER_TRIPS, getUserTrips);
};

const watchUserTripsSuccess = function* () {
  yield takeLatest(CREATE_TRIP_SUCCESS, getUserTrips);
};

const watchUserSessions = function* () {
  yield takeLatest(GET_USER_SESSIONS, getUserSessions);
};

const watchPostFavorite = function* () {
  yield takeEvery(POST_FAVORITE, postFavorite);
};

const watchRemoveFavorite = function* () {
  yield takeEvery(REMOVE_FAVORITE, removeFavorite);
};

const watchGetFavorite = function* () {
  yield takeLatest(GET_USER_FAVORITES, getFavorite);
};

const watchGetActiveTrip = function* () {
  yield takeEvery('GET_ACTIVE_TRIP', getActiveTripAsync);
};

const watchGetUserPhotos = function* () {
  yield takeEvery('GET_USER_PHOTOS', getUserPhotosAsync);
}

const rootSaga = function* () {
  yield all([
    watchGetTrips(),
    watchCreateTrip(),
    watchSaveTrip(),
    watchSaveSession(),
    loginFlow(),
    watchGetUserLocation(),
    watchGetDirections(),
    watchGetActiveTrip(),
    watchUserTrips(),
    watchUserSessions(),
    watchPostFavorite(),
    watchGetFavorite(),
    watchRemoveFavorite(),
    watchGetUserPhotos(),
    watchUserTripsSuccess(),
    watchRemoveTrip(),
  ]);
};

export { rootSaga, watchGetTrips, watchGetUserLocation, watchGetDirections, watchUserTrips, watchUserSessions, watchPostFavorite, watchGetFavorite, watchRemoveFavorite, watchUserTripsSuccess, watchRemoveTrip };
