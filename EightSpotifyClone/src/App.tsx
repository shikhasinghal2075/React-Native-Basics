import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { setupPlayer,addTrack} from '../musicPlayerServices';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar
      />
    <Text>Testing seems OK</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});

export default App;
