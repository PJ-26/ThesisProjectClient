import { StackNavigator } from "react-navigation";
import uploadPhoto from "../screens/uploadPhoto";

const Photo = StackNavigator({
  Photo: {
    screen: uploadPhoto,
  }
});

export default Photo;
