import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";

const TutorialScreen4 = ({ navigation }) => {

    return (
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.red, COLORS.white]}
        >
            <View style={{  flex: 1 }}>
                <View style={{ position: 'relative', height: 400 }}>
                <Image
                        source={require('../../assets/studyGroup.png')}
                        style={{
                            height: '100%', 
                            width: '100%', 
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }}
                    />
                </View>


                {/* content  */}

                <View style={{
                    paddingHorizontal: 22,
                    marginTop: 15,
                    position: "absolute",
                    top: 400,
                    width: "100%",
                    alignItems: 'center', // Center the content horizontally
                }}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: '800',
                        color: COLORS.white,
                        textAlign: 'center', // Center the text horizontally
                    }}>Create Events & Study Sessions</Text>

                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 18,
                            color: COLORS.white,
                            marginVertical: 4,
                            textAlign: 'center', // Center the text horizontally
                        }}>Craft your events and study sessions seamlessly with our Add Event page. 
                        Whether it's collaborative studying or social gatherings, 
                        our intuitive tools empower you to organize memorable experiences with ease. </Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                            textAlign: 'center', // Center the text horizontally
                        }}> Start shaping your calendar today!</Text>
                    </View>

                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" , marginTop: 250, marginHorizontal: 20,}}>
                        <View style={{
                            flexDirection: "row",
                            marginTop: 12,
                            justifyContent: "flex-end",
                        }}>
                            <Pressable
                                style={{
                                    backgroundColor: '#ffffff',
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    borderRadius: 20,
                                    width:90,
                                    alignItems: 'center',
                                }}
                                onPress={() => navigation.navigate("TutorialScreen3")}
                            >
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.black,
                                    fontWeight: "bold",
                                    textAlign: 'center',
                                }}>previous</Text>
                            </Pressable>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            marginTop: 12,
                            justifyContent: "flex-start",
                        }}>
                            <Pressable
                                style={{
                                    backgroundColor: '#ffffff',
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    borderRadius: 20,
                                    width:110,
                                    alignItems: 'center',
                                }}
                                onPress={() => navigation.navigate("Events")}
                            >
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.black,
                                    fontWeight: "bold",
                                    textAlign: "center",
                                }}>get started</Text>
                            </Pressable>
                        </View>
                    


                </View>
            </View>
        </LinearGradient>
    )
}

const COLORS = {
    white: "#FFFFFF",
    black: "#222222",
    primary: "#007260",
    secondary: "#39B68D",
    grey: "#CCCCCC",
    green: "#007260",
    
    red: "#7C3030",
}

export default TutorialScreen4;