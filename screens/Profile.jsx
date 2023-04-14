import { TouchableOpacity } from "react-native"
import Icon from "@expo/vector-icons/Ionicons";
import CatSlider from "../components/CatSlider";
import { useState } from "react";
import { StyleSheet } from "react-native";
const { View, Text, SafeAreaView } = require("react-native")
const Profile = ()=>{
    const [draw,setDraw]=useState(false)
    return(


    <SafeAreaView style={{ flex: 1 }} className="pb-14">

        <View className="bg-white " style={styles.shadow} >
        <View className="px-4 pb-2 pt-3 flex-row justify-between items-center">
            <Text className="text-4xl  py-1 font-medium text-gray-700">
              Profile
            </Text>
          <TouchableOpacity
            onPress={() => {
              setDraw((p) => !p);
            }}
            className="w-10 h-10 flex justify-center items-center bg-white p-2 rounded-full border border-gray-300"
          >
            {draw ? (
              <Icon name="close-outline" size={22} color="#888" />
            ) : (
              <Icon name="ellipsis-vertical" size={20} color="#888" />
            )}
          </TouchableOpacity>
        </View>
        </View>
        {
            draw &&
        <View style={styles.shadow}  className="absolute border-gray-200 top-16 m-2 py-2 z-10 right-2 rounded-xl w-36 bg-white border">
            <TouchableOpacity className="flex-row px-3 py-2 items-center">
                <Icon name="chatbox-outline" size={20} color="#333" />
                <Text className="ml-2">Contact Us</Text>
            </TouchableOpacity>
            <View className="bg-gray-200 h-[1px] w-[90%] mx-auto"></View>
            <TouchableOpacity className="flex-row px-3 py-2 items-center">
                <Icon name="people-outline" size={20} color="#333" />
                <Text className="ml-2">About Us</Text>
            </TouchableOpacity>
            <View className="bg-gray-200 mb-2 h-[1px] w-[90%] mx-auto"></View>
            <TouchableOpacity className="flex-row px-3 py-2 items-center">
                <Icon name="log-out-outline" size={20} color="#333" />
                <Text className="ml-2">Logout</Text>
            </TouchableOpacity>
        </View>
        }
        <View style={styles.shadow}  className="p-3 m-2 bg-white rounded-2xl relative pt-10 mt-10">
            <View className="absolute left-6 -top-6 w-14 h-14 justify-center mr-1 items-center rounded-2xl bg-[#95BF6D] ">
                <Text className="text-white text-2xl">AZ</Text>
            </View>
            <View className="pl-3">
            <Text className="py-1 font-medium text-gray-700">
                name : abdessamade zalmadi
            </Text>
            <Text className="py-1 font-medium text-gray-700">
                email : tchisamasamatchi@gmail.com
            </Text>
            <Text className="py-1 font-medium text-gray-700">
                number : 0771337929
            </Text>
            <Text className="py-1 font-medium text-gray-700">
                address : marrakech aitwrir
            </Text>
            </View>
        </View>
        <View className="flex-1">
            <Text className="text-2xl text-gray-700 font-medium p-2 px-4">Order History</Text>
            <View className="flex-1 justify-center items-center">
                <Icon name="cube-outline" size={80} color="#ccc" />
                <Text className="text-xl text-gray-400 ">The Order History is empty</Text>
            </View>
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    shadow:{
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity:  0.16,
        shadowRadius: 1.51,
        elevation: 2 
}
})
export default Profile