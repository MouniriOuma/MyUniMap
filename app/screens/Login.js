import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, Image } from 'react-native';
import { firebaseAuth } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = firebaseAuth;
    const [user, setUser] = useState(null);
    const [isNewUser, setIsNewUser] = useState(false);

    const clearInputFields = () => {
        setEmail('');
        setPassword('');
      };
    
    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
            console.log('user:', user);
            setUser(user);
            clearInputFields();
        });
    
        return () => unsubscribe();
    }, []);
    
    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log("response", response);
            navigation.navigate('Events');
        } catch (error) {
            console.log(error);
            alert('Login failed:' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const goToSignup = () => {
        navigation.navigate('SignUp');
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/UCD.jpg')} style={styles.logo} />
            </View>
                <Text style={{
                        fontSize: 50,
                        fontWeight: '800',
                        color: "#007260",
                        textAlign: 'center',
                        marginBottom: 20,
                    }}>Login</Text>

            <KeyboardAvoidingView behavior="padding">
                <TextInput
                    value={email}
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    secureTextEntry={true}
                    value={password}
                    style={styles.input}
                    placeholder="Password"
                    autoCapitalize="none"
                    onChangeText={(text) => setPassword(text)}
                />

                {loading ? (
                    <ActivityIndicator size="large" color="#007260" />
                ) : (
                    <>
                        <Button title="Login" onPress={signIn} color="#007260" style={styles.button}/>
                        <View style={styles.buttonMargin} />
                        <Button title="Signup" onPress={goToSignup} color="#39B68D" style={styles.button}/>
                    </>
                )}

            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    logoContainer: {
        marginBottom: 10
    },
    logo: {
        width: 150,
        height: 150
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        width: 300,
        marginVertical: 4,
        height: 50,
    },
    buttonMargin: {
        marginVertical: 10,
    },
});

export default Login;