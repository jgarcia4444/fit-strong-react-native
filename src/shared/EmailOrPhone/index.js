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

        }
    }

    return (
        <View style={[fullWidthContainer]}>
            <CustomTextInput inputType={dynamicInputType} placeholder={'Email or Phone'} inputValue={formattedValue()} valueChange={valueChange} />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default EmailOrPhone;