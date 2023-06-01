import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar
} from "react-native";
import RithmIcon from "./RithmIcon";

/** NavBar Component */
function NavBar({ }) {
  return (
    <View style={styles.navBar}>
      <RithmIcon/>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: "#E46B66",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * .12,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    color: "#ffffff",
  }
});

export default NavBar;