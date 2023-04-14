import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'

const SignIn = ({navigation,setSignUp}) => {
  return (
    <ScrollView className="flex-1 w-full pt-10">
        <Text className="text-3xl pb-2 pb-4 font-bold text-gray-700">Sign In</Text>

        <View className="w-full">
          <Text className="text-gray-600">Email </Text>
          <TextInput className="w-full border rounded-md  pl-3 border-gray-200 my-1 bg-gray-100"></TextInput>
        </View>



        <View className="flex-1">
          <Text className="text-gray-600">Password </Text>
          <TextInput secureTextEntry={true} className="w-full border rounded-md  pl-3 border-gray-200 my-1 bg-gray-100"></TextInput>
        </View>

        <View className="flex-row">
        <Text className="text-gray-400 py-4">You dont have an account? </Text>
        <TouchableOpacity onPress={()=>setSignUp(true)} className="flex-row justify-center items-center ">
            <Text className="text-gray-700"> Sign Up</Text>
        </TouchableOpacity>
        </View>
        <View className="flex-row">
            <TouchableOpacity onPress={()=>navigation.navigate("Home")} className="flex-row items-center p-2 bg-gray-200 rounded-full px-4">
                <Text className="text-gray-700">Skip </Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  )
}

export default SignIn