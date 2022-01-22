import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import LandingScreen from '../src/screens/Landing';

const MainStack = () => {

    const noHeader = {
        headerShown: false
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Landing" component={LandingScreen} options={noHeader} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack;