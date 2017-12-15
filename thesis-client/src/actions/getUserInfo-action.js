import { GET_USER_TRIPS, GET_USER_SESSIONS, GET_USER_FAVORITES, DELETE_USER_TRIP } from '../constants';

export const getUserRoutes = (userId) => ({
    type: GET_USER_TRIPS,
    payload: {
        userId,
    },
});

export const getUserSessions = (userId) => ({
   type: GET_USER_SESSIONS,
   payload: {
       userId,
   },
});

export const getUserFavorites = (userId) => ({
    type: GET_USER_FAVORITES,
    payload: {
        userId,
    },
 });

 export const removeUserTrip = (userId, routeId) => ({
     type: DELETE_USER_TRIP,
     payload: {
         userId,
         routeId,
     },
 });
