import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import { getSelectedConnector,getServerUrl,setTransactionId } from "../GlobalVariables";
import { useNavigation } from "@react-navigation/native";

const StartCharging = () => {
  const selectedConn = getSelectedConnector();
  const [errorMessage, setErrorMessage] = useState('');
  let transactionStartedFlag;
  const navigation = useNavigation()

  const checkTranscationStarted = useCallback(() => {
    // Construct the URL with parameters
    const serverUrl = getServerUrl()
    const baseUrl = `${serverUrl}/api/transactionStartedStatus`;
    const url = `${baseUrl}?chargerId=${selectedConn.chargerId}&connectorId=${selectedConn.connectorId}`;

    // Hit transaction started request
    fetch(url, {
      method: 'GET',
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
        console.log('Transaction Started status response: ', data);
        if (data["Transaction Id"] !== null) {
          const transactionId = data["Transaction Id"];
          clearInterval(transactionStartedFlag);
          setTransactionId(transactionId)
          navigation.navigate('SessionInfo')
        }
      })
      .catch(error => {
        console.error('Error during fetching transaction started status', error);
      });
  }, [selectedConn]);

  const handleStartCharging = () => {
    // Construct the URL with parameters
    const serverUrl = getServerUrl()
    const baseUrl = `${serverUrl}/api/RemoteStart`;
    const url = `${baseUrl}?chargerId=${selectedConn.chargerId}&connectorId=${selectedConn.connectorId}`;

    setErrorMessage('Please wait while session starts...');

    // Hit remote start request
    fetch(url, {
      method: 'GET',
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
        if (data['message'] === "Remote Start Request sent to Charger!") {
          console.log('Remote start successful:', data);
          transactionStartedFlag = setInterval(checkTranscationStarted, 5000);
        }
        else if (data['error'] === "User not allowed to charge") {
          setErrorMessage(data['error']);
        }
        else {
          setErrorMessage("User not allowed to charge");
        }
      })
      .catch(error => {
        console.error('Error during remote start:', error);
        setErrorMessage('Invalid data. Please try again.');
      });
  };

  const handleBackButton = () => {
    clearInterval(transactionStartedFlag);
    navigation.navigate('Home')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Click Start button to start charging</Text>

      {/* Display Error Message */}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      {/* Charger and Connector Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{`Charger Identity: ${selectedConn.chargerId}`}</Text>
        <Text style={styles.infoText}>{`Connector Id: ${selectedConn.connectorId}`}</Text>
      </View>

      <Button
        onPress={handleStartCharging}
        title="Start Charging"
        color="#4caf50"
        style={styles.button}
      />

      <Button
        onPress={handleBackButton}
        title="Back"
        color="#4caf50"
        style={styles.backButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black'
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color:'black'
  },
  button: {
    marginBottom: 16,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});

export default StartCharging;
