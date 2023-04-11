import { View } from "react-native"
import Cart from "./Card"
import { Text } from "react-native"
import { ScrollView } from "react-native"

const CatSlider = ({title})=>{
    return (
        <View>
            <Text className="text-2xl text-gray-700 font-medium p-2 px-4">{title}</Text>
            <ScrollView horizontal={true} className="m-1 " >
                <Cart title="product name" price={8} image="https://ayshadashboard.com/uploads/images/product_image/230209092452-2565752.jpg" ></Cart>
                <Cart title="product name" price={6} image="https://ayshadashboard.com/uploads/images/product_image/230212111936-3867847.jpg" ></Cart>
                <Cart title="product name" price={6} image="https://ayshadashboard.com/uploads/images/product_image/230211094647-3663298.jpg" ></Cart>
                <Cart title="product name" price={6} image="https://ayshadashboard.com/uploads/images/product_image/230211100355-4063448.webp" ></Cart>
            </ScrollView>
        </View>
    )
}
export default CatSlider