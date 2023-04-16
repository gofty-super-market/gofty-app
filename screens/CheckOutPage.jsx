import { SafeAreaView, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import api from "../axios";

const CheckOutPage = ({navigation}) => {
  const {cart , setUpdateCart} = useContext(CartContext)
  const {userInfo , userId }=useContext(UserContext)
  const [hoursOpen,setHoursOpen]=useState(false)
  const [delivery, setDelivery] = useState(0);

  const [name,setName]=useState(userInfo?.fname+" "+userInfo?.lname)
  const [phone,setPhone]=useState(userInfo?.phone)
  const [address,setAddress]=useState(userInfo?.address)


  useEffect(()=>{
    if (cart.length==0) {
      navigation.navigate("Home") 
    }
  },[])




  const [DMethod,setDMethod]=useState(0)
  const dayHours = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"]
  const [Hours , setHours]=useState(dayHours)
  const [HourSelect, setHourSelect]=useState(0)


  useEffect(()=>{
    if(DMethod==0){
      setHours(dayHours)
      setDelivery(20)
    }else{
      api.get("sl5-hours").then((res)=>{
        setHours(res.data)
        setDelivery(5)
      })
    }
    setHoursOpen(false)
    setHourSelect(0)
  },[DMethod])













  const cleanCart = () => {
    var cartFormData = new FormData();
    cartFormData.append("id_client", userId);
    api({
      method: "post",
      url: "cart-clean",
      data: cartFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(() => {
      setUpdateCart((p) => p + 1);
    });
  };

  const checkout = (event) => {
    if (name && phone && address) {
      var cartFormData = new FormData();
      cartFormData.append("id_client", userId);
      cartFormData.append("name", name);
      cartFormData.append("phone", phone);
      cartFormData.append("address", address);
      cartFormData.append("delivery_method", DMethod? "Sl5":"normal");
      cartFormData.append("delivery_hour", Hours[HourSelect]);
      api({
        method: "post",
        url: "checkout",
        data: cartFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(() => {
        cleanCart();
        navigation.navigate("thanks")
      });
    } 
    
  };












  const price = () => {
    let p = 0;
    for (let i = 0; i < cart.length; i++) {
      p += cart[i].quantity * cart[i].product.price;
    }
    return p;
  }; 

  return (
    <SafeAreaView className="flex-1">

    <ScrollView className="flex-1 pt-8 bg-white">
      <View className="flex-row px-4">
        <View className="flex-1 pt-2">
            <View className="flex-row items-end">
            <Text className="">Price : </Text>
            <Text className="">{price()} Dh</Text>
            </View>
            <View className="flex-row items-end">
            <Text className="">Delivery : </Text>
            <Text className="">{delivery} Dh</Text>
            </View>
        </View>
        <View>
          <Text className="text-lg ">Total Price</Text>
          <Text className="text-5xl ">{price()+delivery} Dh</Text>
        </View>
      </View>
      <View className="p-4 bg-white flex-1">
        <View className="py-1">
          <Text>Name </Text>
          <TextInput value={name} onChangeText={setName} className="border rounded-md py-1 pl-3 border-gray-200 my-1 bg-gray-100"></TextInput>
        </View>
        <View className="py-1">
          <Text>Phone </Text>
          <TextInput value={phone} onChangeText={setPhone} className="border rounded-md py-1 pl-3 border-gray-200 my-1 bg-gray-100"></TextInput>
        </View>
        <View className="py-1">
          <Text>Address </Text>
          <TextInput value={address} onChangeText={setAddress} className="border rounded-md py-1 pl-3 border-gray-200 my-1 bg-gray-100"></TextInput>
        </View>
        <View>
            <Text className="mt-4">Delivery Methods</Text>
            <View className="flex-row p-2">
                <TouchableOpacity onPress={()=>setDMethod(0)} className={"py-2 px-2 rounded-full flex-row gap-x-2 justify-center items-center mr-3 "+(DMethod==0?"bg-[#95BF6d] ":"bg-gray-100 border border-gray-200")}>
                    <Text className={"text-base font-medium " + (DMethod==0?" text-white": " text-gray-500")}>Normal</Text>
                     <Icon name={DMethod==0?"checkmark-circle":"ellipse-outline"} size={20} color={DMethod==0?"#fff":"#999"} /> 
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setDMethod(1)} className={"py-2 px-2 rounded-full flex-row gap-x-2 justify-center items-center "+(DMethod==1?"bg-[#95BF6d] ":"bg-gray-100 border border-gray-200")}>
                    <Text className={"text-base font-medium " + (DMethod==1?" text-white": " text-gray-500")}>SL5</Text>
                     <Icon name={DMethod==1?"checkmark-circle":"ellipse-outline"} size={20} color={DMethod==1?"#fff":"#999"} /> 
                </TouchableOpacity>
            </View>
            <Text className="mt-4">Delivery Time</Text>
            <View className="rounded-3xl overflow-hidden my-2 border border-gray-200">
            <TouchableOpacity onPress={()=>setHoursOpen(p=>!p)} className="px-6 py-3 bg-gray-100  flex-row items-center justify-between">
                <Text className="text-base">{Hours[HourSelect]}</Text>
                <Icon name={hoursOpen?"chevron-up-outline":"chevron-down-outline"} size={20} color={"#999"} /> 
            </TouchableOpacity>
            {
              hoursOpen&&
            <ScrollView horizontal className=" bg-gray-100 py-2">
            {
              Hours.map((hour,key)=>{
                return(
                  <TouchableOpacity onPress={()=>setHourSelect(key)} key={key} className={"px-4 py-2 rounded-full ml-1  "+(key==HourSelect?"bg-[#95BF6d]":"bg-white border border-gray-200")}>
                      <Text className={"text-base "+(key==HourSelect&&"text-white")}>{hour}</Text>
                  </TouchableOpacity>
                )
              })
            }
            </ScrollView>
            }
            </View>

        </View>
      </View>

    </ScrollView>
        <View className="flex-row justify-end items-end py-2 bg-white p-4">
          <TouchableOpacity onPress={()=>{navigation.navigate("Home")}} className="py-2 px-4 bg-gray-200 rounded-full mr-4  justify-center items-center ">
            <Text className="text-base font-medium text-gray-600 ">cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={checkout} className="py-2 px-4 bg-[#95BF6d] rounded-full flex-row gap-x-2 justify-center items-center ">
            <Text className="text-base font-medium text-white ">Check out</Text>
            <Icon name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};
export default CheckOutPage;
