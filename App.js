import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import { View } from "react-native";
import { Text } from "react-native";
import { StatusBar } from "react-native";



import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CheckOutPage from "./screens/CheckOutPage";

const Stack = createNativeStackNavigator();



export default function App() {
  const theme = "Light"
  return (
    <NavigationContainer>
        <StatusBar
      backgroundColor={theme == 'Light' ? '#fff' : '#000'}
      barStyle={theme == 'Light' ? 'dark-content' : 'light-content'}
      />
    <Stack.Navigator>
    <Stack.Screen name="Home" options={{headerShown:false}} component={Tabs} />
    <Stack.Screen name="checkout"  options={{headerShown:false}} component={CheckOutPage}  />
             
                
    </Stack.Navigator>
    </NavigationContainer>
  );
}

