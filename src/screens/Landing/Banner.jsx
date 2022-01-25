import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import globalStyles from '../../../styles/globalStyles';
const {fullWidthContainer} = globalStyles;

import Colors from '../../../config/Colors';
const {black, gold} = Colors

import CustomText from '../../shared/CustomText';

const Banner = () => {

    const deviceShadow = () => {
        if (Platform.OS === 'android') {
            return {
                elevation: 1,
                shadowColor: black
            }
        } else {
            return {
                shadowColor: black,
                shadowOffset: {
                    width: 0,
                    height: 0
                },
                shadowOpacity: 0.75,
                shadowRadius: 2
            }
        }
    }

    return (
        <View style={[fullWidthContainer, styles.bannerContainer]}>
            <View style={[styles.iconContainer, deviceShadow()]}>
                <MaterialCommunityIcons name="weight-lifter" size={54} color="black" /> 
            </View>
            <CustomText content={"FitStrong"} bold={true} size={'lg'} containerStyle={styles.titleRow} />
        </View>
    )
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    bannerContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.05
    },
    iconContainer: {
        width: width * 0.3,
        height: width * 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: black,
        borderRadius: width * 0.15
    },
    titleRow: {
        marginTop: height * 0.02
    }
})

export default Banner;