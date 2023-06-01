import {
  View,
  Text,
  StyleSheet
} from "react-native";

/** Indicator Component */
function Indicator({ scrollX, data }) {
  return (
    <View style={styles.indicator}>
    {data.map((_, i) => {
      return <View key={`indicator-${i}`} style={styles.indicatorFrame}>

      </View>
    })}
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    bottom: 100,
    flexDirection: 'row',
  },
  indicatorFrame: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#3333",
    margin: 10,
  }
});

export default Indicator;