import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Login from './Login';

export default function App() {
  const [sessionId, setSessionId] = useState("");

  async function rithmLogin(data){
    /**make POST request to rithm API with login credentials,
     *store sessionId/cookie somewhere, use for future requests*/
    const result = await axios.POST("rithmAPI", {data})

    const token = result.data
    setSessionId(token);
  }

  return (
    <View style={styles.container}>
      <Login rithmLogin={rithmLogin}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
