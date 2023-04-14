import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';

import api from "../axios"
import { CatsContext } from '../context/CatsContext';

const CatBar = () => {

const {cats,setCats,currentCat,setCurrentCat} = useContext(CatsContext);

useEffect(()=>{
    api.get("/categories").then(res =>{ setCats([{name:"all"},...res.data])})
},[])



  return (
    <ScrollView
          horizontal={true}
          className=" mx-2 py-2  bg-white flex-row "
        >
          {cats?.map((cat, key) => {
            return (
              <TouchableOpacity key={key} onPress={() => setCurrentCat(cat.name)}>
                <Text
                  className={
                    "mx-1 p-2 px-4 rounded-full border border-gray-300 w-fit bg-white " +
                    (cat.name == currentCat &&
                      " bg-[#95BF6D] border-[#95BF6d] text-white font-medium px-6")
                  }
                >
                  {cat?.name }
                </Text>
              </TouchableOpacity>
            );
          })}
    </ScrollView>
  )
}

export default CatBar