import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import { getTransactionId, getServerUrl, setSessionEndInfo } from "../GlobalVariables";
import { useNavigation } from "@react-navigation/native";

const SessionInfo = () => {
  const transactionId = getTransactionId()
  const [soc, setSOC] = useState('N/A');
  const [current, setCurrent] = useState('N/A');
  const [voltage, setVoltage] = useState('N/A');
  const [power, setPower] = useState('N/A');
  const [energy, setEnergy] = useState('N/A');
  const [getMeterValues, setGetMeterValues] = useState(null);
  const navigation = useNavigation()

  const checkMeterValues = () => {
    // Construct the URL with parameters
    const serverUrl = getServerUrl()
    const baseUrl = `${serverUrl}/api/meterValues`;
    const url = `${baseUrl}?transactionId=${transactionId}`;
    let transactionEndedInterval;

    // Hit transaction started request
    fetch(url, {
      method: 'GET',
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
        console.log('Meter values received: ', data);
        if (data["error"] !== "No meter values found") {
          const socVal = data["SOC(Percent)"];
          const currentVal = data["Current(A)"];
          const voltageVal = data["Voltage(V)"];
          const powerVal = data["Power(kW)"];
          const energyVal = data["Energy(kWh)"];

          setSOC(socVal + " %");
          setCurrent(currentVal + " A");
          setPower(powerVal + " kW");
          setEnergy(energyVal + " units");
          setVoltage(voltageVal + " V");
        }
      })
      .catch(error => {
        console.error('Error during fetching transaction started status', error);
      });
  }

  useEffect(() => {
    // Runs one time on page initialization
    const intervalId = setInterval(checkMeterValues, 30000);
    setGetMeterValues(intervalId);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const checkTransactionEndedStatus = () => {
    // Construct the URL with parameters
    const serverUrl = getServerUrl()
    const baseUrl = `${serverUrl}/api/transactionEndedStatus`;
    const url = `${baseUrl}?transactionId=${transactionId}`;

    // Hit transaction started request
    fetch(url, {
      method: 'GET',
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
        console.log('Transaction Ended status received: ', data);
        if (data["TransactionId"] !== null) {
          const meterStart = data["MeterStart"]
          const meterStop = data["MeterStop"]
          const bill = data["Bill"]
          let sessionEndInfo={
            unitsConsumed: '',
            bill:''
          }

          // To convert in kWh
          let unitsConsumed;
          unitsConsumed = parseInt((meterStop - meterStart) / 1000);
          console.log("units consumed: ", unitsConsumed);

          console.log("Session stopped successfully and clear interval called")
          clearInterval(getMeterValues);
          clearInterval(transactionEndedInterval);
          sessionEndInfo.unitsConsumed = `${unitsConsumed}`
          sessionEndInfo.bill = `${bill}`
          setSessionEndInfo(sessionEndInfo)
          navigation.navigate('SessionFinished')
        }
      })
      .catch(error => {
        console.error('Error during transaction ended status', error);
      });
  }

  const handleStopCharging = () => {
    console.log("Stop button clicked");

    // Construct the URL with parameters
    const serverUrl = getServerUrl()
    const baseUrl = `${serverUrl}/api/RemoteStop`;
    const url = `${baseUrl}?transactionId=${transactionId}`;

    // Hit transaction started request
    fetch(url, {
      method: 'GET',
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
        console.log('Remote stop response received: ', data);
        if (data["message"] === "Remote Stop sent to the charger") {
          setGetMeterValues(setInterval(checkMeterValues, 30000));
          transactionEndedInterval = setInterval(checkTransactionEndedStatus, 5000);
        }
      })
      .catch(error => {
        console.error('Error during remote stop transaction', error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Session Information</Text>

      {/* Charger and Connector Information */}
      <Text style={styles.infoText}>{`Units Consumed: ${energy}`}</Text>
      <Text style={styles.infoText}>{`Power: ${power}`}</Text>
      <Text style={styles.infoText}>{`Current: ${current}`}</Text>
      <Text style={styles.infoText}>{`Voltage: ${voltage}`}</Text>
      <Text style={styles.infoText}>{`SoC: ${soc}`}</Text>

      {/* Stop Charging Button */}
      <Button
        onPress={handleStopCharging}
        title="Stop Charging"
        color="#4caf50"
        style={styles.button}
      />
    </View>
  );
}

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
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black'
  },
  button: {
    marginTop: 16,
  },
});

export default SessionInfo;
