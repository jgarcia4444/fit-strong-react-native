import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import globalStyles from '../../../styles/globalStyles';
import CustomText from '../../shared/CustomText';
const {fullWidthContainer} = globalStyles;

import CustomTextInput from '../../shared/CustomTextInput';
import AuthButton from '../../shared/AuthButton';

import Colors from '../../../config/Colors';
const {black} = Colors;

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginInputs = [
        {
            label: 'Email',
            inputValue: email,
            changeFunc: (newVal) => setEmail(newVal)
        },
        {
            label: 'Password',
            inputValue: password,
            changeFunc: (newVal) => setPassword(newVal)
        }
    ]

    const renderInputs = () => {
        return loginInputs.map((loginInputInfo, i) => {
            var inputType;
            let {label, inputValue, changeFunc} = loginInputInfo;
            if (label === 'Email') {
                inputType = 'email';
            } else {
                inputType = 'password';
            }
            return <CustomTextInput placeholder={label} key={`${label}-${i}`} inputType={inputType} inputValue={inputValue} valueChange={changeFunc} />
        })
    }

    return (
        <View style={[fullWidthContainer, styles.loginContainer]}>
            <CustomText containerStyle={{alignItems: 'flex-start'}} content={'Login'} bold={true} size={'md'}/>
            <View style={[fullWidthContainer, styles.inputContainer]}>
                {renderInputs()}
                <AuthButton loggingIn={true} />
            </View>
        </View>
    )
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: height * 0.01,
    },
    loginContainer: {
        marginTop: height * 0.075,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    }
})

 

export default LoginForm