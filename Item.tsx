import {
  View,
  Text,
  StyleSheet
} from "react-native";

/** Item Component */
function Item({ title, description, start_at }) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.start_at}>{start_at}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
  },
  description: {
    fontSize: 18,
  },
  start_at: {
    fontSize: 12,
  },
});

export default Item;