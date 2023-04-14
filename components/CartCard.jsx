import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { useContext, useState } from "react";
import api from "../axios";
import { CartContext } from "../context/CartContext";

const CartCard = ({ title, price, quantity,image,id_product,unite,id_cart }) => {
  const [q, setQ] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const {setUpdateCart} = useContext(CartContext)
  



  const handelQP = () => {
    var cartFormData = new FormData();
    cartFormData.append('id_client', 111)
    cartFormData.append('id_product', id_product)
    cartFormData.append('quantity', Number(quantity) + 1)
    cartFormData.append('unite', unite)
    api(
        {
            method: "post",
            url: "cart-update",
            data: cartFormData,
            headers: { "Content-Type": "multipart/form-data" },
        }
    ).then(() => {
        setUpdateCart(p => p + 1)
    })
}
const handelQM = () => {
    if (quantity>1) {
        var cartFormData = new FormData();
        cartFormData.append('id_client', 111)
        cartFormData.append('id_product', id_product)
        cartFormData.append('quantity', Number(quantity) - 1)
        cartFormData.append('unite', unite)
        api(
            {
                method: "post",
                url: "cart-update",
                data: cartFormData,
                headers: { "Content-Type": "multipart/form-data" },
            }
        ).then(() => {
            setUpdateCart(p => p + 1)
        })
    }
}

const handelRemove = (id) => {
        var cartFormData = new FormData();
        cartFormData.append('id_cart', id_cart)
        api(
            {
                method: "post",
                url: "cart-delete",
                data: cartFormData,
                headers: { "Content-Type": "multipart/form-data" },
            }
        ).then(() => {
            setUpdateCart(p => p + 1)
        })
}





  return (
    <View
      style={styles.shadow}
      className={
        "overflow-hidden bg-white rounded-2xl  relative flex-row mx-3 my-1"
      }
    >
      <Image
        className={"w-28 h-26 object-fill m-2"}
        style={{ resizeMode: "contain" }}
        source={{
          uri: "https://ayshadashboard.com/" + image,
        }}
      />
      <View className="p-2 flex-1">
        <Text className="h-5">{title}</Text>
        <Text className="text-xl">{price} Dh</Text>
        <View className="flex-row mt-2">
          <View className="flex-row items-center bg-white border border-gray-200 rounded-full">
            <TouchableOpacity onPress={handelQM} className="rounded-full  w-8 h-8 justify-center items-center">
              <Icon name="remove" size={20} color="#777" />
            </TouchableOpacity>
            <Text className="px-2">{quantity}</Text>
            <TouchableOpacity onPress={handelQP} className="rounded-full  w-8 h-8 justify-center items-center">
              <Icon name="add" size={20} color="#777" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="p-2">
        <TouchableOpacity onPress={handelRemove} className="rounded-full border border-gray-200 w-8 h-8 justify-center items-center">
          <Icon name="close" size={18} color="#777" />
        </TouchableOpacity>
      </View>
    </View>
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

export default CartCard;
