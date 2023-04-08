import { ScrollView } from "react-native"
import CatSlider from "../components/CatSlider"

const { View, Text } = require("react-native")

const Home = ()=>{
    return(
        <ScrollView>
            <Text className="font-medium text-3xl p-3">Welcome Tchisama</Text>
            <Text className="px-3 mb-2">Ipsa laborum minima sint tempore alias incidunt cumque veniam maxime ullam fugiat. Quaerat, velit iure!</Text>
            <CatSlider title={"best seller"}/>
            <CatSlider title={"for you"}/>
        </ScrollView>
    )
}
export default Home