const {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} = require("react-native");
import Icon from "@expo/vector-icons/Ionicons";
import CartCard from "../components/CartCard";
import { useContext, useState } from "react";
import CheckOut from "../components/CheckOut";
import { CartContext } from "../context/CartContext";
import api from "../axios";
import { UserContext } from "../context/UserContext";
import { Alert } from "react-native";

const Cart = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const { cart, setCart, setUpdateCart } = useContext(CartContext);
  const { userId, setUserId } = useContext(UserContext);

  const cleanCart = () => {
    if (userId) {
      Alert.alert("warning", "this will delete all the items from the cart", [
        {
          text: "Cancel",
        },
        {
          text: "Clean",
          onPress: () => {
            var cartFormData = new FormData();
            cartFormData.append("id_client", userId);
            api({
              method: "post",
              url: "cart-clean",
              data: cartFormData,
              headers: { "Content-Type": "multipart/form-data" },
            }).then(() => {
              setUpdateCart((p) => p + 1);
            });
          },
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="pb-14">
      <View className="bg-white ">
        <View className="px-4 pb-2 pt-3 flex-row justify-between items-center">
          <Text className="text-4xl  py-1 font-medium text-gray-700">Cart</Text>
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
      {cart.length > 0 && (
        <ScrollView className="my-1">
          {cart
            .filter((item) =>
              item.product.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((item, key) => {
              return (
                <CartCard
                  key={key}
                  title={item.product.title}
                  id_product={item.product.id_product}
                  price={item.product.price}
                  image={item.product.image}
                  quantity={item.quantity}
                  unite={item.unite}
                  id_cart={item.id_cart}
                />
              );
            })}
          <View className="flex-row">
            <TouchableOpacity
              onPress={cleanCart}
              className="m-4 py-2 px-4 bg-gray-700 rounded-full flex-row items-center"
            >
              <Text className="text-white mr-2">Clear Cart</Text>
              <Icon name="trash-outline" size={20} color={"#fff"}></Icon>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      {cart.length == 0 && (
        <View className="flex-1 justify-center items-center">
          <Icon name="sad-outline" size={80} color="#ccc" />
          <Text className="text-2xl text-gray-400">Your Cart Is Empty</Text>
          <Text className="text-gray-400 px-4">
            add some products to Your cart
          </Text>
        </View>
      )}
      {cart.length > 0 && <CheckOut navigation={navigation}></CheckOut>}
    </SafeAreaView>
  );
};
export default Cart;
