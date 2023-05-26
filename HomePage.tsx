import { Button, Text, View, FlatList, StyleSheet, StatusBar, Dimensions } from "react-native";
import RithmApi from "./api";
import { useEffect, useState } from "react";

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



  function handleSwipeRight() {
    setDayIndex((idx) => idx++);
  }

  function handleSwipeLeft() {
    if (dayIndex > 0) setDayIndex((idx) => idx--);
  }

  function Item({ title, description, start_at }) {
    return (
      <View>
        <Text>I AM AN ITEM</Text>
        <Text>{title}</Text>
        <Text>{description}</Text>
        <Text>{start_at}</Text>
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
    <View>
      <Text>Home Page</Text>
      <FlatList
        data={curricItems}
        renderItem={({ item }) => (
          <View>
            {item.map((elem) => (
                <Item
                title={elem.title}
                description={elem.description}
                start_at={elem.start_at}
              />
            )
        )}
        </View>
        )}
        keyExtractor={(item, idx) => idx}
        horizontal
      />
      <Button
        onPress={logout}
        title="Logout"
        color="#f194ff"
        accessibilityLabel="a button to logout when pressed"
      />
      <StatusBar/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    color: '#000066',
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  title: {
    fontSize: 32,
  },
  description: {
    fontSize: 18,
  },
  start_at: {
    fontSize: 12,
  }
});

export default HomePage;
