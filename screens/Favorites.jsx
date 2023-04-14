import { SafeAreaView } from "react-native"
import OneCat from "../components/OneCat"
import Icon from "@expo/vector-icons/Ionicons";
import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
const { View, Text } = require("react-native")

const Favorites = ({navigation})=>{
    const {favs}= useContext(FavoriteContext)
    return(
    <SafeAreaView style={{ flex: 1 }} className="">
        <View className={"bg-white px-4 pt-3 pb-2 flex-row justify-between items-center "}>
            <Text className="text-4xl  py-1 font-medium text-gray-700">
              Favorites
            </Text>
        </View>
        {
            favs.length>0?        
                <OneCat render="favorites" navigation={navigation}></OneCat>
                :
                <View className="flex-1 justify-center items-center">
                    <Icon name="heart-dislike-outline" size={80} color="#ccc"/>            
                    <Text className="text-2xl text-gray-400">No Favorites</Text>
                    <Text className="text-gray-400 px-4">Add products to save them here for easy access</Text>
                </View>
        }
    </SafeAreaView>
    )
}
export default Favorites