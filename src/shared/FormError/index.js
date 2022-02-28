import React, {useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';

import globalStyles from '../../../styles/globalStyles';
const {fullWidthContainer} = globalStyles;

import Colors from '../../../config/Colors';
const {red} = Colors;

const FormError = ({error}) => {

    const opacityVal = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (error !== "") {
            fadeErrorIn()
        }
    },[error])

    const fadeErrorIn = () => {
        Animated.timing(opacityVal, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }

    return (
        <Animated.View style={[fullWidthContainer, styles.errorRow, {opacity: opacityVal}]}>
            {error !== "" && 
                <Text style={styles.errorText}>{error}</Text>
            }
        </Animated.View>
    )
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
        errorText: {
            color: red
        },
        errorRow: {
            alignItems: 'flex-start',
            marginTop: height * 0.01,
        },
    }
)

export default FormError