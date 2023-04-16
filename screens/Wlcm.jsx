import { View, Text } from 'react-native'
import React, { useCallback, useContext } from 'react'
import { SafeAreaView } from 'react-native'
import { Image } from 'react-native'
import { UserContext } from '../context/UserContext'
import { TouchableOpacity } from 'react-native'

const Wlcm = ({navigation}) => {
    const {userInfo}=useContext(UserContext)
  return (
    <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center px-5">
            <Image className="w-[40%] h-32"  style={{resizeMode: 'contain'}} source={require("../assets/smile.png")}/>
            <Text className="pt-3 text-xl text-center font-semibold text-gray-700">Welcome {userInfo?.fname}</Text>
            <Text className=" text-base text-center font-semibold text-gray-700">are you ready to explore our market</Text>
        </View>
        <View className="flex-row justify-end p-3">
            <TouchableOpacity onPress={()=>navigation.goBack()} className=" px-6 py-3  bg-[#95BF6D]  rounded-full">
                <Text className="text-white font-semibold text-base">
                    Start Shopping
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Wlcm