import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";

const TutorialScreen3 = ({ navigation }) => {

    return (
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.white, COLORS.black]}
        >
            <View style={{ marginTop: 10, flex: 1 }}>
                <View>
                    <Image
                        source={require('../../assets/location.jpg')}
                        style={{
                            height: 200,
                            width: 200,
                            borderRadius: 20,
                            position: "absolute",
                            top: 110,
                            left: 100,
                        }}
                    />
                </View>

                {/* content  */}

                <View style={{
                    paddingHorizontal: 22,
                    position: "absolute",
                    top: 400,
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: 800,
                        color: COLORS.white
                    }}>Upcoming Events</Text>

                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 18,
                            color: COLORS.white,
                            marginVertical: 4
                        }}>Navigate through the campus like never before with our interactive university map page. 
                        Find your event locations effortlessly by clicking on event details to get directions 
                        or utilize the search bar atop the map for quick access to specific destinations. 
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                        }}>Discover the beauty and functionality of our campus map today!</Text>
                    </View>

                    

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
                                }}
                                onPress={() => navigation.navigate("TutorialScreen2")}
                            >
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.green,
                                    fontWeight: "bold",
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
                                }}
                                onPress={() => navigation.navigate("TutorialScreen4")}
                            >
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.green,
                                    fontWeight: "bold",
                                }}>next</Text>
                            </Pressable>
                        </View>
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

export default TutorialScreen3;