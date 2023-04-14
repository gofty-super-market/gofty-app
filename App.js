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

const Stack = createNativeStackNavigator();



export default function App() {
  const theme = "Light"

  // cat context
  const [cats,setCats]=useState();
  const [currentCat,setCurrentCat]=useState("all");
  const [currentProduct,setCurrentProduct]=useState(null);


  // cart context
  const [cart,setCart]= useState([])
  const [updateCart,setUpdateCart]= useState(0)
  const cartFormData = new FormData();
  cartFormData.append("id_client", 111);
  useEffect(() => {
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
  }, [updateCart]);



  // favorites context
  const [favs, setFavs] = useState([]);
  const [updateFavs,setUpdateFavs]=useState(0)
  const FavFormData = new FormData();
  useEffect(() => {
    FavFormData.append("id_client", 111 );
    api({
      method: "post",
      url: "favorites",
      data: FavFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      setFavs(res.data);
    });
  }, [updateFavs]);



  return (
    <FavoriteContext.Provider value={{favs,setFavs,updateFavs,setUpdateFavs}}>
      <CatsContext.Provider value={{cats,setCats,currentCat,setCurrentCat,currentProduct,setCurrentProduct}}>
        <CartContext.Provider value={{cart,setCart,updateCart,setUpdateCart}}>

          <NavigationContainer>
              <StatusBar backgroundColor={theme == 'Light' ? '#fff' : '#000'} barStyle={theme == 'Light' ? 'dark-content' : 'light-content'}/>
          <Stack.Navigator>
          {/* <Stack.Screen name="welcome" options={{headerShown:false}} component={WelcomePage} /> */}
            <Stack.Screen name="Home" options={{headerShown:false}} component={Tabs} />
            <Stack.Screen name="checkout"  options={{headerShown:false}} component={CheckOutPage}  />
            <Stack.Screen name="product"  options={{headerShown:false}} component={ProductPage}  />
          </Stack.Navigator>
          </NavigationContainer>

        </CartContext.Provider>
      </CatsContext.Provider>
    </FavoriteContext.Provider>
  );
}

