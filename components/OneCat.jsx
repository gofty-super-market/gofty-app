import { View } from "react-native"
import Cart from "./Card"
import { FlatList } from "react-native"
import { useState } from "react"

const OneCat = ()=>{
    const [products, setProducts]=useState([
        {key:0,title:"product 0",price:10,image:"https://ayshadashboard.com/uploads/images/product_image/230209092452-2565752.jpg"},
        {key:1,title:"product 0",price:10,image:"https://ayshadashboard.com/uploads/images/product_image/230209092452-2565752.jpg"},
        {key:2,title:"product 0",price:10,image:"https://ayshadashboard.com/uploads/images/product_image/230209092452-2565752.jpg"},
        {key:3,title:"product 0",price:10,image:"https://ayshadashboard.com/uploads/images/product_image/230209092452-2565752.jpg"},
        {key:4,title:"product 0",price:10,image:"https://ayshadashboard.com/uploads/images/product_image/230209092452-2565752.jpg"},
        {key:5,title:"product 0",price:10,image:"https://ayshadashboard.com/uploads/images/product_image/230209092452-2565752.jpg"},
        {key:6,title:"product 0",price:10,image:"https://ayshadashboard.com/uploads/images/product_image/230209092452-2565752.jpg"},
        {key:7,title:"product 0",price:10,image:"https://ayshadashboard.com/uploads/images/product_image/230209092452-2565752.jpg"},
        {key:8,title:"product 0",price:10,image:"https://ayshadashboard.com/uploads/images/product_image/230209092452-2565752.jpg"},
        {key:9,title:"product 0",price:10,image:"https://ayshadashboard.com/uploads/images/product_image/230209092452-2565752.jpg"},
        {key:10,title:"product 0",price:10,image:"https://ayshadashboard.com/uploads/images/product_image/230209092452-2565752.jpg"},
        {key:11,title:"product 0",price:10,image:"https://ayshadashboard.com/uploads/images/product_image/230209092452-2565752.jpg"},
        {key:12,title:"product 0",price:10,image:"https://ayshadashboard.com/uploads/images/product_image/230209092452-2565752.jpg"},
    ])

    const CartItem = ({item})=>{
        return(
            <Cart all={false} {...item} />
        )
    }

    return(
                <FlatList
                className="mx-2 mb-16 mt-4"
                data={products} 
                renderItem={CartItem}
                numColumns={2}
                />
    )
}
export default OneCat