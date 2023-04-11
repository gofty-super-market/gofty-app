const { View, Text , ScrollView, SafeAreaView,TouchableOpacity, TextInput } = require("react-native")
import Icon from "@expo/vector-icons/Ionicons";
import CartCard from "../components/CartCard"
import { useState } from "react";

const Cart = ()=>{

  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);

    return(
    <SafeAreaView style={{ flex: 1 }} className="pb-14">
        <View className="bg-white ">
        <View className="px-4 pb-2 pt-3 flex-row justify-between items-center">
            <Text className="text-4xl  py-1 font-medium text-gray-700">
              Cart
            </Text>
            <View className="flex-row gap-x-1">
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
        <ScrollView className="my-1">
            <CartCard title="test product" q={3} price="12" image="https://ayshadashboard.com/uploads/images/product_image/230208181140-5364062.jpg"/>
            <View className="flex-row">
            <TouchableOpacity className="m-4 py-2 px-4 bg-gray-700 rounded-full flex-row items-center">
              <Text className="text-white mr-2">
                Clear Cart
              </Text>
              <Icon name="trash-outline" size={20} color={"#fff"}></Icon>
            </TouchableOpacity>
            </View>
        </ScrollView>
            {/* <View className="flex-1 justify-center items-center">
                <Icon name="sad-outline" size={80} color="#ccc"/>            
                <Text className="text-2xl text-gray-400">Your Cart Is Empty</Text>
                <Text className="text-gray-400 px-4">add some products to Your cart</Text>
            </View> */}
        <View className="bg-white p-3 flex-row justify-between items-end">
            <View>
                <Text className="">Total Price </Text>
                <Text className="text-4xl mt-1">156 Dh</Text>
            </View>
            <TouchableOpacity className="py-2 px-4 bg-[#95BF6d] rounded-full flex-row gap-x-2 justify-center items-center ">
                <Text className="text-base font-medium text-white ">
                    Check out
                </Text>
                <Icon name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    )
}
export default Cart