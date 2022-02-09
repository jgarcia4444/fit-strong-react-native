import React, {useState, } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import Colors from '../../../config/Colors';
const {black} = Colors;

import globalStyles from '../../../styles/globalStyles';
import CustomTextInput from '../CustomTextInput';
const {fullWidthContainer} = globalStyles;

const HeightInput = ({measurementSystem="imperial", setFeet, setInches, setCentimeters, feet, inches, centimeters}) => {

    const renderByMeasurementType = () => {
        return measurementSystem === 'imperial' ? imperialInput() : metricInput()
    }

    const imperialInput = () => {
        return (
            <View style={[fullWidthContainer, styles.imperialInputContainer]}>
                <View style={styles.feetContainer}>
                    <CustomTextInput placeholder={'Feet'} inputType={'userInfo'} inputValue={feet} valueChange={setFeet} />
                </View>
                <View style={styles.inchesContainer}>
                    <CustomTextInput placeholder={'Inches'} inputType={'userInfo'} inputValue={inches} vavlueChange={setInches} />
                </View>
            </View>
        )
    }

    const metricInput = () => {
        return (
            <View style={[fullWidthContainer,]}>
                <CustomTextInput placeholder={"Centimeters"} inputValue={centimeters} valueChange={setCentimeters} inputType={'userInfo'} />
            </View>
        )
    }

    const renderMeasurementSelection = () => {

    }

    return (
        <View style={[fullWidthContainer, styles.heightInputContainer]}>
            <View style={styles.textInputContainer}>
                {renderByMeasurementType()}
            </View>
            <View style={styles.measurementSelectionContainer}>
                {renderMeasurementSelection()}
            </View>
        </View>
    )
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    feetContainer: {
        width: '49%'
    },
    heightInputContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    imperialInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inchesContainer: {
        width: '49%'
    },
    measurementSelectionContainer: {
        width: '25%'
    },
    textInputContainer: {
        width: '70%'
    }
});

export default HeightInput