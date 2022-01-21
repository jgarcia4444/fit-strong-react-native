import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import globalStyles from '../../../styles/globalStyles';
const {fullWidthContainer, } = globalStyles;

import Colors from '../../../config/Colors';
const {black, } = Colors

const CustomText = ({content, size='sm', bold=false, color=black}) => {

    const configuredTextSize = () => {
        switch(size) {
            case 'sm':
                return 12;
            case 'md':
                return 20;
            case 'lg':
                return 28;
            default: 
                return 12;
        };
    }

    const configuredStyle = () => {
        return {
            fontSize: configuredTextSize(),
            fontWeight: bold ? 'bold' : 'normal',
            color: color
        }
    }

    return (
        <View style={fullWidthContainer}>
            <Text style={[styles.defaultTextStyle, configuredStyle()]}>{content}</Text>
        </View>
    )
} 

const styles = StyleSheet.create({
    defaultTextStyle: {
        fontSize: 12,
        fontFamily: 'sans-serif'
    }
})

export default CustomText