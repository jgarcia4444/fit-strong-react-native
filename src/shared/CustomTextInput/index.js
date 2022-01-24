import React, {useState, useRef, useEffect} from 'react';
import { View, TextInput, StyleSheet, TouchableHighlight, Animated, } from 'react-native';

import globalStyles from '../../../styles/globalStyles';
const {fullWidthContainer} = globalStyles;

import { Feather } from '@expo/vector-icons';

const CustomTextInput = ({inputType, inputValue, valueChange}) => {

    const [inputIconName, setInputIconName] = useState('');

    const configureInputIcon = () => {
        if (inputType === 'userInfo') {
            setInputIconName('user');
        } else if (inputType === 'password') {
            setInputIconName('lock');
        } else if (inputType === 'email') {
            setInputIconName('mail');
        } else if (inputType === 'phone') {
            setInputIconName('phone');
        }
    }

    useEffect(() => {
        configureInputIcon();
    })

    return (
        <View style={fullWidthContainer}>
            <TouchableHighlight>
                <Feather name={inputIconName} size={24} color="black" />
            </TouchableHighlight>
            <TouchableHighlight>
                <TextInput style={styles.inputStyle} value={inputValue} onChangeText={valueChange} />
            </TouchableHighlight>
        </View>
    )

}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    inputStyle: {
        width: '100%',
        paddingHorizontal: width * 0.01
    }
})

export default CustomTextInput;