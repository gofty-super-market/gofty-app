import { SafeAreaView, TouchableHighlight, TouchableOpacity } from "react-native"
import  Icon  from "@expo/vector-icons/Ionicons"
import { ScrollView ,Image , Text,View } from "react-native"
import CatSlider from "../components/CatSlider"
import OneCat from "../components/OneCat"
import { CatsContext } from "../context/CatsContext"
import { useContext, useEffect, useState } from "react"
import api from "../axios"
import { CartContext } from "../context/CartContext"
import { FavoriteContext } from "../context/FavoriteContext"

const ProductPage =({navigation})=>{
    const [q,setQ]=useState(1)
    const {cats,currentProduct,setCurrentCat,setCurrentProduct} = useContext(CatsContext);
    const [productInfo,setProductInfo]=useState({})
    const {cart ,setCart,updateCart,setUpdateCart} = useContext(CartContext)
    const { favs, setFavs , setUpdateFavs , updateFavs } = useContext(FavoriteContext);

    const catTitle = () => {
        let a = cats?.filter((cat) => cat?.id_category == productInfo?.id_category);
        return a[0].name;
    };

    useEffect(() => {
        api.get("/product-" + currentProduct).then((res) => {setProductInfo(res.data) });
    }, [currentProduct]);
    useEffect(()=>{
        setCurrentCat(catTitle())
    })

    const getProduct = cart.filter((item) => {
        return item.product.id_product == productInfo.id_product;
    });
    const isAdded = () => {
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].product.id_product == productInfo.id_product) {
            return true;
          }
        }
        return false;
    };
    
    const addtocartHandler = () => {
          if (isAdded()) {
            var cartFormData = new FormData();
            cartFormData.append("id_client", 111);
            cartFormData.append("id_product", productInfo.id_product);
            cartFormData.append("quantity", Number(getProduct[0].quantity) + q);
            cartFormData.append("unite", "itme");
            api({
              method: "post",
              url: "cart-update",
              data: cartFormData,
              headers: { "Content-Type": "multipart/form-data" },
            }).then(() => {
              setUpdateCart((p) => p + 1);
            });
          } else {
            var cartFormData = new FormData();
            cartFormData.append("id_client", 111);
            cartFormData.append("id_product", productInfo.id_product);
            cartFormData.append("quantity", q);
            cartFormData.append("unite", "itme");
            api({
              method: "post",
              url: "cart-new",
              data: cartFormData,
              headers: { "Content-Type": "multipart/form-data" },
            }).then(() => {
              setUpdateCart((p) => p + 1);
            });
          }
      };

      const handelQChange = (i) => {
        if (q <= 1 && i == -1) {
          setQ(1);
        } else {
          setQ((q) => q + i);
        }
      };











      const [favorite, setFavorite] = useState(false);

      useEffect(() => {
        const favF = favs.filter((fav) => fav.id_product == productInfo.id_product);
        if (favF.length > 0) {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
      }, [favs]);
    
      useEffect(() => {
        const favF = favs.filter((fav) => fav.id_product == productInfo.id_product);
        if (favF.length > 0) {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
      }, [productInfo]);
    
      const getIdFavorite = () => {
        const favF = favs.filter((fav) => fav.id_product == productInfo.id_product);
        if (favF.length > 0) {
          return favF[0].id_favorite;
        } else {
          return null;
        }
      };
    
      const handleFav = () => {
        if (!favorite) {
          const FavFormData = new FormData();
          FavFormData.append("id_client", 111);
          FavFormData.append("id_product", productInfo.id_product);
          api({
            method: "post",
            url: "favorite-add",
            data: FavFormData,
            headers: { "Content-Type": "multipart/form-data" },
          }).then((res) => {
            setFavorite(true);
          });
        } else {
          const FavFormData = new FormData();
          FavFormData.append("id_favorite", getIdFavorite());
          api({
            method: "post",
            url: "favorite-delete",
            data: FavFormData,
            headers: { "Content-Type": "multipart/form-data" },
          }).then((res) => {
            setFavorite(false);
          });
        }
        setUpdateFavs(p=>p+1)
      };












    return(
        <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 bg-white ">
            <View className="flex-row justify-between items-center p-4">
                    <TouchableOpacity onPress={()=>navigation.navigate("Home")} className="p-2 pr-4 rounded-full flex justify-center items-center ">
                            <Icon name="arrow-back-outline" size={25} color="#777" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleFav}  className="p-2 rounded-full flex justify-center items-center">
                        {
                        favorite? 
                            <Icon name="heart" size={25} color="#f39221" />
                            :
                            <Icon name="heart-outline" size={25} color="#f39221" />
                        }
                    </TouchableOpacity>
            </View>
            <View className="bg-white ">
            <Image
                className={"w-[90%] my-4 h-60 mx-auto"}
                style={{resizeMode: 'contain'}}
                source={{
                    uri: "https://ayshadashboard.com/" + productInfo.image,
                }}
            />
            </View>
            <View className="p-4 bg-white ">
                <Text className=" text-xl">{productInfo?.title || "product name"}</Text>
                <Text className=" text-4xl pt-1">{productInfo?.price || 0} Dh</Text>
                <Text className=" text-base">Per {productInfo?.unite || "item"}</Text>
                <Text className=" text-gray-500 mt-4">{productInfo?.description || "no description in this product"}</Text>
            </View>
            <View className="bg-white flex-row p-4 justify-between items-center">
                <View className="flex-row  bg-gray-100 border border-gray-200 rounded-full flex justify-center items-center">
                    <TouchableOpacity onPress={()=>handelQChange(-1)} className="p-2 rounded-full flex justify-center items-center ">
                            <Icon name="remove-outline" size={25} color="#777" />
                    </TouchableOpacity>
                    <Text className="text-base text-gray-500 mx-2">
                    {q}
                    </Text> 
                    <TouchableOpacity  onPress={()=>handelQChange(1)} className="p-2 rounded-full flex justify-center items-center">
                            <Icon name="add-outline" size={25} color="#777" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={addtocartHandler} className="py-2 px-4  bg-[#95BF6D] rounded-full flex-row justify-center items-center ">
                    <Icon name="cart-outline" size={25} color="#fff" />
                    <Text className="text-white ml-2">Add to cart</Text>
                </TouchableOpacity>
            </View>
            {/* <CatSlider navigation={navigation} title="related"></CatSlider> */}
            <Text className="mt-4 p-4 text-2xl font-bold text-gray-700">Related</Text>
            <OneCat  navigation={navigation}></OneCat>
        </ScrollView>
        </SafeAreaView>
    )
}
export default ProductPage