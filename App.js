import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import { View } from "react-native";
import { Text } from "react-native";
import { StatusBar } from "react-native";

export default function App() {
  const theme = "Light"
  return (
    <NavigationContainer>
        <StatusBar
      backgroundColor={theme == 'Light' ? '#fff' : '#000'}
      barStyle={theme == 'Light' ? 'dark-content' : 'light-content'}
      />
      <Tabs/>
    </NavigationContainer>
  );
}

