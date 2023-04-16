import { View, Text } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import api from "../axios";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { CartContext } from "../context/CartContext";
import { OrederContext } from "../context/OrederContext";

const Orders = ({navigation}) => {
  const { history,setCurrentOrder } =useContext(OrederContext)


  return (
    <View className="flex-1">
      <Text className="text-2xl text-gray-700 font-medium p-2 px-4">
        Order History
      </Text>
      {history ? (
        <View>
          {history.map((order,key) => {
            return (
              <TouchableOpacity key={key} onPress={()=>{setCurrentOrder(key);navigation.navigate("order")}} className="p-2 bg-white items-center rounded-lg m-2 my-1 border border-gray-200 flex-row">
                <View className="flex-1 ">
                    <View className="flex-row mb-1 mx-1 items-center">
                        <Text>state </Text>
                        <Text className={(order?.status=="new"? "bg-yellow-100":"bg-lime-200")+ "  p-1 px-2 rounded-lg"}>{order?.status}</Text>
                    </View>
                </View>
                <View>
                    <Text className="text-gray-500 text-end">{order?.created_at.slice(0,11)}</Text>
                    <Text className="text-gray-500 text-end">{order?.created_at.slice(11,23)}</Text>
                </View>
                <View>
                    <View className="p-2 px-2 ml-2 flex-row bg-gray-100 rounded-md items-center">
                        <Icon name="chevron-forward-outline" size={20} color="#999" />
                    </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Icon name="cube-outline" size={80} color="#ccc" />
          <Text className="text-xl text-gray-400 ">
            The Order History is empty
          </Text>
        </View>
      )}
    </View>
  );
};

export default Orders;
