import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import globalStyles from '../../../styles/globalStyles';
const {fullWidthContainer, } = globalStyles;

import Colors from '../../../config/Colors';
const {black, } = Colors

const CustomText = ({content, size='sm', bold=false, color=black, containerStyle={}}) => {

    const configuredTextSize = () => {
        switch(size) {
            case 'sm':
                return 14;
            case 'md':
                return 22;
            case 'lg':
                return 30;
            default: 
                return 14;
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
        <View style={[fullWidthContainer, containerStyle]}>
            <Text style={[styles.defaultTextStyle, configuredStyle()]}>{content}</Text>
        </View>
    )
} 

const styles = StyleSheet.create({
    defaultTextStyle: {
        fontSize: 12,
    }
})

export default CustomText