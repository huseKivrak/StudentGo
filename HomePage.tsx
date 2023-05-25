import { Button, Text, View } from "react-native";
import RithmApi from "./api";
import { useEffect, useState } from "react";

function HomePage({ logout }) {
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(new Date().toDateString());
  const [dayItems, setDayItems] = useState(null);

  useEffect(function getDayCurricItemsOnMount() {
    async function getDayCurricItems() {
      console.log("useEffect for HomePage called");
      let items = await RithmApi.getDayCurric();
      console.log("day items from Rithm API= ", items);

      setDayItems(items);
      setIsLoading(false);
    }
    getDayCurricItems();
  }, [date]);

/** handleSwipe
 *
 * setDate to (date) => date + 1
 *
 */

  function makeCards(dayItems){
    for (const item of dayItems){
      if (item.type === "lecture"){

      } else if (item.type === "exercise"){

      }else if( item.type === "event"){

      }

      }
    }
  }

  if (isLoading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View>
      <Text>Home Page</Text>
      {{makeCards()}}

      <Button
        onPress={logout}
        title="Logout"
        color="#f194ff"
        accessibilityLabel="a button to logout when pressed"
      />
    </View>
  );
}

export default HomePage;
