import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Signup from '../../components/Signup'
import SignIn from '../../components/SignIn'

const WelcomePage = ({navigation}) => {
    const [page , setPage ]= useState(1);
    const [signUp,setSignUp]=useState(true)
    const move = ()=>{
        if(page==3){
           navigation.navigate("Home") 
        }else{
            setPage(p=>p+1)
        }
    }
  return (
    <SafeAreaView className="bg-white flex-1">
        {
            page==1 &&
        <View className="flex-1 justify-center items-center px-5">
            <Image className="w-[75%] h-52"  style={{resizeMode: 'contain'}} source={require("../../assets/hero.png")}/>
            <Text className="p-4 text-2xl font-semibold text-gray-700">Everything Close To You</Text>
            <Text className="px-4 text-center font-semibold text-gray-500">On the place of “super healthy” we put “Everything is close to you”</Text>
        </View>

        }
        {
            page==2 &&
        <View className="flex-1 justify-center items-center px-5 pt-4">
            {
                signUp?
            <Signup setSignUp={setSignUp} navigation={navigation}></Signup>
            :
            <SignIn setSignUp={setSignUp} navigation={navigation}></SignIn>

            }
        </View>

        }
        {
            page==3 &&
        <View className="flex-1 justify-center items-center px-5">
            <Image className="w-[40%] h-32"  style={{resizeMode: 'contain'}} source={require("../../assets/smile.png")}/>
            <Text className="p-4 text-xl text-center font-semibold text-gray-700">Thanks , are you ready to explore shopping with us</Text>
        </View>

        }
        <View className="p-4 flex-row justify-between">
            <View className="px-4 flex-row justify-center items-center">
                <View className={" mx-1 h-2 bg-gray-300 rounded-full"+(page==1?" w-8":" w-2")}></View>
                <View className={" mx-1 h-2 bg-gray-300 rounded-full"+(page==2?" w-8":" w-2")}></View>
                <View className={" mx-1 h-2 bg-gray-300 rounded-full"+(page==3?" w-8":" w-2")}></View>
            </View>
            <TouchableOpacity onPress={move} className="px-6 py-3 bg-[#95BF6D]  rounded-full">
                <Text className="text-white font-semibold text-base">
                    {page==1?"start":page==2?"continue":"Start Shopping"}
                </Text>
            </TouchableOpacity>
        </View>
        
    </SafeAreaView>
  )
}

export default WelcomePage