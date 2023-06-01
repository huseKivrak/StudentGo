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
import { useEffect, useState } from "react";
import ItemsList from "./ItemsList";
import RotatingRithmIcon from "./RotatingRithmIcon";
import NavBar from "./NavBar";

function HomePage({ logout }) {
  const [isLoading, setIsLoading] = useState(true);
  const [curricItems, setCurricItems] = useState(null);
  const [dayIndex, setDayIndex] = useState(0);
  //swipeCount state = 0;

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
        <NavBar/>
        <Text>Loading...</Text>
        <RotatingRithmIcon />
        <Button
          onPress={logout}
          title="Logout"
          color="#f194ff"
          accessibilityLabel="a button to logout when pressed"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavBar/>
      <FlatList
        data={curricItems}
        renderItem={({ item }) => {
          return <ItemsList items={item} key={item[0].start_at}/>;
        }}
        horizontal
      />
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
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default HomePage;
