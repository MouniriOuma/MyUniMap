import { View, Text, Pressable } from "react-native"

const TutorialScreen2 = ({ navigation }) => {

    return (
        <View>
            <Pressable
                            onPress={() => navigation.navigate("Home")}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: '#fff',
                                fontWeight: "bold",
                                marginLeft: 4
                            }}>skip</Text>
                        </Pressable>
        </View>
    )
}

export default TutorialScreen2;