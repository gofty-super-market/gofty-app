import { View, Text } from "react-native";
import React, { useContext, useRef, useState } from "react";
import Icon from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import api from "../axios";
import { FavoriteContext } from "../context/FavoriteContext";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = ({ navigation }) => {
  const [code, setCode] = useState(false);

  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);

  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");

  const [fname, onChangeFname] = useState("");
  const [lname, onChangeLname] = useState("");
  const [email, onChangeEmail] = useState("");
  const [pass, onChangePass] = useState("");
  const [conPass, onChangeConPass] = useState("");
  const [num, onChangeNum] = useState("");
  const [address, onChangeAddress] = useState("");

  const { setUserId } = useContext(UserContext);
  const { setUpdateCart } = useContext(CartContext);
  const { setUpdateFavs } = useContext(FavoriteContext);

  const [Res, setRes] = useState();

  const validateEmail = () => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const validPassword =()=>{
    if(pass.length<6){
        return {valid:false,msg:"password must be more then 6 characters"}
    }
    if(pass!=conPass){
        return {valid:false,msg:"password don't match"}
    }
    return {valid:true}
  }

  const signUpCheck = () => {
    if (validateEmail()&&validPassword().valid&&num&&address&&fname&&lname) {
      let cartFormData = new FormData();
      cartFormData.append("fname", fname);
      cartFormData.append("lname", lname);
      cartFormData.append("email", email);
      cartFormData.append("phone", num);
      cartFormData.append("address", address);
      cartFormData.append("password", pass);
      cartFormData.append("id_client", 0);

      api({
        method: "post",
        url: "signup",
        data: cartFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          if (response.data != "0") {
            setRes(response.data);
            setCode(true);
          }
        })
        .catch((error) => console.log("error"));
    } else {
        if (!validateEmail()) {
           alert("please enter a valid email") 
        } else if(!validPassword().valid){
           alert(validPassword().msg) 
        } else if(!fname){
            alert("your first name is empty")
        }else if(!lname){
            alert("your last name is empty")
        }else if(!num){
            alert("please enter your number ")
        }else if(!address){
            alert("please enter your address ")
        }

    }
  };

  const checkCode = () => {
    let cartFormData = new FormData();
    cartFormData.append("id_client", Res);
    cartFormData.append("code", `${pin1}${pin2}${pin3}${pin4}`);
    console.log(cartFormData);
    api({
      method: "post",
      url: "client-email-verification",
      data: cartFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      if (res.data == "1") {
        setUserId(Res);
        AsyncStorage.setItem("userId", Res);
        navigation.goBack();
      } else {
        alert("code validation is not correct");
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 px-3 bg-white">
      {code ? (
        <View className="flex-1 justify-center items-center">
          <Text>Check Code In Your Email</Text>
          <View className="mt-6 p-2 flex-row gap-x-2">
            <TextInput
              keyboardType="number-pad"
              autoFocus
              maxLength={1}
              ref={pin1Ref}
              onChangeText={setPin1}
              onChange={(v) => {
                if (v != "") {
                  pin2Ref.current.focus();
                }
              }}
              className="border border-gray-200 text-lg bg-white text-center w-10 h-10 rounded-lg"
            ></TextInput>
            <TextInput
              keyboardType="number-pad"
              maxLength={1}
              ref={pin2Ref}
              onChangeText={setPin2}
              onChange={(v) => {
                if (v != "") {
                  pin3Ref.current.focus();
                }
              }}
              className="border border-gray-200 text-lg bg-white text-center w-10 h-10 rounded-lg"
            ></TextInput>
            <TextInput
              keyboardType="number-pad"
              maxLength={1}
              ref={pin3Ref}
              onChangeText={setPin3}
              onChange={(v) => {
                if (v != "") {
                  pin4Ref.current.focus();
                }
              }}
              className="border border-gray-200 text-lg bg-white text-center w-10 h-10 rounded-lg"
            ></TextInput>
            <TextInput
              keyboardType="number-pad"
              maxLength={1}
              ref={pin4Ref}
              onChangeText={setPin4}
              className="border border-gray-200 text-lg bg-white text-center w-10 h-10 rounded-lg"
            ></TextInput>
          </View>
        </View>
      ) : (
        <ScrollView className="flex-1 w-full pt-10">
          <Text className="text-3xl  pb-4 font-bold text-gray-700">
            Sign Up
          </Text>
          <View className="flex-row ">
            <View className="py-1 flex-1">
              <Text className="text-gray-600">First Name </Text>
              <TextInput
                onChangeText={onChangeFname}
                value={fname}
                className="w-full border rounded-md  pl-3 border-gray-200 my-1 bg-gray-100"
              ></TextInput>
            </View>
            <View className="py-1 flex-1 ml-2">
              <Text className="text-gray-600">Last Name </Text>
              <TextInput
                onChangeText={onChangeLname}
                value={lname}
                className="w-full border rounded-md  pl-3 border-gray-200 my-1 bg-gray-100"
              ></TextInput>
            </View>
          </View>

          <View className="w-full">
            <Text className="text-gray-600">Email </Text>
            <TextInput
              onChangeText={onChangeEmail}
              value={email}
              keyboardType="email-address"
              className="w-full border rounded-md  pl-3 border-gray-200 my-1 bg-gray-100"
            ></TextInput>
          </View>

          <View className="flex-row ">
            <View className="flex-1">
              <Text className="text-gray-600">Password </Text>
              <TextInput
                secureTextEntry={true}
                className="w-full border rounded-md  pl-3 border-gray-200 my-1 bg-gray-100"
                onChangeText={onChangePass}
                value={pass}
              ></TextInput>
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-gray-600">Confirm Password </Text>
              <TextInput
                secureTextEntry={true}
                onChangeText={onChangeConPass}
                value={conPass}
                className="w-full border rounded-md  pl-3 border-gray-200 my-1 bg-gray-100"
              ></TextInput>
            </View>
          </View>

          <View className=" w-full">
            <Text className="text-gray-600">Phone number </Text>
            <TextInput
              onChangeText={onChangeNum}
              value={num}
              keyboardType="phone-pad"
              className="w-full border rounded-md  pl-3 border-gray-200 my-1 bg-gray-100"
            ></TextInput>
          </View>
          <View className=" w-full">
            <Text className="text-gray-600">Address</Text>
            <TextInput
              onChangeText={onChangeAddress}
              value={address}
              className="w-full border rounded-md  pl-3 border-gray-200 my-1 bg-gray-100"
            ></TextInput>
          </View>

          <View className="flex-row">
            <Text className="text-gray-400 py-4">
              You have already an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("signin")}
              className="flex-row justify-center items-center "
            >
              <Text className="text-gray-700"> Sign In</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="flex-row items-center p-2 bg-gray-200 rounded-full px-4"
            >
              <Text className="text-gray-700">Skip </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      <View className="p-2 flex-row justify-end">
        <TouchableOpacity
          onPress={() => {
            if (code) {
              checkCode();
            } else {
              signUpCheck();
            }
          }}
          className="px-6 py-3 items-center flex-row bg-[#95BF6D] rounded-full "
        >
          <Text className="text-white mr-2 text-base font-bold">
            {code ? "Continue" : "Sign up"}
          </Text>
          <Icon name="arrow-forward-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
