import { Text, TouchableOpacity, View } from "react-native";
import Cart from "./Card";
import { FlatList } from "react-native";
import { useContext, useEffect, useState } from "react";
import Icon from "@expo/vector-icons/Ionicons";
import api from "../axios";
import { CatsContext } from "../context/CatsContext";
import { FavoriteContext } from "../context/FavoriteContext";
import { ActivityIndicator } from "react-native";

const OneCat = ({ navigation, render = "cat", search, For = "nothing" }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const { cats, setCats, currentCat, setCurrentCat } = useContext(CatsContext);
  const { favs } = useContext(FavoriteContext);
  const [loading , setLoading]= useState(true)

  const catId = () => {
    let a = cats.filter((cat) => cat.name == currentCat);
    return a[0].id_category;
  };
  const runThis = () => {
    if (render == "cat") {
      setLoading(true)
      api
        .get("/products-" + catId() + "-page-" + page)
        .then((res) => {
          setProducts(res.data);
          setTimeout(() => {
            setLoading(false)
          }, 600);
        });
    } else {
      setProducts(favs);
          setTimeout(() => {
            setLoading(false)
          }, 500);
    }
  };
  useEffect(() => {
    runThis();
  }, [favs]);

  // searching code

  const searchFormData = new FormData();
  const doThisForSearch = () => {
    setLoading(true)
    if (search) {
      setProducts([]);
      if (search && search != " " && search != "0") {
        searchFormData.append("phrase", search);
        if (For == "cat") {
          searchFormData.append("id_category", catId());
        }
        api({
          method: "post",
          url: "products-search",
          data: searchFormData,
          headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => {
          setProducts(res.data);
          setTimeout(() => {
            setLoading(false)
          }, 700);
        });
      } else {
        runThis();
      }
    }
  };
  useEffect(() => {
    setLoading(true)
    doThisForSearch();
    runThis();
  }, [search]);
  useEffect(() => {
    doThisForSearch();
    runThis();
  }, [currentCat]);
  useEffect(() => {
    runThis();
  }, [page]);

  const CartItem = ({ item }) => {
    return (
      <Cart render={render} all={false} {...item} navigation={navigation} />
    );
  };

  const pages = () => {
    let a = cats.filter((catt) => catt.name == currentCat);
    return Number(a[0].nbr_pages);
  };

  return (
    <View className="flex-1 mx-2 pb-16 ">
      {(products.length > 0)&&!loading ? (
        <>
          <FlatList
            className=" flex-1"
            data={products}
            keyExtractor={(item) => item.id_product}
            renderItem={CartItem}
            numColumns={2}
          />
            {
              render=="cat"&& pages()>1 &&
          <View className="flex-row justify-center py-3">

              <View className="bg-white items-center flex-row rounded-full">
                <TouchableOpacity
                  className="p-3 rounded-full"
                  onPress={() => {
                    if (!(page <= 1)) {
                      setPage((p) => p - 1);
                    }
                  }}
                >
                  <Icon
                    name="arrow-back-outline"
                    size={20}
                    color={page <= 1 ? "#aaa" : "#333"}
                  />
                </TouchableOpacity>
                <Text className="text-lg m-2">
                  {page} | {pages()}
                </Text>
                <TouchableOpacity
                  className="p-3 rounded-full"
                  onPress={() => {
                    if (pages() > page) {
                      setPage((p) => p + 1);
                    }
                  }}
                >
                  <Icon
                    name="arrow-forward-outline"
                    size={20}
                    color={pages() > page ? "#333" : "#aaa"}
                  />
                </TouchableOpacity>
              </View>
          </View>
            }
        </>
      ) : (
        loading?
        <View className="justify-center items-center h-32 ">
          <View className="bg-white p-3 px-6 rounded-full border flex-row border-gray-200">
            <Text className="text-lg text-gray-600 mr-1">Loading </Text>
            <ActivityIndicator color={"#777"} />
          </View>
        </View>
        :
        <View className="justify-center items-center h-32 ">
          <Text className="text-lg text-gray-600 bg-white p-3 px-6 rounded-full border border-gray-200">No Results</Text>
        </View>
      )}
    </View>
  );
};
export default OneCat;
