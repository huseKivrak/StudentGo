import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated
} from "react-native";

const { width, height } = Dimensions.get("window");

/** Indicator Component */
function Indicator({ scrollX, data }) {
  return (
    <View style={styles.indicator}>
    {data.map((_, i) => {
      const inputRange = [(i-1)* width, i*width, (i+1)* width];

      const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.8, 1.4, 0.8],
        extrapolate: 'clamp'
      });

      return <Animated.View
        key={`indicator-${i}`}
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: "#3333",
          margin: 10,
          transform: [
            {
              scale,
            }
          ]
        }}
      >

      </Animated.View>
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
  // indicatorFrame: {
  //   height: 10,
  //   width: 10,
  //   borderRadius: 5,
  //   backgroundColor: "#3333",
  //   margin: 10,
  //   transform: [
  //     {
  //       scrollX,
  //     }
  //   ]
  // }
});

export default Indicator;