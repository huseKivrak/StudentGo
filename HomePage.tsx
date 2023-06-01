import {
  Button,
  Text,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import RithmApi from "./api";
import { useRef, useEffect, useState } from "react";
import ItemsList from "./ItemsList";
import RotatingRithmIcon from "./RotatingRithmIcon";
import NavBar from "./NavBar";
import Indicator from "./Indicator";

/** HomePage Component */

function HomePage({ logout }) {
  const [isLoading, setIsLoading] = useState(true);
  const [curricItems, setCurricItems] = useState(null);
  const [dayIndex, setDayIndex] = useState(0);
  //swipeCount state = 0;

  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(function getDayCurricItemsOnMount() {
    async function getDayCurricItems() {
      console.log("useEffect for HomePage called");
      let items = await RithmApi.getCurricByDay();
      console.log("day items from Rithm API= ", items);

      setCurricItems(items);
      console.log("items in state: ", items);
      setIsLoading(false);
    }
    getDayCurricItems();
  }, []);

  useEffect(
    function findAndSetDayIndexAfterMount() {
      function findAndSetDayIndex() {
        console.log("findAndSetDayIndex called");
        const today = new Date().toDateString().split("T")[0];

        const idx = curricItems.findIndex((item) =>
          item[0].start_at.startsWith(today)
        );

        setDayIndex(idx);
      }
      if (curricItems && curricItems.length) findAndSetDayIndex();
    },
    [curricItems]
  );


  // swipe left function

  // swipe right function



  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
        <RotatingRithmIcon />
        <Button
          onPress={logout}
          title="Logout"
          color="#E46B66"
          accessibilityLabel="a button to logout when pressed"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={curricItems}
        renderItem={({ item, index }) => {
          return <ItemsList events={item} key={item[0].start_at}/>;
        }}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true}
        )}
        contentContainerStyle={{paddingBottom: 100}}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
      <Indicator scrollX={scrollX} data={curricItems}/>
      <Button
        onPress={logout}
        title="Logout"
        color="#E46B66"
        accessibilityLabel="a button to logout when pressed"
      />
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default HomePage;
