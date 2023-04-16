import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { ScrollView } from 'react-native'
import Icon from "@expo/vector-icons/Ionicons";
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import api from '../axios';
import { UserContext } from '../context/UserContext';
import { FavoriteContext } from '../context/FavoriteContext';
import { CartContext } from '../context/CartContext';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignIn = ({navigation}) => {
    const [email, onChangeEmail]=useState("")
    const [password,onChangePassword]=useState("")


    const { setUserId }= useContext(UserContext);
    const {setUpdateCart} = useContext(CartContext)
    const {setUpdateFavs } = useContext(FavoriteContext);

    const validateEmail = () => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const singInCheck = (event) => {
        if(validateEmail()&&password){
            let cartFormData = new FormData();
            cartFormData.append('email', email)
            cartFormData.append('password', password)
            cartFormData.append('id_client', 0)
            api({
            method: "post",
            url: "signin",
            data: cartFormData,
            headers: { "Content-Type": "multipart/form-data" },
            })
            .then(function (response) {
                if (response.data != "0") {
                    setUserId(response.data)
                    AsyncStorage.setItem("userId",response.data)
                    setUpdateCart(p=>p+1)
                    setUpdateFavs(p=>p+1)
                navigation.goBack()
                }else{
                    alert("something went wrong")
                }
            })
        }else{
            if (!validateEmail()) {
                alert("please enter a valid email") 
            }
            if (!password) {
                alert("please enter your password") 
            }
        }
      }


  return (
    <SafeAreaView className="flex-1 px-3 bg-white">
    <ScrollView className="flex-1 w-full pt-10">
        <Text className="text-3xl  pb-4 font-bold text-gray-700">Sign In</Text>
        
        <View className="w-full">
          <Text className="text-gray-600">Email </Text>
          <TextInput keyboardType='email-address' onChangeText={onChangeEmail} value={email} className="w-full border rounded-md  pl-3 border-gray-200 my-1 bg-gray-100"></TextInput>
        </View>

        <View className="flex-1">
          <Text className="text-gray-600">Password </Text>
          <TextInput onChangeText={onChangePassword} value={password} secureTextEntry={true} className="w-full border rounded-md  pl-3 border-gray-200 my-1 bg-gray-100"></TextInput>
        </View>

        <View className="flex-row">
        <Text className="text-gray-400 py-4">You dont have an account? </Text>
        <TouchableOpacity onPress={()=>navigation.navigate("signup")} className="flex-row justify-center items-center ">
            <Text className="text-gray-700"> Sign Up</Text>
        </TouchableOpacity>
        </View>
        <View className="flex-row">
            <TouchableOpacity onPress={()=>navigation.goBack()} className="flex-row items-center p-2 bg-gray-200 rounded-full px-4">
                <Text className="text-gray-700">Skip </Text>
            </TouchableOpacity>
        </View>
    </ScrollView>

      <View className="p-2 flex-row justify-end">
        <TouchableOpacity onPress={singInCheck} className="px-6 py-3 items-center flex-row bg-[#95BF6D] rounded-full ">
          <Text className="text-white mr-2 text-base font-bold">Sign In</Text>
          <Icon name="arrow-forward-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SignIn