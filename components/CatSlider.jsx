import { View } from "react-native";
import Cart from "./Card";
import { Text } from "react-native";
import { ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { CatsContext } from "../context/CatsContext";
import api from "../axios";
import Card from "./Card";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";

const CatSlider = ({ ttl, navigation }) => {
  const [products, setProducts] = useState([]);
  const {setCurrentCat } = useContext(CatsContext);

  useEffect(() => {
    if (ttl == "For You") {
      let cartFormData = new FormData();
      cartFormData.append("nbr_products", 10);
      api({
        method: "post",
        url: "products-random",
        data: cartFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => setProducts(res.data));
    } else{
      api({
        method: "get",
        url: "products-new",
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => setProducts(res.data));
    }
  }, []);

  return (
    products?.length > 0 && (
      <View>
        <View className="flex-row justify-between items-center px-2 mt-4">
          <Text className="text-2xl text-gray-700 font-medium px-2 ">
            {ttl}
          </Text>
        </View>

        <ScrollView horizontal={true} className="m-1 ">
          {products.map((item, key) => {
            return (
              <Card
                all={true}
                {...item}
                navigation={navigation}
                key={key}
              ></Card>
            );
          })}
        </ScrollView>
      </View>
    )
  );
};
export default CatSlider;
