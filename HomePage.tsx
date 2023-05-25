import { Text, View } from "react-native";
import RithmApi from "./api";
import { useEffect } from "react";
function HomePage(){

    useEffect(function getLectureSessionsOnMount() {
      async function getLectureSessions(){
        console.log("useEffect called")
        const lectureSessions = await getEverything();
        console.log("lectureSessions", lectureSessions);
      }
      getLectureSessions();
    },[])

    async function getEverything(){
        let res = await RithmApi.getDetailedLectureSessions();

        console.log("getEverything = ", res);
    }

    return (
        <View>
            <Text>Home Page</Text>
        </View>
    )

}

export default HomePage;