const { View, Text, TextInput, SafeAreaView } = require("react-native")

import { Layout, set } from "react-native-reanimated"
import GlobalStyles from "../components/GlobalStyles"
import { Button, ScrollView, TouchableOpacity } from "react-native"
import  Icon  from "@expo/vector-icons/Ionicons"
import { useState } from "react"

const Market = ()=>{
    const [search,setSearch]=useState('')
    const [openSearch, setOpenSearch]=useState(false)
    const [ catagories , setCatagories ] = useState(["all","snacks","electro","food","patisserie","hygiene"])
    const [ currentCat , setCurrentCat ] = useState("all")

    return(
        <View>

        <View style={GlobalStyles.AndroidSafeArea} className="border-b-2 border-gray-200 bg-white ">
            <View className="flex flex-row px-4 pt-4 pb-2 justify-between items-center">
                <Text className="text-4xl  pb-1 font-medium text-gray-700">Market</Text>
                    <TouchableOpacity onPress={()=>{setOpenSearch(p=>!p);setSearch("")}} className="w-10 h-10 flex justify-center items-center bg-white p-2 rounded-full border border-gray-300">
                        {
                            openSearch?
                        <Icon name="close-outline" size={22} color="#888"  />
                        :
                        <Icon name="search-outline" size={20} color="#888" />

                        }
                    </TouchableOpacity>
            </View>
            {
                openSearch &&
                <View className="bg-gray-100 border border-gray-300 m-2 mx-2 rounded-full overflow-hidden px-2 pl-4 h-10 shadow-md flex flex-row items-center">
                    <TextInput value={search} onChangeText={(val)=>setSearch(val)} className="h-full text-lg flex-1"></TextInput>
                    {
                        search.length>0?
                    <TouchableOpacity onPress={()=>setSearch('')}>
                        <Icon name="close-circle" size={25} color="#888" />
                    </TouchableOpacity>
                    :
                    <Icon name="search-outline" size={25} color="#888" />
                    }
                </View>

            }
        </View>
        <ScrollView>
                <ScrollView horizontal={true} className="flex flex-row gap-x-1 my-1 mx-2  py-1 ">
                    {
                        catagories.map((cat,key)=>{
                            return(
                                <TouchableOpacity key={key} onPress={()=>setCurrentCat(cat)}>
                                <Text className={"p-2 px-4 rounded-full border border-gray-300 w-fit bg-white " +(cat==currentCat && " bg-[#95BF6D] text-white font-medium")}>{cat}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>

        <View>

            <View className="h-20 rounded-lg bg-gray-200 m-1"></View>
            <View className="h-20 rounded-lg bg-gray-200 m-1"></View>
            <View className="h-20 rounded-lg bg-gray-200 m-1"></View>
            <View className="h-20 rounded-lg bg-gray-200 m-1"></View>
            <View className="h-20 rounded-lg bg-gray-200 m-1"></View>
            <View className="h-20 rounded-lg bg-gray-200 m-1"></View>
            <View className="h-20 rounded-lg bg-gray-200 m-1"></View>
            <View className="h-20 rounded-lg bg-gray-200 m-1"></View>
            <View className="h-20 rounded-lg bg-gray-200 m-1"></View>
            <View className="h-20 rounded-lg bg-gray-200 m-1"></View>
            <View className="h-20 rounded-lg bg-gray-200 m-1"></View>
            <View className="h-20 rounded-lg bg-gray-200 m-1"></View>
            <View className="h-20 rounded-lg bg-gray-200 m-1"></View>
            <View className="h-20 rounded-lg bg-gray-200 m-1"></View>

        </View>
        </ScrollView>
        </View>
    )
}
export default Market