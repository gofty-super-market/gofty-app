import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Market from "../screens/Market";
import Cart from "../screens/Cart";
import Favorites from "../screens/Favorites";
import Profile from "../screens/Profile";
import { Image, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();



const Tabs = ({navigation})=>{
    const {cart , setUpdateCart } = useContext(CartContext)

  useEffect(() => {
    AsyncStorage.getItem("Open").then((value) => {
      if (value !== "opened") {
        navigation.navigate("welcome");
      }
    });
  }, []);

    return(

        <Tab.Navigator
            className="bg-red-500 "
            {...{screenOptions}}
            tabBarOptions={{
                showLabel:false,
            }} 
        >
            {/* <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon:({focused})=>(
                    <View className={(focused?"bg-[#95BF6D]":"")+" p-2 rounded-xl"}>
                        {
                            focused?
                            <Image className="w-7 h-7" source={require("../assets/icons/homeWhite.png")}/>
                            :
                            <Image className="w-6 h-6" source={require("../assets/icons/home.png")}/>
                        }
                    </View> 
                )
            }}/> */}
            <Tab.Screen name="Market" component={Market}
            onPress={()=>setUpdateCart(p=>1+p)}
             options={{
                headerShown:false,
                tabBarIcon:({focused})=>(
                    <View className={(focused?" items-center bg-[#95BF6D] flex flex-row ":" bg-gray-100 ")+" p-2 rounded-2xl"}>
                        {
                            focused?
                            <>
                            <Image className="w-5 h-5" source={require("../assets/icons/marketWhite.png")}/>
                            <Text className="text-white p-1 font-medium">Market</Text>
                            </>

                            :
                            <Image className="w-6 h-6" source={require("../assets/icons/market.png")}/>
                        }
                    </View> 
                )
            }}/>
            <Tab.Screen name="Cart" component={Cart} options={{
                headerShown:false,
                tabBarIcon:({focused})=>(
                    <View className={(focused?" items-center bg-[#95BF6D] flex flex-row ":" bg-gray-100 ")+" p-2 rounded-2xl"}>
                        {
                            focused?
                            <>
                            <Image className="w-5 h-5" source={require("../assets/icons/cartWhite.png")}/>
                            <Text className="text-white p-1 font-medium">Cart</Text>
                            { cart.length>0 && <View className="w-3 h-3 bg-white border-2 border-[#95bf6d] absolute rounded-full -top-0 -right-0 "></View> }
                            </>
                            :
                            <>
                            <Image className="w-6 h-6" source={require("../assets/icons/cart.png")}/>
                            { cart.length>0 && <View className="w-3 h-3 bg-[#95bf6d] border-2 border-white absolute rounded-full -top-0 -right-0 "></View>}
                            </>
                        }
                    </View> 
                )
            }}/>
            <Tab.Screen name="Favorites" component={Favorites} options={{
                headerShown:false,
                tabBarIcon:({focused})=>(
                    <View className={(focused?" items-center bg-[#95BF6D] flex-row":" bg-gray-100 ")+" p-2 rounded-2xl"}>
                        {
                            focused?
                            <>
                            <Image className="w-5 h-5" source={require("../assets/icons/likedWhite.png")}/>
                            <Text className="text-white p-1 font-medium">Liked</Text>
                            </>
                            :
                            <Image className="w-6 h-6" source={require("../assets/icons/liked.png")}/>
                        }
                    </View> 
                )
            }}/>
            <Tab.Screen name="Profile" component={Profile} options={{
                headerShown:false,
                tabBarIcon:({focused})=>(
                    <View className={(focused?" items-center bg-[#95BF6D] flex-row ":" bg-gray-100 ")+" p-2 rounded-2xl"}>
                        {
                            focused?
                            <>
                            <Image className="w-5 h-5" source={require("../assets/icons/profileWhite.png")}/>
                            <Text className="text-white p-1 font-medium">Profile</Text>
                            </>
                            :
                            <Image className="w-6 h-6" source={require("../assets/icons/profile.png")}/>
                        }
                    </View> 
                )
            }}/>
        </Tab.Navigator>
    );
}


const styles = StyleSheet.create({
    shadow:{
    shadowColor: "#000000",
    shadowOffset: {
    width: 0,
    height: 18,
    },
    shadowOpacity:  0.25,
    shadowRadius: 20.00,
    elevation: 24
    }
})


  const screenOptions = {
    tabBarStyle:{
            position:'absolute',
            left:0,
            right:0,
            paddingHorizontal:20,
            elevation:0,
            backgroundColor:"#fffe",
            borderTopLeftRadius:25,
            borderTopRightRadius:25,
            height:60,
            justifyContent:"space-between"
    },
  };


export default Tabs