import { Text, View } from "react-native"
import Cart from "./Card"
import { FlatList } from "react-native"
import { useContext, useEffect, useState } from "react"
import api from "../axios"
import { CatsContext } from "../context/CatsContext"
import { FavoriteContext } from "../context/FavoriteContext"

const OneCat = ({navigation,render="cat"})=>{
    const [products, setProducts]=useState([])
    const [page, setPage] = useState(1)
    const {cats,setCats,currentCat, setCurrentCat} = useContext(CatsContext);
    const {favs}= useContext(FavoriteContext)

    const catId = () => {
        let a = cats.filter((cat) => cat.name == currentCat);
        return a[0].id_category;
    };

    useEffect(()=>{
        if(render=="cat"){
            api
              .get("/products-" + catId() + "-page-" + page)
              .then((res) => setProducts(res.data));
        }else{
            setProducts(favs)
        }
    },[currentCat])
    useEffect(()=>{
        if(render=="cat"){
            api
              .get("/products-" + catId() + "-page-" + page)
              .then((res) => setProducts(res.data));
        }else{
            setProducts(favs)
        }
    },[favs])
    const CartItem = ({item})=>{
        return(
            <Cart all={false} {...item} navigation={navigation} />
        )
    }

    return(
                <View className="flex-1 mx-2 pb-16 ">

                <FlatList
                className=" flex-1"
                data={products} 
                keyExtractor={item => item.id_product}
                renderItem={CartItem}
                numColumns={2}
                />
                </View>
    )
}
export default OneCat