import React, {useState, useRef} from 'react';
import { View, StyleSheet, Text } from 'react-native';

import CustomTextInput from '../CustomTextInput';

import Colors from '../../../config/Colors';
const {white, black} = Colors;

import globalStyles from '../../../styles/globalStyles';
const {fullWidthContainer} = globalStyles;

const EmailOrPhone = ({inputValue, valueChange}) => {

    const [dynamicInputType, setDynamicInputType] = useState('userInfo');

    const formattedValue = () => {
        if (inputValue.length < 3) {
            return inputValue;
        } else {
            var isPhoneNumber = false;
            
        }
    }

    return (
        <CustomTextInput inputType={dynamicInputType} placeholder={'Email or Phone'} inputValue={formattedValue()} valueChange={valueChange} />
    )
}

const styles = StyleSheet.create({

})

export default EmailOrPhone;