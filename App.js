import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import { View } from "react-native";
import { Text } from "react-native";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CheckOutPage from "./screens/CheckOutPage";
import ProductPage from "./screens/ProductPage";
import Card from "./components/Card";
import WelcomePage from "./screens/Welcome/WelcomePage";
import { CatsContext } from "./context/CatsContext";
import { useEffect, useState } from "react";
import { CartContext } from "./context/CartContext";
import api from "./axios";
import { FavoriteContext } from "./context/FavoriteContext";
import { UserContext } from "./context/UserContext";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Wlcm from "./screens/Wlcm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Thanks from "./screens/Thanks";
import { OrederContext } from "./context/OrederContext";
import OrderPage from "./screens/OrderPage";

const Stack = createNativeStackNavigator();



export default function App() {
  const theme = "Light"

  // userContext 
  const [userId,setUserId]=useState(null)
  const [userInfo , setUserInfo ] = useState({})
  useEffect(() => {
    if (userId) {
      api.get("/client-" + userId).then((res) => {
        setUserInfo(res.data);
      });
    }
    setUpdateCart(p=>p+1)
    setUpdateFavs(p=>p+1)
  }, [userId]);
  useEffect(()=>{
    AsyncStorage.getItem("userId").then((val)=>{
      setUserId(val)
    })
  },[])


  // orders context
  const [history, setHistory] = useState([]);
  const [updateHistory , setUpdateHistory ]=useState(0)
  const [currentOrder,setCurrentOrder]=useState(null)

  const HisFormData = new FormData();
  useEffect(() => {
    HisFormData.append("nbr_orders", 15);
    api({
      method: "post",
      url: "orders-" + userId,
      data: HisFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      setHistory(res.data);
      console.log(res.data);
    });
  }, [userId]);
  useEffect(() => {
    HisFormData.append("nbr_orders", 15);
    api({
      method: "post",
      url: "orders-" + userId,
      data: HisFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      setHistory(res.data);
      console.log(res.data);
    });
  }, [updateHistory]);


  // cat context
  const [cats,setCats]=useState();
  const [currentCat,setCurrentCat]=useState("all");
  const [currentProduct,setCurrentProduct]=useState(null);


  // cart context
  const [cart,setCart]= useState([])
  const [updateCart,setUpdateCart]= useState(0)
  const cartFormData = new FormData();
  cartFormData.append("id_client", userId);
  useEffect(() => {
    if(userId){

    api({
      method: "post",
      url: "cart",
      data: cartFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        if (Array.isArray(response.data)) {
          setCart(response.data);
        }
      })
      .catch(function (response) {
        console.log(response);
      });

    }else{
      setCart([])
    }
  }, [updateCart]);


  // favorites context
  const [favs, setFavs] = useState([]);
  const [updateFavs,setUpdateFavs]=useState(0)
  const FavFormData = new FormData();
  useEffect(() => {
    if (userId) {
    FavFormData.append("id_client", userId );
    api({
      method: "post",
      url: "favorites",
      data: FavFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      setFavs(res.data);
    });
    }else{
      setFavs([])
    }
  }, [updateFavs]);


  return (
    <UserContext.Provider value={{userId,setUserId,userInfo,setUserInfo}}>
      <FavoriteContext.Provider value={{favs,setFavs,updateFavs,setUpdateFavs}}>
        <CatsContext.Provider value={{cats,setCats,currentCat,setCurrentCat,currentProduct,setCurrentProduct}}>
          <CartContext.Provider value={{cart,setCart,updateCart,setUpdateCart}}>
            <OrederContext.Provider value={{history,setHistory,updateHistory,setUpdateHistory,currentOrder,setCurrentOrder}}>


              <NavigationContainer>
                  <StatusBar backgroundColor={theme == 'Light' ? '#fff' : '#000'} barStyle={theme == 'Light' ? 'dark-content' : 'light-content'}/>
              <Stack.Navigator>
                <Stack.Screen name="welcome" options={{headerShown:false}} component={WelcomePage} />
                <Stack.Screen name="Home" options={{headerShown:false}} component={Tabs} />
                <Stack.Screen name="checkout"  options={{headerShown:false}} component={CheckOutPage}  />
                <Stack.Screen name="product"  options={{headerShown:false}} component={ProductPage}  />
                <Stack.Screen name="signup"  options={{headerShown:false}} component={SignUp}  />
                <Stack.Screen name="signin"  options={{headerShown:false}} component={SignIn}  />
                <Stack.Screen name="wlcm"  options={{headerShown:false}} component={Wlcm}  />
                <Stack.Screen name="thanks"  options={{headerShown:false}} component={Thanks}  />
                <Stack.Screen name="order"  options={{headerShown:false}} component={OrderPage}  />
              </Stack.Navigator>
              </NavigationContainer>

            </OrederContext.Provider>
          </CartContext.Provider>
        </CatsContext.Provider>
      </FavoriteContext.Provider>
    </UserContext.Provider>
  );
}

