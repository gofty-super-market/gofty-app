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
        shadowColor: "#3334",
        shadowOffset:{
            width:0,
            height:10,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5
    }
})

  const screenOptions = {
    tabBarStyle:{
            position:'absolute',
            bottom:15,
            left:20,
            right:20,
            elevation:0,
            backgroundColor:"#fff",
            borderRadius:15,
            height:60,
            ...styles.shadow
    },
  };

const Tabs = ()=>{
    return(
        <Tab.Navigator
            className="bg-red-500"
            {...{screenOptions}}
            tabBarOptions={{
                showLabel:false,
            }} 
        >
            <Tab.Screen name="Home" component={Home} options={{
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
            }}/>
            <Tab.Screen name="Market" component={Market}

             options={{
                headerShown:false,
                tabBarIcon:({focused})=>(
                    <View className={(focused?"bg-[#95BF6D]":"")+" p-2 rounded-xl"}>
                        {
                            focused?
                            <Image className="w-7 h-7" source={require("../assets/icons/marketWhite.png")}/>
                            :
                            <Image className="w-6 h-6" source={require("../assets/icons/market.png")}/>
                        }
                    </View> 
                )
            }}/>
            <Tab.Screen name="Cart" component={Cart} options={{
                tabBarIcon:({focused})=>(
                    <View className={(focused?"bg-[#95BF6D]":"")+" p-2 rounded-xl duration-200"}>
                        {
                            focused?
                            <Image className="w-7 h-7" source={require("../assets/icons/cartWhite.png")}/>
                            :
                            <Image className="w-6 h-6" source={require("../assets/icons/cart.png")}/>
                        }
                    </View> 
                )
            }}/>
            <Tab.Screen name="Favorites" component={Favorites} options={{
                tabBarIcon:({focused})=>(
                    <View className={(focused?"bg-[#95BF6D]":"")+" p-2 rounded-xl"}>
                        {
                            focused?
                            <Image className="w-7 h-7" source={require("../assets/icons/likedWhite.png")}/>
                            :
                            <Image className="w-6 h-6" source={require("../assets/icons/liked.png")}/>
                        }
                    </View> 
                )
            }}/>
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon:({focused})=>(
                    <View className={(focused?"bg-[#95BF6D]":"")+" p-2 rounded-xl"}>
                        {
                            focused?
                            <Image className="w-6 h-6" source={require("../assets/icons/profileWhite.png")}/>
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