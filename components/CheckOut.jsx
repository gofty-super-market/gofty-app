import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { TextInput } from "react-native";
import { ScrollView } from "react-native";

const CheckOut = ({navigation}) => {
  const [open, setOpen] = useState(false);
  
  return (
    <View className="">
      <View className="bg-white p-3 flex-row justify-between items-end">
        <View>
          <Text className="">Total Price </Text>
          <Text className="text-4xl mt-1">156 Dh</Text>
        </View>
        <View>
            <TouchableOpacity onPress={()=>navigation.navigate("checkout")} className="py-2 px-4 bg-[#95BF6d] rounded-full flex-row gap-x-2 justify-center items-center ">
              <Text className="text-base font-medium text-white ">
                Check out
              </Text>
              <Icon name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
      </View>

      {false && (
        <>
        </>
      )}
    </View>
  );
};
export default CheckOut;
