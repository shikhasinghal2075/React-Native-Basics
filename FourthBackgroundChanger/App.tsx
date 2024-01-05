
import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function App(): React.JSX.Element {
  const [bgColor,setBgColor] = useState('#FFFFFF')

  const generateColor = () => {
    const hexRange = '0123456789ABCDEF'
    let color = "#"

    for (let i = 0; i < 6; i++) {
      color += hexRange[Math.floor(Math.random()*16)];
    }

    setBgColor(color);
  }

  return (
    <>
      <StatusBar backgroundColor={bgColor}/>
      <View style={[styles.container, {backgroundColor: bgColor}]} >
        <TouchableOpacity
          onPress={generateColor}
        >
          <View style={styles.actionButton}>
            <Text style={styles.buttonText}>Press Me</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionButton:{
    borderRadius: 12,
    backgroundColor: '#6A1B4D',
    paddingVertical: 10,
    paddingHorizontal: 40
  },
  buttonText:{
    fontSize: 24,
    color: '#FFFFFF',
    textTransform: 'uppercase'
  }
})

export default App;
