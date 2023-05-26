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
import Item from "./Item";

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

  function ListItem({ items }) {
    return (
      <View>
        {items.map((item) => {
          return (
            <View key={items.title} style={styles.item}>
              <Text>{item.title}</Text>
              <Text>{item.description}</Text>
              <Text>{item.start_at}</Text>
            </View>
          );
        })}
      </View>
    );
  }

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
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
          return <ListItem items={item} />;
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
  },
  item: {
    color: "#000066",
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  title: {
    fontSize: 32,
  },
  description: {
    fontSize: 18,
  },
  start_at: {
    fontSize: 12,
  },
  logo: {
    position: "relative",
  },
  r: {
    position: "absolute",
    left: 0,
    right: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default HomePage;
