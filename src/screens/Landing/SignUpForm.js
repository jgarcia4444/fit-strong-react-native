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
    const [requirementsMet, setRequirementsMet] = useState({
        capital: false,
        lowercase: false,
        number: false,
        length: false
    });
    const [hasCapital, setHasCapital] = useState(false);
    const [hasLower, setHasLower] = useState(false);
    const [hasNum, setHasNum] = useState(false);
    const [hasLength, setHasLength] = useState(false);
    

    const firstAndLastOptions = {
        firstName: firstName,
        changeFirstName: (newText) => setFirstName(newText),
        lastName: lastName,
        changeLastName: (newText) => setLastName(newText)
    }

    const passRequirements = [{identifier: 'length', message: 'Minimum of 8 characters long'}, {identifier: 'capital', message: 'Must have one capital letter'}, {identifier: 'lowercase', message: 'Must have a lowercase letter'}, {identifier: 'number', message: 'Must have a number'}];

    const renderPassRequirements = () => {
        const requirementsMet = {
            capital: hasCapital,
            lowercase: hasLower,
            number: hasNum,
            length: hasLength
        }
        return passRequirements.map((requirement, index) => <PassRequirement key={`${requirement.identifier}-${index}`} requirementInfo={requirement} requirementsMet={requirementsMet} />)
    }

    const handlePassChange = (newText) => {
        passHasCapital(newText);
        passHasLowercase(newText);
        passHasNumber(newText);
        checkLength(newText);
        setPassword(newText);
    }

    const checkLength = (passText) => {
        if (passText.length > 7) {
            setHasLength(true)
        } else {
            setHasLength(false)
        }
    }

    const passHasCapital = (passText) => {
        var removeItem = true;
        for (let char of passText) {
            let capitalChar = char.toUpperCase();
            if (char === capitalChar) {
                removeItem = false;
                setHasCapital(true);
            }
        }
        if (removeItem === true) {
            setHasCapital(false)
        }
    }



    const passHasLowercase = (passText) => {
        var removeItem = true;
        for (let char of passText) {
            let lowercaseChar = char.toLowerCase();
            if (char === lowercaseChar) {
                removeItem = false;
                setHasLower(true);
            }
        }
        if (removeItem === true) {
            setHasLower(false);
        }
    }

    const passHasNumber = (passText) => {
        var removeItem = true;
        for (let char of passText) {
            if (!isNaN(parseInt(char))) {
                removeItem = false
                setHasNum(true);
            }
        }
        if (removeItem === true) {
            setHasNum(false)
        }
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
                <CustomTextInput inputType={'password'} placeholder={'Password'} inputValue={password} valueChange={handlePassChange} />
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