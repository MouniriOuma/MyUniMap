import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";

const TutorialScreen4 = ({ navigation }) => {

    return (
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.green, COLORS.white]}
        >
            <View style={{  flex: 1 }}>
                <View style={{ position: 'relative', height: 400 }}>
                <Image
                        source={require('../../assets/event.jpeg')}
                        style={{
                            height: 600,
                            width: 500,
                            borderRadius: 20,
                            position: "absolute",
                            top: -250,
                            left: 30,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-35deg" }
                            ]
                        }}
                    />
                </View>


                {/* content  */}

                <View style={{
                    paddingHorizontal: 22,
                    marginTop: 30,
                    position: "absolute",
                    top: 400,
                    width: "100%",
                    alignItems: 'center', // Center the content horizontally
                }}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: '800',
                        color: COLORS.primary,
                        textAlign: 'center', // Center the text horizontally
                    }}>Upcoming Events</Text>

                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 18,
                            color: COLORS.white,
                            marginVertical: 4,
                            textAlign: 'center', // Center the text horizontally
                        }}>Discover the latest happenings and upcoming events in our community. 
                        From workshops to social gatherings, find events that suit your interests and schedule. </Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                            textAlign: 'center', // Center the text horizontally
                        }}>Click on any event to explore more details and join the excitement!</Text>
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
                                onPress={() => navigation.navigate("TutorialScreen1")}
                            >
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.green,
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
                                    width:90,
                                    alignItems: 'center',
                                }}
                                onPress={() => navigation.navigate("TutorialScreen3")}
                            >
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.green,
                                    fontWeight: "bold",
                                    textAlign: "center",
                                }}>next</Text>
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
}

export default TutorialScreen4;