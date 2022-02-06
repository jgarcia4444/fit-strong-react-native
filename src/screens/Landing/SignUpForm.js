import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import AuthButton from '../../shared/AuthButton';
import EmailOrPhone from '../../shared/EmailOrPhone';
import FirstAndLastName from '../../shared/FirstAndLastName';
import PassRequirement from '../../shared/PassRequirement';

import Colors from '../../../config/Colors';
const {black} = Colors;

import globalStyles from '../../../styles/globalStyles';
import CustomText from '../../shared/CustomText';
import CustomTextInput from '../../shared/CustomTextInput';
const {fullWidthContainer} = globalStyles;

const SignUpForm = () => {

    const [emailPhone, setEmailPhone] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [requirementsMet, setRequirementsMet] = useState([]);

    const firstAndLastOptions = {
        firstName: firstName,
        changeFirstName: (newText) => setFirstName(newText),
        lastName: lastName,
        changeLastName: (newText) => setLastName(newText)
    }

    const passRequirements = [{identifier: 'length', message: 'Minimum of 8 characters long'}, {identifier: 'capital', message: 'Must have one capital letter'}, {identifier: 'lowecase', message: 'Must have a lowecase letter'}, {identifier: 'number', message: 'Must have a number'}];

    const renderPassRequirements = () => {
        return passRequirements.map(requirement => <PassRequirement requirementInfo={requirement} requirementsMet={requirementsMet} />)
    }

    return (
        <View style={[fullWidthContainer, styles.signUpContainer]}>
            <CustomText 
                content="Sign Up"
                size="md"
                bold={true}
                containerStyle={{alignItems: 'flex-start'}}
            />
            <ScrollView style={{width: '100%'}}>
                <EmailOrPhone inputValue={emailPhone} valueChange={newText => setEmailPhone(newText)} />
                <CustomTextInput inputType={'password'} placeholder={'Password'} inputValue={password} valueChange={newText => setPassword(newText)} />
                <View style={[fullWidthContainer, styles.passRequirementsContainer ]}>
                    {renderPassRequirements()}
                </View>
                <FirstAndLastName inputOptions={firstAndLastOptions} />
            </ScrollView>
            <AuthButton loggingIn={false}/>
        </View>
    )
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    signUpContainer: {
        height: height * 0.55,
        marginTop: height * 0.025,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    }
})

export default SignUpForm;