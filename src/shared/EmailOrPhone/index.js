import React, {useState, useRef} from 'react';
import { View, StyleSheet, Text } from 'react-native';

import CustomTextInput from '../CustomTextInput';

import Colors from '../../../config/Colors';
const {white, black} = Colors;

import globalStyles from '../../../styles/globalStyles';
const {fullWidthContainer} = globalStyles;

const EmailOrPhone = ({inputValue, valueChanged}) => {
    return (
        <View style={[fullWidthContainer]}>
            <CustomTextInput />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default EmailOrPhone;