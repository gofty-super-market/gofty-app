import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { useState } from "react";

const CartCard = ({ title, price, image, all = true }) => {
  const [q, setQ] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const add = () => {
    setQ((q) => q + 1);
  };
  const remove = () => {
    setQ((q) => q - 1);
  };
  return (
    <View
      style={styles.shadow}
      className={
        "overflow-hidden bg-white rounded-2xl  relative flex-row mx-3 my-1"
      }
    >
      <Image
        className={"w-28 h-28 object-fill"}
        style={{ resizeMode: "contain" }}
        source={{
          uri: image,
        }}
      />
      <View className="p-2 flex-1">
        <Text className="text-base">{title}</Text>
        <Text className="text-xl">{price} Dh</Text>
        <View className="flex-row mt-2">
          <View className="flex-row items-center bg-white border border-gray-200 rounded-full">
            <TouchableOpacity className="rounded-full  w-8 h-8 justify-center items-center">
              <Icon name="remove" size={20} color="#777" />
            </TouchableOpacity>
            <Text className="px-2">{q}</Text>
            <TouchableOpacity className="rounded-full  w-8 h-8 justify-center items-center">
              <Icon name="add" size={20} color="#777" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="p-2">
        <TouchableOpacity className="rounded-full border border-gray-200 w-8 h-8 justify-center items-center">
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
