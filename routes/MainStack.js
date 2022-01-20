import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import LandingScreen from '../src/screens/LandingScreen';

const MainStack = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Landing" component={LandingScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack;