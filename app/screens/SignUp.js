import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, Image } from 'react-native';
import { firebaseAuth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const auth = firebaseAuth;

    const signUp = async () => {
        setLoading(true);
        try {
        // Check if the email ends with 'ucd.ac.ma'
        if (!email.endsWith('ucd.ac.ma')) {
            throw new Error('Invalid email domain. Please use an email ending with "ucd.ac.ma".');
        }
        
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            //alert('Signup successful! Now login and enjoy your experience');
            navigation.navigate('TutorialScreen1');
        } catch (error) {
            console.log(error);
            alert('Signup failed:' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const goToLogin = () => {
        navigation.navigate('Login');
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
                    }}>Signup</Text>
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
                        <Button title="Signup" onPress={signUp} color="#007260" style={styles.button} />
                        <View style={styles.buttonMargin} />
                        <Button title="Login" onPress={goToLogin} color="#39B68D" style={styles.button} />
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

export default SignUp;
