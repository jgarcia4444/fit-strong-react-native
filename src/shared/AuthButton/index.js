import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import Colors from '../../../config/Colors';
const {lightGray, white, black} = Colors;

import globalStyles from '../../../styles/globalStyles';
const {fullWidthContainer} = globalStyles;

const AuthButton = ({loggingIn, handlePress}) => {

    return (
        <TouchableOpacity onPress={handlePress} style={[fullWidthContainer, styles.authButton]}>
            <Text style={styles.textStyle}>{loggingIn === true ? 'Login' : 'Signup'}</Text>
        </TouchableOpacity>
    )
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    authButton: {
        marginTop: height * 0.02,
        paddingVertical: height * 0.02,
        width: '100%',
        backgroundColor: black
    },
    textStyle: {
        color: white,
        fontWeight: 'bold',
        fontSize: 18,
    }
});

export default AuthButton;