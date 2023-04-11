const { View, Text, TextInput, SafeAreaView } = require("react-native");

import { Layout, set } from "react-native-reanimated";
import GlobalStyles from "../components/GlobalStyles";
import { Button, ScrollView, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import CatSlider from "../components/CatSlider";
import OneCat from "../components/OneCat";
import GoftyOffer from "../components/GoftyOffer";

const Market = () => {
  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [catagories, setCatagories] = useState([
    "all",
    "snacks",
    "electro",
    "food",
    "patisserie",
    "hygiene",
  ]);
  const [currentCat, setCurrentCat] = useState("all");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="border-b-2 border-gray-100 pt-3 bg-white">
        <View className="flex flex-row px-4 pb-2 justify-between items-center">
          <View className="flex-row items-end gap-1 ">
            <Text className="text-4xl  py-1 font-medium text-gray-700">
              Market
            </Text>
            <Text className="text-lg py-2 text-gray-400">
              {" "}
              | {currentCat == "all" ? "home" : currentCat}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setOpenSearch((p) => !p);
              setSearch("");
            }}
            className="w-10 h-10 flex justify-center items-center bg-white p-2 rounded-full border border-gray-300"
          >
            {openSearch ? (
              <Icon name="close-outline" size={22} color="#888" />
            ) : (
              <Icon name="search-outline" size={20} color="#888" />
            )}
          </TouchableOpacity>
        </View>
        {openSearch && (
          <View className="bg-gray-100 border border-gray-300 mb-2 mx-4 rounded-full overflow-hidden px-2 pl-4 h-10 shadow-md flex flex-row items-center">
            <TextInput
              value={search}
              onChangeText={(val) => setSearch(val)}
              className="h-full text-lg flex-1"
            ></TextInput>
            {search.length > 0 ? (
              <TouchableOpacity onPress={() => setSearch("")}>
                <Icon name="close-circle" size={25} color="#888" />
              </TouchableOpacity>
            ) : (
              <Icon name="search-outline" size={25} color="#888" />
            )}
          </View>
        )}
      </View>



      <ScrollView className="">
        <ScrollView
          horizontal={true}
          className=" mx-2 py-2  bg-white flex-row "
        >
          {catagories.map((cat, key) => {
            return (
              <TouchableOpacity key={key} onPress={() => setCurrentCat(cat)}>
                <Text
                  className={
                    "mx-1 p-2 px-4 rounded-full border border-gray-300 w-fit bg-white " +
                    (cat == currentCat &&
                      " bg-[#95BF6D] border-[#95BF6d] text-white font-medium px-6")
                  }
                >
                  {cat }
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {currentCat == "all" && (
          <View className="mb-16">
            <GoftyOffer />
            {catagories.map((cat, key) => {
              if (cat != "all") {
                return <CatSlider title={cat} key={key}></CatSlider>;
              }
            })}
          </View>
        )}
      {
        currentCat!="all"&&
        <OneCat></OneCat>
      }
      </ScrollView>





    </SafeAreaView>
  );
};
export default Market;
