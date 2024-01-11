import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getServerUrl } from '../GlobalVariables';
import { useNavigation } from '@react-navigation/native'

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation()
 
  const handleLogin = () => {
    // Check if both phone number and password are provided
    if (!phoneNumber || !password) {
      setError('Phone number and password are required fields.');
      return;
    }

    // Check the format of the phone number (simple example)
    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      setError('Invalid phone number format. Please enter a valid 10-digit number.');
      return;
    }

    // Clear any previous error
    setError('');

    const loginData = {
      phoneNumber: phoneNumber,
      password: password,
    };

    const serverUrl = getServerUrl();
    const url = `${serverUrl}/api/loginWithPassword`;
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Login successful:', data);
        if (data.message === 'Successfully login.') {
          // Assuming successful login, navigate to the Home screen
          navigation.navigate('Home');
        
        } else {
          console.log('Login Failed:', data);
          setError('Invalid credentials. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
        setError('Invalid data. Please try again.');
      });
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.textCenter}>
        <Text style={styles.headerText}>Welcome back, Please login</Text>
      </View>

      {error && <Text style={styles.errorMessage}>{error}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="black" // Set placeholder text color for phone number
          keyboardType="numeric" // Set keyboardType to 'numeric'
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="black" // Set placeholder text color for password
          // secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={styles.textCenter}>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  textCenter: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'black'
  },
  errorMessage: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center', // Align the error message in the center
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    color: 'black', // Set the color property to black for the text input
  },
});

export default Login;
