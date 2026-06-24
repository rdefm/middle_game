import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TitleScreen from '../screens/TitleScreen';
import WeekNavigator from './WeekNavigator';

export type RootStackParamList = {
  Title: undefined;
  WeekNavigator: { week: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: 'fade' }}
        initialRouteName="Title"
      >
        <Stack.Screen name="Title" component={TitleScreen} />
        <Stack.Screen name="WeekNavigator" component={WeekNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
