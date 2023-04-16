import { TouchableOpacity } from "react-native"
import Icon from "@expo/vector-icons/Ionicons";
import CatSlider from "../components/CatSlider";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { UserContext } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Orders from "../components/Orders";
import { ScrollView } from "react-native";
const { View, Text, SafeAreaView } = require("react-native")
const Profile = ({navigation})=>{
    const [draw,setDraw]=useState(false)
    const {userId , setUserId , userInfo}= useContext(UserContext)

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
            {
                userId?
            <TouchableOpacity onPress={()=>{setUserId(null);AsyncStorage.setItem("userId","")}} className="flex-row px-3 py-2 items-center">
                <Icon name="log-out-outline" size={20} color="#333" />
                <Text className="ml-2">Logout</Text>
            </TouchableOpacity>
            :
            <>
            <TouchableOpacity onPress={()=>navigation.navigate("signin")} className="flex-row px-3 py-2 items-center">
                <Icon name="log-in-outline" size={20} color="#333" />
                <Text className="ml-2">Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate("signup")} className="flex-row px-3 py-2 items-center">
                <Icon name="person-add-outline" size={20} color="#333" />
                <Text className="ml-2">Sign up</Text>
            </TouchableOpacity>
            </>
            }
        </View>
        }
        {
            userId?
        <>
        <ScrollView className="flex-1 ">
        <View style={styles.shadow}  className="p-3 m-2 bg-white rounded-2xl relative pt-10 mt-10">
            <View className="absolute left-6 -top-6 w-14 h-14 justify-center mr-1 items-center rounded-2xl bg-[#95BF6D] ">
                <Text className="text-white text-2xl">{ userInfo?.fname?.toUpperCase()[0] + userInfo?.lname?.toUpperCase()[0]  }</Text>
            </View>
            <View className="pl-3">
            <Text className="py-1 font-medium text-gray-700">
                name : { userInfo?.fname + " " + userInfo?.lname } 
            </Text>
            <Text className="py-1 font-medium text-gray-700">
                email : { userInfo?.email}
            </Text>
            <Text className="py-1 font-medium text-gray-700">
                number : { userInfo?.phone}
            </Text>
            <Text className="py-1 font-medium text-gray-700">
                address : { userInfo?.address }
            </Text>
            </View>
        </View>
        <Orders navigation={navigation}></Orders>
        </ScrollView>
        </>
        :
        <View className="flex-1 justify-center items-center ">
            <Text className="text-2xl text-gray-700 font-medium p-2 px-4">Please Signin </Text>
            <TouchableOpacity onPress={()=>navigation.navigate("signin")} className="px-6 py-3 items-center flex-row bg-[#95BF6D] rounded-full m-3">
                <Text className="text-white mr-2 text-base font-bold">Sign In</Text>
                <Icon name="arrow-forward-outline" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
        }
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