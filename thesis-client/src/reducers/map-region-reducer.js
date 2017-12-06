export default function (state = 
  { 
    latitude: 30.3249980, 
    longitude: -90.9129380, 
    latitudeDelta: 0.1, 
    longitudeDelta: 0.1 
  }, action) {
  switch (action.type) {
    case 'UPDATE_MAP_REGION':
      return action.payload;
    default:
      return state;
  }
}
