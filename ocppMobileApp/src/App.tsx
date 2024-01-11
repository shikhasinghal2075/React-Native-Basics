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

//Navigation
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"

//screens
import Home from './screens/Home';
import Login from './screens/Login';
import ChooseConnector from './screens/ChooseConnector';
import StartCharging from './screens/StartCharging';
import SessionInfo from './screens/SessionInfo';
import SessionFinished from './screens/SessionFinished';
import TestMap from './screens/TestMap';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  ChooseConnector: undefined;
  StartCharging: undefined;
  SessionInfo: undefined;
  SessionFinished: undefined;
  TestMap: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>()

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
        name='Login'
        component={Login}
        options={{
          title: "Please Login"
        }}
        />
        <Stack.Screen
        name='Home'
        component={Home}
        options={{
          title: "Home Page"
        }}
        />
        <Stack.Screen
        name='ChooseConnector'
        component={ChooseConnector}
        options={{
          title: "Choose Connector"
        }}
        />
        <Stack.Screen
        name='StartCharging'
        component={StartCharging}
        options={{
        title: "Start Charging"
        }}
        />
        <Stack.Screen
        name='SessionInfo'
        component={SessionInfo}
        options={{
        title: "Session Info"
        }}
        />
        <Stack.Screen
        name='SessionFinished'
        component={SessionFinished}
        options={{
        title: "Session Finished"
        }}
        />
        <Stack.Screen
        name='TestMap'
        component={TestMap}
        options={{
        title: "Play around maps"
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;