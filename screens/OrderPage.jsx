import { View, Text, Image, CheckBox } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { OrederContext } from "../context/OrederContext";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import api from "../axios";

const OrderPage = ({ navigation }) => {
  const { history, currentOrder } = useContext(OrederContext);
  const [checklist, setChecklist] = useState(
    new Array(history[currentOrder].products.length).fill(true, 0)
  );
  const [order, setOrder] = useState(history[currentOrder]);
  const { userId} = useContext(UserContext);
  const { setUpdateCart } = useContext(CartContext);

  const totalPrice = () => {
    let count = 0;
    for (let j = 0; j < history[currentOrder].products.length; j++) {
      if (checklist[j]) {
        count +=
          history[currentOrder].products[j].product.price *
          1 *
          (history[currentOrder].products[j].quantity * 1);
      }
    }
    return count;
  };

  const handleAddToCart = () => {
    for (let p = 0; p < order.products.length; p++) {
      if (checklist[p]) {
        var cartFormData = new FormData();
        cartFormData.append("id_client", userId);
        cartFormData.append("id_product", order.products[p].id_product);
        cartFormData.append("quantity", order.products[p].quantity);
        cartFormData.append("unite", order.products[p].unite);
        api({
          method: "post",
          url: "cart-new",
          data: cartFormData,
          headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => {
          setUpdateCart((p) => p + 1);
          navigation.navigate("Home");
        });
      }
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View
        className=" bg-white px-4 pb-2 pt-3 flex-row justify-start gap-x-2 items-center"
        style={styles.shadow}
      >
        <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Icon name="arrow-back-outline" size={30} color="#333" />
        </TouchableOpacity>
        <Text className="text-4xl  py-1 font-medium text-gray-700">Oreder</Text>
      </View>
      <ScrollView className="p-4 px-2 flex-1">
        <View className="bg-white p-3 rounded-lg m-2" style={styles.shadow}>
          <Text className="text-lg py-2">Order Info</Text>
          <View className="flex-row mb-1 mx-1 items-center">
            <Text>State : </Text>
            <Text
              className={
                (order?.status == "new" ? "bg-yellow-100" : "bg-lime-200") +
                "  p-1 px-2 rounded-lg"
              }
            >
              {order?.status}
            </Text>
          </View>
          <View className="flex-row mb-1 mx-1 items-center">
            <Text>Order ID : </Text>
            <Text className={"bg-gray-100  p-1 px-2 rounded-lg"}>
              {order?.id_command}
            </Text>
          </View>
          <View className="flex-row mb-1 mx-1 items-center ">
            <Text>Date : </Text>
            <Text className={"bg-gray-100  p-1 px-2 rounded-lg"}>
              {order?.created_at.slice(0, 11)}
            </Text>
            <Text className={"bg-gray-100 ml-2 p-1 px-2 rounded-lg"}>
              {order?.created_at.slice(11, 25)}
            </Text>
          </View>
          <View className="flex-row mb-1 mx-1 items-center ">
            <Text>Delivery Method : </Text>
            <Text className={"bg-blue-100 ml-2 p-1 px-2 rounded-lg"}>
              {order?.delivery_method}
            </Text>
            <Text className={"bg-gray-100 ml-2 p-1 px-2 rounded-lg"}>
              {order?.delivery_hour}
            </Text>
          </View>
        </View>
        <View>
          <View className="flex-row mb-1 mx-1 items-center ">
            <Text className="text-lg p-2">Order Items </Text>
            <Text className={"bg-white  p-1 px-2 rounded-lg"}>
              {order?.products.length} items
            </Text>
          </View>
          <View className="mb-8">
            {order.products.map((item, key) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    let a = [...checklist];
                    a[key] = !a[key];
                    setChecklist([...a]);
                  }}
                  className="bg-white p-1 rounded-lg m-1 flex-row"
                  style={styles.shadow}
                >
                  <Image
                    className="w-20 h-18 mx-1"
                    style={{ resizeMode: "contain" }}
                    source={{
                      uri: "https://ayshadashboard.com/" + item.product.image,
                    }}
                  />

                  <View className="p-3 flex-1">
                    <Text className="h-5">{item.product.title}</Text>
                    <Text>{item.product.price} DH</Text>
                    <View className="flex-row items-center mt-1">
                      <Text className={"bg-blue-100 p-1 px-2 rounded-lg"}>
                        x {item.quantity}
                      </Text>
                    </View>
                  </View>
                  <View className="justify-center items-center">
                    <View className=" px-2 ">
                      {checklist[key] ? (
                        <Icon
                          name="checkmark-circle-sharp"
                          size={30}
                          color="#999"
                        />
                      ) : (
                        <Icon name="ellipse-outline" size={30} color="#999" />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View className="p-3 bg-white border-t border-gray-300 flex-row items-end justify-between">
        <View>
          <Text className="text-gray-700">total price</Text>
          <Text className="text-3xl">{totalPrice()} DH</Text>
        </View>
        <View>
          {totalPrice() != 0 && (
            <TouchableOpacity
              onPress={handleAddToCart}
              className="py-2 rounded-full px-6 bg-[#95BF6D]"
            >
              <Text className="text-white text-base">Add to cart</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
  },
});

export default OrderPage;
