const { View, Text, TextInput, SafeAreaView } = require("react-native");

import { Layout, set } from "react-native-reanimated";
import GlobalStyles from "../components/GlobalStyles";
import { Button, ScrollView, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { useContext, useState } from "react";
import CatSlider from "../components/CatSlider";
import OneCat from "../components/OneCat";
import GoftyOffer from "../components/GoftyOffer";
import { StyleSheet } from "react-native";
import CatBar from "../components/CatBar";
import { CatsContext } from "../context/CatsContext";
import { FlatList } from "react-native";

const Market = ({navigation}) => {
  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);

  const {cats,setCats,currentCat, setCurrentCat} = useContext(CatsContext);







  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className=" pt-3 bg-white" >
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


      <CatBar></CatBar>

        {currentCat == "all" && (
          search?
          <OneCat navigation={navigation} render="search" search={search} For="all"></OneCat>:
          <View className="mb-16">
            <GoftyOffer />
            <CatSlider navigation={navigation} ttl={"New Products"}></CatSlider>
            <CatSlider navigation={navigation} ttl="For You"></CatSlider>
          </View>
        )}
      {
        currentCat!="all"&&
        (
          search?
          <OneCat navigation={navigation} render="search" search={search} For="cat"></OneCat>
          :
          <OneCat navigation={navigation} render="cat" For="cat"></OneCat>
        )
      }
      </ScrollView>





    </SafeAreaView>
  );
};

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
export default Market;
