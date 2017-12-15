
export const STORAGE_KEY = 'access_token';

export const appColors = {
  logoBlue: 'rgb(104, 146, 179)',
  lightBlue: 'rgb(248, 252, 255)',
  midLightBlue: 'rgb(210, 222, 232)',
  spanishBlue: '#016fb9',
  navyBlue: 'rgb(28, 38, 65)',
  begonia: '#f7717d',
  mossGreen: '#b2ffa9',
  aquamarine: '#59c9a5',
  oriolesOrange: '#ff4a1c',
  citrine: '#e3b505',
  transparent: 'rgba(0, 0, 0, 0)',
};

export const appColorsTransparency = (transparency) => {
  return ({
    logoBlue: `rgba(104, 146, 179, ${transparency})`,
    lightBlue: `rgba(248, 252, 255, ${transparency})`,
    midLightBlue: `rgba(210, 222, 232, ${transparency})`,
    spanishBlue: `rgba(1,111,185, ${transparency})`,
    navyBlue: `rgba(28, 38, 65, ${transparency})`,
    begonia: `rgba(247,113,125, ${transparency})`,
    mossGreen: `rgba(178,255,169, ${transparency})`,
    aquamarine: `rgba(89,201,165, ${transparency})`,
    oriolesOrange: `rgba(255,74,28, ${transparency})`,
    citrine: `rgba(227,181,5, ${transparency})`,
    black: `rgba(0, 0, 0, ${transparency})`,
  });
};

export const INITIATE_LOGIN = 'INITIATE_LOGIN';
export const INITIATE_LOGIN_DEMO = 'INITIATE_LOGIN_DEMO';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const ENABLE_LOGIN = 'ENABLE_LOGIN';
export const DISABLE_LOGIN = 'DISABLE_LOGIN';

export const GET_DIRECTIONS = 'GET_DIRECTIONS';
export const GET_TRIPS = 'GET_TRIPS';

export const CREATE_TRIP = 'CREATE_TRIP';
export const CREATE_TRIP_SAVE = 'CREATE_TRIP_SAVE';
export const CREATE_TRIP_SUCCESS = 'CREATE_TRIP_SUCCESS';
export const CREATE_TRIP_FAILED = 'CREATE_TRIP_FAILED';
export const CREATE_TRIP_CANCELLED = 'CREATE_TRIP_CANCELLED';

export const SAVE_SESSION = 'SAVE_SESSION';
export const SAVE_SESSION_SUCCESS = 'SAVE_SESSION_SUCCESS';
export const SAVE_SESSION_FAILED = 'SAVE_SESSION_FAILED';

export const RETRIEVED_MAP_IMAGE = 'RETRIEVED_MAP_IMAGE';
export const RETRIEVED_TRIP_DATA = 'RETRIEVED_TRIP_DATA';

export const GET_USER_LOCATION = 'GET_USER_LOCATION';
export const GET_USER_LOCATION_FAILED = 'GET_USER_LOCATION_FAILED';
export const GET_USER_LOCATION_SUCCESS = 'GET_USER_LOCATION_SUCCESS';

export const TRIP_SELECTED = 'TRIP_SELECTED';
export const GET_TRIPS_SUCCESS = 'GET_TRIPS_SUCCESS';
export const UPDATE_MAP_REGION = 'UPDATE_MAP_REGION';
export const UPDATE_ROUTE_COORDS = 'UPDATE_ROUTE_COORDS';

export const GET_USER_TRIPS = "GET_USER_TRIPS";
export const GET_USER_SESSIONS = "GET_USER_SESSIONS";
export const GET_USER_TRIPS_SUCCESS = 'GET_USER_TRIPS_SUCCESS';
export const GET_USER_SESSIONS_SUCCESS = 'GET_USER_SESSIONS SUCCESS';
export const DELETE_USER_TRIP = 'DELETE_USER_TRIP';

export const GET_USER_FAVORITES_SUCCESS = "GET_USER_FAVORITES_SUCCESS";
export const GET_USER_FAVORITES = "GET_USER_FAVORITES";
export const POST_FAVORITE = 'POST_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export const inactive = 'inactive';
export const inProgress = 'in progress';
export const success = 'success';
export const failed = 'failed';

export const demoUser = {
  first_name: 'Zachary',
  last_name: 'Gagnier',
  picture: { data: { url: null } },
  email: 'emailemailemailemailemail@gmail.com',
  accessToken: { access_token: null, expires_in: 'never' },
  id: "doesnthaveafacebookaccount",
};
