import {
  View,
  StyleSheet,
  Dimensions,
  Text
} from "react-native";
import Item from "./Item";


function ItemsList({ events }) {
  let date = new Date(events[0].start_at);
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let dateStr = `${dayNames[date.getDay()]},  ${date.getMonth() + 1}/${date.getDate()}`

  return (
    <View  style={styles.listItem}>
      <Text style={styles.dateStr}>{dateStr}</Text>
      {events.map((event) => {
        console.log("event is:", event.start_at, event.title)
        return (
          <Item
            key={event.start_at}
            title={event.title}
            description={event.description}
            start_at={event.start_at}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    color: "#000066",
    padding: 20,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  dateStr: {
    color: "#000066",
    fontSize: 48,
  }
});

export default ItemsList;