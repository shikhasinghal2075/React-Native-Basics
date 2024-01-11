import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import React, {useState} from 'react'
import { getServerUrl } from '../GlobalVariables';
import { useNavigation } from '@react-navigation/native';
import { setChargers } from '../GlobalVariables';

const Home = () => {
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation()

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation for compulsory fields
    if (!longitude || !latitude) {
      setErrorMessage('Longitude and Latitude are required fields.');
      return;
    }

    // Validation for numeric values (numbers or decimals)
    const numericRegex = /^-?\d*\.?\d+$/;

    if (!numericRegex.test(longitude) || !numericRegex.test(latitude)) {
      setErrorMessage('Longitude and Latitude must be numeric values.');
      return;
    }

    const postData = {
      longitude : longitude,
      latitude: latitude,
    };

    const serverUrl = getServerUrl()
    const url = `${serverUrl}/api/getChargersByLocation?longitude=${longitude}&latitude=${latitude}`

    fetch(url,{ 
      method: 'GET',
      credentials: "include"
      })
      .then(response => response.json())
      .then(data => {
        // console.log('Charger data:', data);
        if (Array.isArray(data)){
        // Assuming successful chargers found, navigate to choose connector screen
          setErrorMessage('')
          setChargers(data)
          navigation.navigate('ChooseConnector')
        }
        else{
          console.log('No charger Found', data);
          setErrorMessage('No charger found for the given location.');
        }
      })
      .catch(error => {
        console.error('Error in response', error);
        setErrorMessage('Error in processing your request. Please try again.'); // Set error message
      });

  };

  return (
    <View style={styles.homeContainer}>
      <View style={styles.textCenter}>
        <Text style={styles.headerText}>Find nearby Chargers</Text>
      </View>
      <View style={styles.formContainer}>
        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Longitude<Text style={styles.requiredSymbol}>*</Text>:</Text>
          <TextInput
            style={styles.input}
            value={longitude}
            onChangeText={(text) => setLongitude(text)}
            placeholder="Enter longitude"
            placeholderTextColor="gray"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Latitude<Text style={styles.requiredSymbol}>*</Text>:</Text>
          <TextInput
            style={styles.input}
            value={latitude}
            onChangeText={(text) => setLatitude(text)}
            placeholder="Enter latitude"
            placeholderTextColor="gray"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.textCenter}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
}

export default Home

const styles = StyleSheet.create({
  homeContainer: {
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
  formContainer: {
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color:'black'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    color: 'black',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  requiredSymbol: {
    color: 'red',
  },
})