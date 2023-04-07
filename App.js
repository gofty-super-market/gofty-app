import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import { View } from "react-native";
import { Text } from "react-native";

export default function App() {
  return (
    <NavigationContainer>
      <Tabs/>
    </NavigationContainer>
  );
}

