import { SafeAreaView, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { ScrollView } from "react-native";

const CheckOutPage = ({navigation}) => {
    const [DMethod,setDMethod]=useState(0)
  return (
    <SafeAreaView className="flex-1">

    <ScrollView className="flex-1 pt-8 bg-white">
      <View className="flex-row px-4">
        <View className="flex-1 pt-2">
            <View className="flex-row items-end">
            <Text className="">Price : </Text>
            <Text className="">100 Dh</Text>
            </View>
            <View className="flex-row items-end">
            <Text className="">Delivery : </Text>
            <Text className="">{DMethod==0? "30":"5"} Dh</Text>
            </View>
        </View>
        <View>
          <Text className="text-lg ">Total Price</Text>
          <Text className="text-5xl ">{100+(DMethod==0?30:5)} Dh</Text>
        </View>
      </View>
      <View className="p-4 bg-white flex-1">
        <View className="py-1">
          <Text>Name </Text>
          <TextInput className="border rounded-md py-1 pl-3 border-gray-200 my-1 bg-gray-100"></TextInput>
        </View>
        <View className="py-1">
          <Text>Phone </Text>
          <TextInput className="border rounded-md py-1 pl-3 border-gray-200 my-1 bg-gray-100"></TextInput>
        </View>
        <View className="py-1">
          <Text>Address </Text>
          <TextInput className="border rounded-md py-1 pl-3 border-gray-200 my-1 bg-gray-100"></TextInput>
        </View>
        <View>
            <Text className="mt-4">Delivery Methods</Text>
            <View className="flex-row p-2">
                <TouchableOpacity onPress={()=>setDMethod(0)} className={"py-2 px-2 rounded-full flex-row gap-x-2 justify-center items-center mr-3 "+(DMethod==0?"bg-[#95BF6d] ":"bg-gray-100 border border-gray-200")}>
                    <Text className={"text-base font-medium " + (DMethod==0?" text-white": " text-gray-500")}>Normal</Text>
                     <Icon name={DMethod==0?"checkmark-circle":"ellipse-outline"} size={20} color={DMethod==0?"#fff":"#999"} /> 
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setDMethod(1)} className={"py-2 px-2 rounded-full flex-row gap-x-2 justify-center items-center "+(DMethod==1?"bg-[#95BF6d] ":"bg-gray-100 border border-gray-200")}>
                    <Text className={"text-base font-medium " + (DMethod==1?" text-white": " text-gray-500")}>SL5</Text>
                     <Icon name={DMethod==1?"checkmark-circle":"ellipse-outline"} size={20} color={DMethod==1?"#fff":"#999"} /> 
                </TouchableOpacity>
            </View>
            <Text className="mt-4">Delivery Time</Text>
            <TouchableOpacity className="px-6 py-3 my-2 bg-gray-100 border border-gray-200 rounded-full flex-row items-center justify-between">
                <Text className="text-base">12:00</Text>
                <Icon name="chevron-down-outline" size={20} color={"#999"} /> 
            </TouchableOpacity>

        </View>
      </View>

    </ScrollView>
        <View className="flex-row justify-end items-end py-2 bg-white p-4">
          <TouchableOpacity onPress={()=>{navigation.navigate("Home")}} className="py-2 px-4 bg-gray-200 rounded-full mr-4  justify-center items-center ">
            <Text className="text-base font-medium text-gray-600 ">cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2 px-4 bg-[#95BF6d] rounded-full flex-row gap-x-2 justify-center items-center ">
            <Text className="text-base font-medium text-white ">Check out</Text>
            <Icon name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};
export default CheckOutPage;
