
import React, { useRef, useState, useEffect } from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native';
import globalStyles from '../../../styles/globalStyles';
const {parentContainer} = globalStyles

const LandingScreen = () => {

    const opacityVal = useRef(new Animated.Value(0)).current;

    const fadeViewIn = () => {
        Animated.timing(opacityVal, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    useEffect(() => {
        fadeViewIn();
    })

    return (
        <Animated.View style={[parentContainer, {opacity: opacityVal}]}>
            
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    jumboText: {
        fontSize: 54,
        fontWeight: 'bold'
    }
})

export default LandingScreen;