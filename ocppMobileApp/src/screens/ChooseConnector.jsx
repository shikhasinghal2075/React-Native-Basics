import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getChargers, setChargers, setSelectedConnector } from '../GlobalVariables';

import { useNavigation } from '@react-navigation/native';

const ChooseConnector = () => {
  const chargers = getChargers();
  const [buttons, setButtons] = useState([]);
  const navigation = useNavigation()
  let selectedConnector= {
    chargerId: '',
    connectorId: ''
  }

  useEffect(() => {
    const newButtons = chargers.flatMap((charger) => {
      const chargerButtons = charger.connectors.map((connector) => {
        let tempImage = '';
        if (connector.type === 'GB/T') {
          tempImage = 'gbt.jpg';
        } else if (connector.type === 'CCS-2') {
          tempImage = 'ccs2.jpg';
        } else if (connector.type === 'Type-2 AC') {
          tempImage = 'type2AC.png';
        }

        return {
          chargerIdentity: charger.chargerIdentity,
          connectorId: connector.connectorId,
          connectorStatus: connector.status,
          connectorType: connector.type,
          power: connector.maximumPowerkW,
          maximumVoltage: connector.maximumVoltage,
          maximumCurrent: connector.maximumCurrent,
          image: tempImage,
        };
      });

      return {
        chargerIdentity: charger.chargerIdentity,
        chargerAddress: charger.address,
        ratedPower: charger.ratedPowerkW,
        numberOfConnectors: charger.numberOfConnectors,
        buttons: chargerButtons,
      };
    });

    setButtons(newButtons);
  }, []);

  const handleButtonClick = (chargerIdentity, connectorId) => {
    console.log(`Charger: ${chargerIdentity}, Connector: ${connectorId} clicked`);
    selectedConnector.chargerId = chargerIdentity;
    selectedConnector.connectorId = connectorId;
    setSelectedConnector(selectedConnector)
    setChargers([])
    navigation.navigate('StartCharging')
};

  const renderItem = ({ item }) => (
    <View style={styles.chargerBox}>
      <Text style={styles.chargerTitle}>{`Charger: ${item.chargerIdentity}`}</Text>
      <View style={styles.chargerInfo}>
        <Text style={styles.chargerinfoText}>{`Address: ${item.chargerAddress}`}</Text>
        <Text style={styles.chargerinfoText}>{`Rated Power: ${item.ratedPower} kW`}</Text>
        <Text style={styles.chargerinfoText}>{`Number of Connectors: ${item.numberOfConnectors}`}</Text>
      </View>
      <FlatList
        data={item.buttons}
        keyExtractor={(button) => button.connectorId.toString()}
        renderItem={({ item: button }) => (
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => handleButtonClick(button.chargerIdentity, button.connectorId)}
              title={`Connector: ${button.connectorId}`}
              color="#4caf50"
              style={styles.buttonStyle}
            />
            <Image
              source={require(`../../assets/ccs2.jpg`)}
              style={{ width: 100, height: 100 }}
            />
            <Text style={styles.connectorInfo}>{`Status: ${button.connectorStatus}`}</Text>
            <Text style={styles.connectorInfo}>{`Connector Type: ${button.connectorType}`}</Text>
            <Text style={styles.connectorInfo}>{`Maximum Power: ${button.power} kW`}</Text>
            <Text style={styles.connectorInfo}>{`Voltage Rating: ${button.maximumVoltage} V`}</Text>
            <Text style={styles.connectorInfo}>{`Current Rating: ${button.maximumCurrent} A`}</Text>
          </View>
        )}
      />
    </View>
  );

  return (
    <View style={styles.chargerContainer}>
      <Text style={styles.pageHeading}>Choose connector to start charging</Text>
      {/* <Button onPress={handleBackButtonClick} title="Back" color="#4caf50" /> */}
      <FlatList
        data={buttons}
        keyExtractor={(charger) => charger.chargerIdentity.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ChooseConnector;

const styles = StyleSheet.create({
  chargerContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pageHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black'
  },
  chargerBox: {
    marginBottom: 16,
  },
  chargerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  chargerInfo: {
    textAlign: 'center',
  },
  connectorInfo: {
    fontSize: 14,
    color: 'black'
  },
  chargerinfoText:{
    color:'black'
  }
});
