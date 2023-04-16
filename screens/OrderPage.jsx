import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { OrederContext } from '../context/OrederContext'
import { SafeAreaView } from 'react-native'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native'

const OrderPage = () => {

  const { history,currentOrder } =useContext(OrederContext)
  const order = history[currentOrder]

  return (
    <SafeAreaView className="flex-1">
        <View className=" bg-white px-4 pb-2 pt-3 flex-row justify-between items-center" style={styles.shadow} >
            <Text className="text-4xl  py-1 font-medium text-gray-700">
             Oreder 
            </Text>
        </View>
        <ScrollView className="p-4 px-2 flex-1">
            <View className="bg-white p-3 rounded-lg m-2" style={styles.shadow}>
                <Text className="text-lg py-2">Order Info</Text>
                <View className="flex-row mb-1 mx-1 items-center">
                    <Text>State : </Text>
                    <Text className={(order?.status=="new"? "bg-yellow-100":"bg-lime-200")+ "  p-1 px-2 rounded-lg"}>{order?.status}</Text>
                </View>
                <View className="flex-row mb-1 mx-1 items-center">
                    <Text>Order ID : </Text>
                    <Text className={"bg-gray-100  p-1 px-2 rounded-lg"}>{order?.id_command}</Text>
                </View>
                <View className="flex-row mb-1 mx-1 items-center ">
                    <Text>Date : </Text>
                    <Text className={"bg-gray-100  p-1 px-2 rounded-lg"}>{order?.created_at.slice(0,11)}</Text>
                    <Text className={"bg-gray-100 ml-2 p-1 px-2 rounded-lg"}>{order?.created_at.slice(11,25)}</Text>
                </View>
                <View className="flex-row mb-1 mx-1 items-center ">
                    <Text>Delivery Method : </Text>
                    <Text className={"bg-emerald-100 ml-2 p-1 px-2 rounded-lg"}>{order?.delivery_method}</Text>
                    <Text className={"bg-gray-100 ml-2 p-1 px-2 rounded-lg"}>{order?.delivery_hour}</Text>
                </View>
            </View>
            <View>

                <View className="bg-white p-3 rounded-lg m-2" style={styles.shadow}>
                    <Text>product Name</Text>
                </View>
            </View>
        </ScrollView>
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

export default OrderPage