import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'

const Signup = ({navigation,setSignUp}) => {
  return (
    <ScrollView className="flex-1 w-full pt-10">
        <Text className="text-3xl  pb-4 font-bold text-gray-700">Sign Up</Text>
        <View className="flex-row ">
        <View className="py-1 flex-1">
          <Text className="text-gray-600">First Name </Text>
          <TextInput className="w-full border rounded-md  pl-3 border-gray-200 my-1 bg-gray-100"></TextInput>
        </View>
        <View className="py-1 flex-1 ml-2">
          <Text className="text-gray-600">Last Name </Text>
          <TextInput className="w-full border rounded-md  pl-3 border-gray-200 my-1 bg-gray-100"></TextInput>
        </View>

        </View>

        <View className="w-full">
          <Text className="text-gray-600">Email </Text>
          <TextInput className="w-full border rounded-md  pl-3 border-gray-200 my-1 bg-gray-100"></TextInput>
        </View>


        <View className="flex-row ">

        <View className="flex-1">
          <Text className="text-gray-600">Password </Text>
          <TextInput secureTextEntry={true}  className="w-full border rounded-md  pl-3 border-gray-200 my-1 bg-gray-100"></TextInput>
        </View>
        <View className="flex-1 ml-2">
          <Text className="text-gray-600">Confirm Password </Text>
          <TextInput secureTextEntry={true} className="w-full border rounded-md  pl-3 border-gray-200 my-1 bg-gray-100"></TextInput>
        </View>

        </View>

        <View className=" w-full">
          <Text className="text-gray-600">Phone number </Text>
          <TextInput className="w-full border rounded-md  pl-3 border-gray-200 my-1 bg-gray-100"></TextInput>
        </View>
        <View className=" w-full">
          <Text className="text-gray-600">Address</Text>
          <TextInput className="w-full border rounded-md  pl-3 border-gray-200 my-1 bg-gray-100"></TextInput>
        </View>

        <View className="flex-row">
        <Text className="text-gray-400 py-4">You have already an account? </Text>
        <TouchableOpacity  onPress={()=>setSignUp(false)} className="flex-row justify-center items-center ">
            <Text className="text-gray-700"> Sign In</Text>
        </TouchableOpacity>
        </View>
        <View className="flex-row">
            <TouchableOpacity onPress={()=>navigation.goBack()} className="flex-row items-center p-2 bg-gray-200 rounded-full px-4">
                <Text className="text-gray-700">Skip </Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  )
}

export default Signup