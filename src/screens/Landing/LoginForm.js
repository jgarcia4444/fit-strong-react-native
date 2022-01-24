import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';

import globalStyles from '../../../styles/globalStyles';
const {fullWidthContainer} = globalStyles;

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginInputs = [
        {
            label: 'Email',
            value: email,
            changeFunc: (newVal) => setEmail(newVal)
        },
        {
            label: 'Password',
            value: password,
            changeFunc: (newVal) => setPassword(newVal)
        }
    ]

    return (
        <View style={[fullWidthContainer,]}>

        </View>
    )
}

const styles = StyleSheet.create({

})

export default LoginForm