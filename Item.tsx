import { View, Text, StyleSheet } from "react-native";

/** Item Component */
function Item({ title, description, start_at }) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const startDay = new Date(start_at);

  const DAY_MOD =
    startDay === today
      ? "today"
      : startDay === tomorrow
      ? "tomorrow"
      : "upcoming";

  const startTime = new Date(start_at).toLocaleTimeString();
  return (
    <View>
      <Text style={styles.DAY_MOD}>{DAY_MOD}</Text>
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
  DAY_MOD: {
    fontSize: 12,
  },
});

export default Item;
