import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import Signup from "../../components/Signup";
import SignIn from "../../components/SignIn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../context/UserContext";

const WelcomePage = ({ navigation }) => {
  const { setUserId, userId } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
        setLoading(true)
    }, 2000);
  }, []);
  const move = () => {
    AsyncStorage.setItem("Open", "yeah!");
    if (userId) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("signin");
    }
  };
  useEffect(() => {
    AsyncStorage.getItem("Open").then((value) => {
      if (value != undefined) {
        navigation.navigate("Home");
      }
    });
  }, []);
  return (
    <SafeAreaView className="bg-white flex-1">
      {loading && (
        <>
          <View className="flex-1 justify-center items-center px-5">
            <Image
              className="w-[75%] h-52"
              style={{ resizeMode: "contain" }}
              source={require("../../assets/hero.png")}
            />
            <Text className="p-4 text-2xl font-semibold text-gray-700">
              Everything Close To You
            </Text>
            <Text className="px-4 text-center font-semibold text-gray-500">
              On the place of “super healthy” we put “Everything is close to
              you”
            </Text>
          </View>
          <View className="p-3 px-5 flex-row justify-end">
            <TouchableOpacity
              onPress={move}
              className="px-6 py-3 bg-[#95BF6D]  rounded-full"
            >
              <Text className="text-white font-semibold text-base">start</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default WelcomePage;
