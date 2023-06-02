import { View, Text, StyleSheet } from "react-native";

/** Item Component */
function Item({ title, description, start_at }) {
  const startTime = new Date(start_at).toLocaleTimeString();
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.start_at}>{startTime}</Text>
      <Text style={styles.description}>{description}</Text>
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
    fontSize: 16,
  },

});

export default Item;
