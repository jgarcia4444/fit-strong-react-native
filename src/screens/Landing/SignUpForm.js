import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import AuthButton from '../../shared/AuthButton';
import EmailOrPhone from '../../shared/EmailOrPhone';

import Colors from '../../../config/Colors';
const {} = Colors;

import globalStyles from '../../../styles/globalStyles';
import CustomText from '../../shared/CustomText';
const {fullWidthContainer} = globalStyles;

const SignUpForm = () => {

    const [emailPhone, setEmailPhone] = useState('');

    const handleEmailPhoneChange = (newText) => {

    }

    return (
        <View style={[fullWidthContainer, styles.signUpContainer]}>
            <CustomText 
                content="Sign Up"
                size="md"
                bold={true}
                containerStyle={{alignItems: 'flex-start'}}
            />
            <ScrollView>
                <EmailOrPhone inputValue={emailPhone} valueChange={handleEmailPhoneChange} />
            </ScrollView>
            <AuthButton loggingIn={false}/>
        </View>
    )
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    signUpContainer: {
        height: height * 0.4,
        marginTop: height * 0.075,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    }
})

export default SignUpForm;