import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import RithmApi from "./api";
import LoginForm from "./LoginForm";
import HomePage from "./HomePage";
import { getToken, deleteToken } from "./secureStore";
import NavBar from "./NavBar";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  console.log("App launched with loggedIn = ", loggedIn);

  useEffect(function checkAndSetLoginStatusOnMount() {
    async function checkSetLogin() {
      try {
        await getToken();
        setLoggedIn(true);
        console.log("Check login on mount complete");
      } catch (err) {
        setLoggedIn(false);
        console.log("Check login on mount - caught error");
      }
    }
    checkSetLogin();
  }, []);

  /** rithmLogin
   *
   * store sessionId/token from rithm api?
   *
   */
  async function login(data) {
    /**make POST request to rithm API with login credentials,
     *store sessionId/cookie somewhere, use for future requests*/
    console.log("login(App) called with data = ", data);

    const success = await RithmApi.getAndSaveToken(data);
    if (success) {
      setLoggedIn(true);
    }
  }

  async function logout() {
    await deleteToken();
    setLoggedIn(false);
  }

  return (
    <View style={styles.container}>
      <NavBar/>
    <View style={styles.content}>
      {loggedIn ? <HomePage logout={logout} /> : <LoginForm login={login} />}
      <StatusBar />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
