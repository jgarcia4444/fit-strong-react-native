import React, {useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Colors from '../../../config/Colors';
const {black} = Colors;

import globalStyles from '../../../styles/globalStyles';
const {fullWidthContainer} = globalStyles;

const PassRequirement = ({requirementsMet, requirementInfo}) => {
    const {message, identifier} = requirementInfo;

    const requirementMet = () => {
        return requirementsMet[identifier];
    }

    const checkOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (requirementMet() === true) {
            fadeCheckIn();
        }
    });

    const fadeCheckIn = () => {
        Animated.timing(checkOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true
        }).start()
    }

    return (
        <View style={[fullWidthContainer, styles.passRequirementRow]}>
            <View style={styles.checkBoxContainer}>
                <View style={styles.checkbox}>
                    {requirementMet() === true && 
                    <Animated.View style={{opacity: checkOpacity}}>
                        <Feather name="check" size={16} color="black" />
                    </Animated.View>
                    }
                </View>
            </View>
            <View style={styles.requirementTextContainer}>
                <Text>{message}</Text>
            </View>
        </View>
    )
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    checkbox: {
        borderColor: black,
        borderWidth: 2,
        // borderRadius: 5,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkBoxContainer: {
        alignItems: 'flex-start',
        marginEnd: width * 0.05,
    },
    passRequirementRow: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginVertical: height * 0.005,
    },
    requirementTextContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center'
    }
});

export default PassRequirement;