import { Text, View } from "react-native";

/** Item Component */
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

export default Item;