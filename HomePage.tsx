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

  if (isLoading) {
    return (
      <View>
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
      <Text>Home Page</Text>
      <FlatList
        data={curricItems}
        renderItem={({ item }) => {
          return <ItemsList items={item} />;
        }}
        keyExtractor={(item) => item[0].start_at}
        horizontal
      />
      <Button
        onPress={logout}
        title="Logout"
        color="#f194ff"
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
