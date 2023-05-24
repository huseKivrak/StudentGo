import { Text, View } from "react-native";
import RithmApi from "./api";
import { useEffect } from "react";
function HomePage(){

    useEffect(()=>{
        console.log("useEffect called")
        getEverything();
    },[])




    async function getEverything(){
        let res = await RithmApi.getDetailedLectureSessions();

        console.log(res);
    }

    return (
        <View>
            <Text>Home Page</Text>
        </View>
    )

}

export default HomePage;