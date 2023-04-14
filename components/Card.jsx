import { Image, StyleSheet, Text , TouchableOpacity, View  } from "react-native";
import  Icon  from "@expo/vector-icons/Ionicons"
import { useContext, useEffect, useState } from "react";
import { CatsContext } from "../context/CatsContext";
import { CartContext } from "../context/CartContext";
import api from "../axios";
import { FavoriteContext } from "../context/FavoriteContext";

const Card = ({title,price,image,id_product,all=true,navigation}) => {
    const [q,setQ]=useState(0);
    const [isAdded,setIsAdded]=useState(false);
    var working = false ;
    

    const {currentProduct,setCurrentProduct} = useContext(CatsContext);
    const {cart ,setCart,updateCart,setUpdateCart} = useContext(CartContext)


    useEffect(() => {
      let r = cart.filter((item)=> item.id_product == id_product)
      if(r.length>0){
        setQ(Number(r[0]?.quantity))
        setIsAdded(true)
      }else{
        setQ(0)
        setIsAdded(false)
      }
    }, [cart])

    const getProduct =cart.filter(item=>item.product.id_product==id_product)[0]

    // useEffect(()=>{
    //         if (q == 0) {
    //           var cartFormData = new FormData();
    //           cartFormData.append("id_cart", getProduct[0]?.id_cart);
    //           api({
    //             method: "post",
    //             url: "cart-delete",
    //             data: cartFormData,
    //             headers: { "Content-Type": "multipart/form-data" },
    //           })
    //         }
    // },[q])
    

    const add=()=>{
      if(isAdded==false){
        var cartFormData = new FormData();
        cartFormData.append("id_client", 111);
        cartFormData.append("id_product", id_product);
        cartFormData.append("quantity", 1);
        cartFormData.append("unite", "item");
        api({
          method: "post",
          url: "cart-new",
          data: cartFormData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(() => {
            setQ((pre) => pre + 1);
            setUpdateCart((pre) => pre + 1)
            setIsAdded(true)
          })
      }else{
        var cartFormData = new FormData();
        cartFormData.append("id_client", 111);
        cartFormData.append("id_product", id_product);
        cartFormData.append("quantity", Number(q) + 1);
        cartFormData.append("unite", "itme");
        api({
          method: "post",
          url: "cart-update",
          data: cartFormData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(() => {
            setQ((pre) => pre + 1);
            setUpdateCart((pre) => pre + 1)
          })
      }

    }


    const remove=()=>{
        var cartFormData = new FormData();
        cartFormData.append("id_client", 111);
        cartFormData.append("id_product", id_product);
        cartFormData.append("quantity", Number(q) - 1);
        cartFormData.append("unite", "item");
        api({
          method: "post",
          url: "cart-update",
          data: cartFormData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(() => {
              if (q <= 1) {
                var RemoveFormData = new FormData();
                RemoveFormData.append("id_cart", getProduct.id_cart);
                api({
                  method: "post",
                  url: "cart-delete",
                  data: RemoveFormData,
                  headers: { "Content-Type": "multipart/form-data" },
                }).then(() => {
                  setQ(0);
                  setUpdateCart((pre) => pre + 1)
                  setIsAdded(false)
                });
              } else {
                setQ((pre) => pre - 1);
                setUpdateCart((pre) => pre + 1)
              }
          })
    }




    // favorites code
    const [favorite, setFavorite] = useState(false);
    const { favs, setFavs , setUpdateFavs , updateFavs } = useContext(FavoriteContext);
  
    useEffect(() => {
      const favF = favs.filter((fav) => fav.id_product == id_product);
      if (favF.length > 0) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    }, [favs]);


    const getIdFavorite = () => {
      const favF = favs.filter((fav) => fav.id_product == id_product);
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
        FavFormData.append("id_product", id_product);
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



  return (
    <TouchableOpacity onPress={()=>{navigation.navigate("product");setCurrentProduct(id_product)}} style={styles.shadow} className={" p-2 bg-white rounded-2xl  relative "+(all?"mx-1 my-1 w-36":" mx-1 my-1 flex-1")}>
      <Image
        className={(all?"w-full ":"w-full ")+" h-28 object-fill"}
        style={{resizeMode: 'contain'}}
        source={{
          uri: "https://ayshadashboard.com/" + image,
        }}
      />

      <Text className="h-5">{title}</Text>
      <Text className="text-lg font-medium">{price} Dh</Text>
      <View className={q>0?"flex flex-row  pt-1 items-center justify-between":"flex flex-row  pt-1 items-center justify-end"}>
        {
            q>0 && isAdded &&
            <>
                <TouchableOpacity className=" p-1 bg-red-400 rounded-xl" onPress={remove}>
                            <Icon name="remove-outline" size={25} color="#fff" />
                </TouchableOpacity>
                <Text className="font-medium text-lg">{q}</Text>
            </>
        }
        <TouchableOpacity className="p-1 bg-[#95BF6D] rounded-xl" onPress={add}>
                    <Icon name="add-outline" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    
        <TouchableOpacity className="border border-gray-200 top-1 right-1 w-8 h-8 flex justify-center items-center bg-[#fff8] rounded-full absolute " onPress={handleFav}>
            {
                favorite? 
                    <Icon name="heart" size={25} color="#f39221" />
                    :
                    <Icon name="heart-outline" size={25} color="#f39221" />

            }
        </TouchableOpacity>
    </TouchableOpacity>
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

export default Card;
