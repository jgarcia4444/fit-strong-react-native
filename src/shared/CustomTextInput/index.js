import React, {useState, useRef, useEffect} from 'react';
import { View, TextInput, StyleSheet, TouchableHighlight, Animated, Dimensions } from 'react-native';

import globalStyles from '../../../styles/globalStyles';
const {fullWidthContainer} = globalStyles;

import { Feather } from '@expo/vector-icons';

import Colors from '../../../config/Colors';
const {lightGray, black} = Colors;

const CustomTextInput = ({inputType, inputValue, valueChange, placeholder}) => {

    const [inputIconName, setInputIconName] = useState('');

    const iconOpacity = useRef(new Animated.Value(0)).current

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
        fadeIn()
    }

    const fadeIn = () => {
        Animated.sequence([
            Animated.timing(iconOpacity, {
                toValue: 0,
                useNativeDriver: true,
                duration: 0
            }),
            Animated.timing(iconOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            })
        ]).start()
    }

    useEffect(() => {
        configureInputIcon();
    },[inputType])

    return (
        // <TouchableHighlight>
            <View style={[fullWidthContainer, styles.inputRow]}>
                <Animated.View style={{opacity: iconOpacity}}>
                    <Feather name={inputIconName} size={24} color="black" />
                </Animated.View>
                <TextInput placeholder={placeholder} style={styles.inputStyle} value={inputValue} onChangeText={valueChange} />
            </View>
        // </TouchableHighlight>
    )

}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    inputRow: {
        marginVertical: height * 0.01,
        width: '100%',
        backgroundColor: lightGray,
        flexDirection: 'row',
        paddingVertical: height * 0.02,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: width * 0.03,
    },
    inputStyle: {
        width: '100%',
        paddingHorizontal: width * 0.03,
    }
})

export default CustomTextInput;