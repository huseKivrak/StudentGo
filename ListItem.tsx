import {
  View,
  StyleSheet,
  Dimensions
} from "react-native";
import Item from "./Item";


function ListItem({ items }) {
  return (
    <View  style={styles.listItem}>
      {items.map((item) => {
        return (
          <Item
            key={items.start_at}
            title={item.title}
            description={item.description}
            start_at={item.start_at}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    color: "#000066",
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default ListItem;