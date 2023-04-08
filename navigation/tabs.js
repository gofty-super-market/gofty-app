import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Market from "../screens/Market";
import Cart from "../screens/Cart";
import Favorites from "../screens/Favorites";
import Profile from "../screens/Profile";
import { Image, StyleSheet, Text, View } from "react-native";

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
    shadow:{
        shadowColor: "#333",
        shadowOffset:{
            width:0,
            height:15,
        },
        shadowOpacity:0.25,
        shadowRadius:0.5,
        elevation:15
    }
})

  const screenOptions = {
    tabBarStyle:{
            position:'absolute',
            left:0,
            right:0,
            paddingHorizontal:20,
            elevation:0,
            backgroundColor:"#fff",
            borderRadius:10,
            height:60,
            ...styles.shadow
    },
  };

const Tabs = ()=>{
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

             options={{
                headerShown:false,
                tabBarIcon:({focused})=>(
                    <View className={(focused?"bg-[#95BF6D] flex flex-row ":" bg-gray-100 ")+" p-2 rounded-2xl"}>
                        {
                            focused?
                            <>
                            <Image className="w-6 h-6" source={require("../assets/icons/marketWhite.png")}/>
                            <Text className="text-white p-1 font-medium">Market</Text>
                            </>

                            :
                            <Image className="w-6 h-6" source={require("../assets/icons/market.png")}/>
                        }
                    </View> 
                )
            }}/>
            <Tab.Screen name="Cart" component={Cart} options={{
                tabBarIcon:({focused})=>(
                    <View className={(focused?"bg-[#95BF6D] flex-row":" bg-gray-100 ")+" p-2 rounded-2xl duration-200"}>
                        {
                            focused?
                            <>
                            <Image className="w-6 h-6" source={require("../assets/icons/cartWhite.png")}/>
                            <Text className="text-white p-1 font-medium">Cart</Text>
                            </>
                            :
                            <Image className="w-6 h-6" source={require("../assets/icons/cart.png")}/>
                        }
                    </View> 
                )
            }}/>
            <Tab.Screen name="Favorites" component={Favorites} options={{
                tabBarIcon:({focused})=>(
                    <View className={(focused?"bg-[#95BF6D] flex-row":" bg-gray-100 ")+" p-2 rounded-2xl"}>
                        {
                            focused?
                            <>
                            <Image className="w-7 h-7" source={require("../assets/icons/likedWhite.png")}/>
                            <Text className="text-white p-1 font-medium">Liked</Text>
                            </>
                            :
                            <Image className="w-6 h-6" source={require("../assets/icons/liked.png")}/>
                        }
                    </View> 
                )
            }}/>
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon:({focused})=>(
                    <View className={(focused?"bg-[#95BF6D] flex-row ":" bg-gray-100 ")+" p-2 rounded-2xl"}>
                        {
                            focused?
                            <>
                            <Image className="w-6 h-6" source={require("../assets/icons/profileWhite.png")}/>
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





export default Tabs