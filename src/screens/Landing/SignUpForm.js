import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import AuthButton from '../../shared/AuthButton';
import EmailOrPhone from '../../shared/EmailOrPhone';
import FirstAndLastName from '../../shared/FirstAndLastName';
import PassRequirement from '../../shared/PassRequirement';
import HeightInput from '../../shared/HeightInput';

import Colors from '../../../config/Colors';
const {black} = Colors;

import globalStyles from '../../../styles/globalStyles';
import CustomText from '../../shared/CustomText';
import CustomTextInput from '../../shared/CustomTextInput';
const {fullWidthContainer} = globalStyles;

import { connect } from 'react-redux'
import createUser from '../../../redux/actions/session/CreateUser';

const SignUpForm = ({session, createUser}) => {

    const [emailPhone, setEmailPhone] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [hasCapital, setHasCapital] = useState(false);
    const [hasLower, setHasLower] = useState(false);
    const [hasNum, setHasNum] = useState(false);
    const [hasLength, setHasLength] = useState(false);
    const [isPhoneNumber, setIsPhoneNumber] = useState(false);
    const [age, setAge] = useState('');
    const [inches, setInches] = useState('');
    const [feet, setFeet] = useState('');
    const [centimeters, setCentimeters] = useState('');
    const [measurementSystem, setMeasurementSystem] = useState('imperial');
    const [weight, setWeight] = useState('');
    const [formErrors, setFormErrors] = useState([]);

    const {userInfo, sessionInfoLoading} = session;

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
            if (char === capitalChar && isNaN(parseInt(char))) {
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

    const handleEmailPhone = (emailPhoneText) => {
        if (emailPhoneText.length < 3) {
            setEmailPhone(emailPhoneText);
        } else {
            if (checkForPhoneNumber(emailPhoneText)) {
                setIsPhoneNumber(true)
            } else {
                setIsPhoneNumber(false)
            }
            setEmailPhone(emailPhoneText)
        }
    }

    const checkForPhoneNumber = (possibleNum) => {
        var phoneNumber = true;
        for (let char of possibleNum) {
            if (isNaN(parseInt(char))) {
                phoneNumber = false;
            }
        }
        return phoneNumber
    }

    const handleAgeChange = (newText) => {
        if (!isNaN(parseInt(newText))) {
            setAge(newText);
        }
    }

    const convertToCentimeters = () => {
        if (feet !== '' && inches !== '') {
            let inchesInAFoot = 12;
            let heightInInches = (inchesInAFoot * parseInt(feet)) + parseInt(inches);
            let centimeterMultiplier = 2.54;
            let heightInCentimeters = heightInInches * centimeterMultiplier;
            let centimetersRounded = heightInCentimeters.toFixed(2);
            return centimetersRounded;
            // setCentimeters(centimetersRounded.toString());
        } else if (feet === '' && inches !== '') {
            let calculatedCentimeters = parseInt(inches) * 2.54
            let centimetersRounded = calculatedCentimeters.toFixed(2);
            return centimetersRounded;
            // setCentimeters(centimetersRounded.toString())
        } else if (feet !== '' && inches === '') {
            let feetToCentimeters = (parseInt(feet) * 12) * 2.54;
            let centimetersRounded = feetToCentimeters.toFixed(2);
            return centimetersRounded;
            // setCentimeters(centimetersRounded.toString())
        } 
    }

    const convertToImperial = () => {
        if (centimeters !== '') {
            let heightInInches = (parseInt(centimeters) * 0.393701).toFixed();
            let calculatedFeet = Math.floor(heightInInches / 12);
            let calculatedInches = heightInInches % 12;
            return {
                feet: calculatedFeet,
                inches: calculatedInches
            }
            // setFeet(calculatedFeet.toString());
            // setInches(calculatedInches.toString());
        } else {
            return {}
        }
    }

    const convertPoundsToKG = () => {
        if (weight !== '') {
            let kg = Math.floor(parseInt(weight) / 2.20462);
            setWeight(kg.toString())
        }
    }

    const convertKGToPounds = () => {
        if (weight !== '') {
            let pounds = Math.floor(parseInt(weight) / 0.453592);
            return pounds;
            // setWeight(pounds.toString());
        }
    }
    

     

    const handleMeasurmentSystemChange = (system) => {
        if (system === 'metric') {
            let convertedCentimeters = convertToCentimeters();
            if (convertedCentimeters !== undefined) {
                setCentimeters(convertedCentimeters.toString());
            }
            let convertedKgs = convertPoundsToKG();
            if (convertedKgs !== undefined) {
                setWeight(convertedKgs.toString());
            }
        } else {
            let convertedToImperial = convertToImperial();
            if (Object.keys(convertedToImperial).length > 0) {
                setFeet(convertedToImperial.feet.toString())
                setInches(convertedToImperial.inches.toString())
            }
            let convertedPounds = convertKGToPounds();
            if (convertedPounds !== undefined) {
                setWeight(convertedPounds);
            }
        }
        setMeasurementSystem(system);
    }

    const validateForm = () => {
        let contactInputValidation = isPhoneNumber === true ? validatePhoneNumber : validateEmail
        let validationFunctions = [validateFirstName, validateLastName, validatePassword, contactInputValidation, validateAge, validateHeight, validateWeight];
        validationFunctions.forEach(validationFunction => validationFunction())
    }

    const validateFirstName = () => {
        if (firstName === '') {
            let error = {identifier: "firstName", message: 'Cannot be left blank'};
            setFormErrors([...formErrors, error]);
        }
    }

    const validateLastName = () => {
        if (lastName === '') {
            let error = {identifier: "lastName", message: 'Cannot be left blank'};
            setFormErrors([...formErrors, error]);
        }
    }

    const validatePassword = () => {
        let requirementBooleans = [
            {message: 'Must have a capital letter', value: hasCapital},
            {message: 'Must have a lowercase letter', value: hasLower},
            {message: 'Must be 8 characters in length', value: hasLength},
            {message: 'Must have a number', value: hasNum}
        ]
        requirementBooleans.forEach(requirement => {
            if (requirement.value === false) {
                let error = {identifier: 'password', message: requirement.message};
                setFormErrors([...formErrors, error]);
                break;
            }
        })
    }

    const validateEmail = () => {
        if (emailPhone === '') {
            let error = {identifier: 'emailPhone', message: 'Can not be left blank'};
            setFormErrors([...formErrors, error]);
        } else {
            let emailPhoneSplit = emailPhone.split('');
        }
    }

    const validatePhoneNumber = () => {

    }
    const validateAge = () => {

    }
    const validateWeight = () => {

    }
    const validateHeight = () => {

    }

    const handleSignUpPress = () => {
        let newUserInfo = {};
        let errors = []
        if (firstName !== '') {
            newUserInfo["firstName"] = firstName;
        } else {
            errors.push({label: "firstName", message: "Cannot be empty."})
        }
        if (measurementSystem === 'imperial') {

        } else {

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
            <ScrollView contentContainerStyle={styles.scrollViewContentContainer} style={{width: '100%'}}>
                <EmailOrPhone isPhoneNumber={isPhoneNumber} inputValue={emailPhone} valueChange={handleEmailPhone} />
                <CustomTextInput inputType={'password'} placeholder={'Password'} inputValue={password} valueChange={handlePassChange} />
                <View style={[fullWidthContainer, styles.passRequirementsContainer ]}>
                    {renderPassRequirements()}
                </View>
                <FirstAndLastName inputOptions={firstAndLastOptions} />
                <CustomText   
                    content={'Metrics'}
                    size={'md'}
                    containerStyle={{alignItems: 'flex-start'}}
                />
                <CustomTextInput inputValue={age} inputType={'userInfo'} placeholder={'Age'} valueChange={handleAgeChange}/>
                <HeightInput setMeasurementSystem={handleMeasurmentSystemChange} measurementSystem={measurementSystem} centimeters={centimeters} setCentimeters={(newText) => setCentimeters(newText)} setInches={(newText) => setInches(newText)} inches={inches} feet={feet} setFeet={(newText) => setFeet(newText)} />
                <CustomTextInput placeholder={'Weight'} inputType={'userInfo'} inputValue={weight} valueChange={setWeight} />
            </ScrollView>
            <AuthButton handlePress={handleSignUpPress} loggingIn={false}/>
        </View>
    )
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    scrollViewContentContainer: {
        paddingBottom: height * 0.02,
    },
    signUpContainer: {
        height: height * 0.55,
        marginTop: height * 0.025,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    }
});

const mapStateToProps = state => {
    return {
        session: state.session
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createUser: (userInfo) => dispatch(createUser(userInfo)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpForm);