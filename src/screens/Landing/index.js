
import React, { useRef, useState, useEffect } from 'react';
import { View, Animated, Text, StyleSheet, } from 'react-native';
import globalStyles from '../../../styles/globalStyles';
const {parentContainer} = globalStyles

import Banner from './Banner';
import LoginForm from './LoginForm';

const LandingScreen = () => {

    const opacityVal = useRef(new Animated.Value(0)).current;
    const marginVal = useRef(new Animated.Value(200)).current;

    const fadeViewIn = () => {
        Animated.timing(opacityVal, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }

    const moveViewUp = () => {
        Animated.timing(marginVal, {
            toValue: 0,
            duration: 700,
            useNativeDriver: false
        }).start();
    }

    useEffect(() => {
        fadeViewIn();
        moveViewUp();
    })

    return (
        <Animated.View style={[parentContainer, {opacity: opacityVal}]}>
            <Animated.View style={[styles.risingView, {marginTop: marginVal}]}>
                <Banner />
                <LoginForm />
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    jumboText: {
        fontSize: 54,
        fontWeight: 'bold'
    },
    risingView: {
        // position: 'absolute',
        width: '100%',
        height: '100%'
    }
})

export default LandingScreen;