import { Image, StyleSheet, Text , TouchableOpacity, View  } from "react-native";
import  Icon  from "@expo/vector-icons/Ionicons"
import { useState } from "react";

const Card = ({title,price,image,all=true}) => {
    const [q,setQ]=useState(0)
    const [favorite , setFavorite]=useState(false)
    const add =()=>{
        setQ(q=>q+1)
    }
    const remove =()=>{
        setQ(q=>q-1)
    }
  return (
    <View style={styles.shadow} className={" p-2 bg-white rounded-2xl  relative "+(all?"mx-1 my-1 w-32":" mx-1 my-1 flex-1")}>
      <Image
        className={(all?"w-full ":"w-full ")+" h-28 object-fill"}
        style={{resizeMode: 'contain'}}
        source={{
          uri: image,
        }}
      />

      <Text>{title}</Text>
      <Text className="text-lg font-medium">{price} Dh</Text>
      <View className={q>0?"flex flex-row  pt-1 items-center justify-between":"flex flex-row  pt-1 items-center justify-end"}>
        {
            q>0 &&
            <>
                <TouchableOpacity className=" p-1 bg-red-400 rounded-xl" onPress={remove}>
                            <Icon name="remove-outline" size={25} color="#fff" />
                </TouchableOpacity>
                <Text className="font-medium text-lg">{q}</Text>
            </>
        }
        <TouchableOpacity className="p-1 bg-[#95BF6D] rounded-xl" onPress={add}>
                    <Icon name="add-outline" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    
        <TouchableOpacity className="border border-gray-200 top-1 right-1 w-8 h-8 flex justify-center items-center bg-[#fff8] rounded-full absolute " onPress={()=>setFavorite(f=>!f)}>
            {
                favorite? 
                    <Icon name="heart" size={25} color="#f39221" />
                    :
                    <Icon name="heart-outline" size={25} color="#f39221" />

            }
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    shadow:{
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity:  0.16,
        shadowRadius: 1.51,
        elevation: 2 
}
})

export default Card;
