import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import RithmApi from "./api";
import Login from "./Login";
import HomePage from "./HomePage";
import { getToken } from "./secureStore";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  console.log("App launched with loggedIn = ", loggedIn);

  useEffect(
    function checkAndSetLoginStatusOnMount() {
      async function checkSetLogin() {
        try {
          await getToken();
          setLoggedIn(true);
          console.log("Check login on mount complete")
        } catch (err) {
          setLoggedIn(false);
          console.log("Check login on mount - caught error")
        }
      }
      checkSetLogin()
     }, []
  );

/** rithmLogin
 *
 * store sessionId/token from rithm api?
 *
 */
async function rithmLogin(data) {
  /**make POST request to rithm API with login credentials,
   *store sessionId/cookie somewhere, use for future requests*/
  console.log("rithmLogin(App) called with data = ", data);

  const success = await RithmApi.login(data);
  if (success === "Token saved.") {
    setLoggedIn(true);
  }
}

return (
  <View style={styles.container}>
    {loggedIn ? <HomePage /> : <Login rithmLogin={rithmLogin} />}
    <StatusBar />
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
