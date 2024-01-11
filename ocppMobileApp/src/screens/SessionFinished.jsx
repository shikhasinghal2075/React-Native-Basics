import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getSessionEndInfo } from '../GlobalVariables';

const SessionFinished = () => {
  const sessionEndInfo = getSessionEndInfo()
  const bill = sessionEndInfo.bill
  const unitsConsumed = sessionEndInfo.unitsConsumed
  const navigation = useNavigation()

  const handleHomeButton = () => {
    // Home Button Clicked
    console.log('Home button clicked');
    navigation.navigate('Home')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session END Information</Text>
      {/* Display Error Message in Red */}
      {/* Charger and Connector Information */}
      <Text style={styles.text}>{`Bill: Rs ${bill}`}</Text>
      <Text style={styles.text}>{`Energy Consumed: ${unitsConsumed} units`}</Text>

      {/* Start Charging Button */}
      <Button onPress={handleHomeButton} title="Home" color="#008000" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
    color: 'black'
  },
});

export default SessionFinished;
