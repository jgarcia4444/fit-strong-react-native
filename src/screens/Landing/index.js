
import React, { useRef, useState, useEffect } from 'react';
import { View, Animated, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import globalStyles from '../../../styles/globalStyles';
const {parentContainer} = globalStyles

import Banner from './Banner';
import LoginForm from './LoginForm';

import Colors from '../../../config/Colors';
const {hyperBlue} = Colors;

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
                <View style={styles.signUpRow}>
                    <View>
                        <Text style={styles.signUpQuestion}>Not a member yet?</Text>
                    </View>
                    <View style={styles.signUpTextContainer}>
                        <TouchableOpacity>
                            <Text style={styles.signUpText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </Animated.View>
    )
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    jumboText: {
        fontSize: 54,
        fontWeight: 'bold'
    },
    risingView: {
        width: '100%',
        height: '100%'
    },
    signUpQuestion: {
        fontWeight: '100',
    },
    signUpRow: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: height * 0.05
    },
    signUpText: {
        fontWeight: 'bold',
        color: hyperBlue
    },
    signUpTextContainer: {
        marginLeft: width * 0.01
    }
})

export default LandingScreen;