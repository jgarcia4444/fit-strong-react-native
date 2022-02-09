import React, {useState, useRef, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native';

import CustomTextInput from '../CustomTextInput';

import Colors from '../../../config/Colors';
const {white, black} = Colors;

import globalStyles from '../../../styles/globalStyles';
const {fullWidthContainer} = globalStyles;

const EmailOrPhone = ({inputValue, valueChange, isPhoneNumber}) => {

    const [dynamicInputType, setDynamicInputType] = useState('userInfo');

    useEffect(() => {
        if (inputValue.length > 2) {
            if (isPhoneNumber === true) {
                setDynamicInputType('phone');
            } else {
                setDynamicInputType('email');
            }
        } else {
            setDynamicInputType('userInfo');
        }
    },[inputValue])

    return (
        <CustomTextInput inputType={dynamicInputType} placeholder={'Email or Phone'} inputValue={inputValue} valueChange={valueChange} />
    )
}

const styles = StyleSheet.create({

})

export default EmailOrPhone;