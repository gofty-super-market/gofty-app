
import { Image, Text , TouchableOpacity, View  } from "react-native";
import  Icon  from "@expo/vector-icons/Ionicons"
import { useState } from "react";


const GoftyOffer = ()=>{
    return(
    <View className={"overflow-hidden mx-2 bg-white rounded-2xl border border-gray-200 relative my-2"}>
      <Image
        className={" h-44 "}
        style={{resizeMode: 'cover'}}
        source={{
          uri: "https://images.unsplash.com/photo-1610444833641-0542660a4ed7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        }}
      />
        <View className="p-4">
        <Text className="text-lg font-medium">GoftyOffer</Text>
        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, itaque! Debitis eveniet </Text>
            <View className="flex-row justify-between items-end mt-2">
            <Text className="text-xl font-medium">100 Dh</Text>
            <TouchableOpacity className="p-1 px-4 flex-row justify-center items-center bg-[#95BF6D] rounded-xl">
                        <Icon name="add-outline" size={25} color="#fff" />
                        <Text className="text-white font-medium">Add To Cart</Text>
            </TouchableOpacity>
            </View>
        </View>
      </View>
    )
}
 
export default GoftyOffer ;