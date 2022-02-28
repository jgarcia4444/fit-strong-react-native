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
import createUser from '../../../redux/actions/session/createUser';

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
    const formErrors = [];
    const [formErrorsToDisplay, setFormErrorsToDisplay] = useState({
        emailPhone: '',
        password: '',
        firstName: '',
        lastName: '',
        age: '',
        weight: '',
        feet: '',
        inches: '',
        centimeters: ''
    });

    const {userInfo, sessionInfoLoading} = session;

    const firstAndLastOptions = {
        firstName: firstName,
        changeFirstName: (newText) => setFirstName(newText),
        firstNameError: formErrorsToDisplay.firstName,
        lastName: lastName,
        changeLastName: (newText) => setLastName(newText),
        lastNameError: formErrorsToDisplay.lastName
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
        } else if (feet === '' && inches !== '') {
            let calculatedCentimeters = parseInt(inches) * 2.54
            let centimetersRounded = calculatedCentimeters.toFixed(2);
            return centimetersRounded;
        } else if (feet !== '' && inches === '') {
            let feetToCentimeters = (parseInt(feet) * 12) * 2.54;
            let centimetersRounded = feetToCentimeters.toFixed(2);
            return centimetersRounded;
        } 
    }

    const convertToImperial = () => {
        if (centimeters !== '') {
            let heightInInches = (parseInt(centimeters) * 0.393701).toFixed();
            let calculatedFeet = Math.floor(heightInInches / 12);
            let calculatedInches = heightInInches % 12;
            return {
                feet: calculatedFeet.toString(),
                inches: calculatedInches.toString()
            }
        } else {
            return {
                feet: '',
                inches: ''
            }
        }
    }

    const convertPoundsToKG = () => {
        if (weight !== '') {
            let kg = Math.floor(parseInt(weight) / 2.20462);
            return kg;
        }
    }

    const convertKGToPounds = () => {
        if (weight !== '') {
            let pounds = Math.floor(parseInt(weight) / 0.453592);
            return pounds;
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
            formErrors.push(error);
        }
    }

    const validateLastName = () => {
        if (lastName === '') {
            let error = {identifier: "lastName", message: 'Cannot be left blank'};
            formErrors.push(error);
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
                formErrors.push(error);
            }
        })
    }

    const validateEmail = () => {
        if (emailPhone === '') {
            let error = {identifier: 'emailPhone', message: 'Can not be left blank'};
            formErrors.push(error);
        } else {
            checkEmailForAt();
        }
    }

    const checkEmailForAt = () => {
        let splitAtAt = emailPhone.split('@');
        if (splitAtAt[0] === emailPhone) {
            let error = {identifier: 'emailPhone', message: 'An "@" must be present to be a valid email.'};
            formErrors(error)
        } else {
            if (splitAtAt.length < 2) {
                let error = {identifier: 'emailPhone', message: 'There must be characters on each side of the "@".'};
                formErrors(error);
            } else if (splitAtAt.length > 2) {
                let error = {identifier: 'emailPhone', message: 'There can only be one "@" in an email.'};
                formErrors(error);
            } else {
                checkEmailForPeriod(splitAtAt)
            }
        }
    }

    const checkEmailForPeriod = (emailSplitAtAt) => {
        let leftOfAt = emailSplitAtAt[0];
        let rightOfAt = emailSplitAtAt[1];
        if (leftOfAt.length < 1) {
            let error = {identifier: 'emailPhone', message: 'There must be characters present on the left side of the "@"'};
            formErrors.push(error);
        } 
        if (rightOfAt.length < 1) {
            let error = {identifier: 'emailPhone', message: 'There must be characters present on the right side of the "@"'};
            formErrors.push(error);
        }
        let rightSplitByPeriod = rightOfAt.split('.');
        if (rightSplitByPeriod === rightOfAt) {
            let error = {identifier: 'emailPhone', message: "There must be a period present in an email."};
            formErrors.push(error);
        } else {
            if (rightSplitByPeriod.length !== 2) {
                let error = {identifier: 'emailPhone', message: 'There must be characters on both sides of the period.'};
                formErrors.push(error);
            } else {
                let leftOfPeriod = rightSplitByPeriod[0];
                let rightOfPeriod = rightSplitByPeriod[1];
                if (leftOfPeriod.length < 1) {
                    let error = {identifier: 'emailPhone', message: 'There must be characters in betweeen the period and the "@".'};
                    formErrors.push(error);
                }
                if (rightOfPeriod.length < 1) {
                    let error = {identifier: 'emailPhone', message: 'There must be characters to the right of the period.'};
                    formErrors.push(error);
                }
            }
        }
    }

    const validatePhoneNumber = () => {
        let phoneNumberSplit = emailPhone.split('');
        if (phoneNumberSplit.length !== 10) {
            let error = {identifier: 'emailPhone', message: 'A valid phone number is ten digits long.'};
            formErrors.push([...formErrors, error]);
        }
    }
    const validateAge = () => {
        let parsed = parseInt(age);
        if (isNaN(parsed)) {
            let error = {identifier: 'age', message: 'Age must be a number.'};
            formErrors.push(error);
        }
        if (parsed < 14) {
            let error = {identifier: 'age', message: 'Must 14 years or older to use this app.'};
            formErrors.push(error);
        }
    }
    const validateWeight = () => {
        if (weight === '') {
            let error = {identifier: 'weight', message: 'Weight cannot be left empty.'};
            formErrors.push(error);
        }
        let weightParsed = parseInt(weight);
        if (isNaN(weightParsed)) {
            let error = {identifier: 'weight', message: 'Weigh must be a number.'};
            formErrors.push(error);
        }
    }

    const validateHeight = () => {
        if (measurementSystem === 'metric') {
            if (centimeters === '') {
                let error = {identifier: 'centimeters', message: 'The height cannot be left blank.'};
                formErrors.push(error);
            } else {
                let parsed = parseInt(centimeters);
                if (isNaN(parsed)) {
                    let error = {identifier: 'centimeters', message: 'Height must be a number'};
                    formErrors.push(error);
                }
            }
        } else {
            if (feet === '') {
                let error = {identifier: 'feet', message: 'Feet cannot be left empty.'};
                formErrors.push(error);
            }
            if (inches === '') {
                let error = {identifier: 'inches', message: 'Inches cannot be left empty.'};
                formErrors.push(error);
            }
            let feetParsed = parseInt(feet);
            if (isNaN(feetParsed)) {
                let error = {identifier: 'feet', message: 'Feet must be a number.'};
                formErrors.push(error)
            }
            let inchesParsed = parseInt(inches);
            if (isNaN(inchesParsed)) {
                let error = {identifier: 'inches', message: 'Inches must be a number.'};
                formErrors.push(error)
            }
        }
    }

    const handleSignUpPress = () => {
        validateForm();
        if (formErrors.length === 0) {
            let newUserInfo = {
                firstName: firstName,
                lastName: lastName,
                password: password,
                email: isPhoneNumber === true ? '' : emailPhone,
                phoneNumber: isPhoneNumber === true ? emailPhone : '',
                feet: measurementSystem === 'metric' ? convertToImperial().feet : feet,
                inches: measurementSystem === 'metric' ? convertToImperial().inches : inches,
                weight: measurementSystem === 'metric' ? convertKGToPounds().toString() : weight,
                age: age
            }
            createUser(newUserInfo)
        } else {
            displayErrors()
        }
    }

    const displayErrors = () => {
        let filteredErrors = [];
        formErrors.forEach(error => {
            if (filteredErrors.length === 0) {
                filteredErrors.push(error);
            } else {
                var isPresent = false;
                filteredErrors.forEach(filteredError => {
                    if (filteredError.identifier === error.identifier) {
                        isPresent = true;
                    }
                });
                if (isPresent === false) {
                    filteredErrors.push(error);
                }
            }
        });
        let formErrorObject = {}
        filteredErrors.forEach(filteredError => {
            formErrorObject[filteredError.identifier] = filteredError.message;
        });
        setFormErrorsToDisplay({
            ...formErrorsToDisplay,
            ...formErrorObject
        });
    }

    const configureErrors = () => {
        return measurementSystem === 'metric' ? 
        {
            centimeters: formErrorsToDisplay.centimeters
        } : 
        {
            feet: formErrorsToDisplay.feet,
            inches: formErrorsToDisplay.inches
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
                <EmailOrPhone error={formErrorsToDisplay.emailPhone} isPhoneNumber={isPhoneNumber} inputValue={emailPhone} valueChange={handleEmailPhone} />
                <CustomTextInput error={formErrorsToDisplay.password} inputType={'password'} placeholder={'Password'} inputValue={password} valueChange={handlePassChange} />
                <View style={[fullWidthContainer, styles.passRequirementsContainer ]}>
                    {renderPassRequirements()}
                </View>
                <FirstAndLastName inputOptions={firstAndLastOptions} />
                <CustomText   
                    content={'Metrics'}
                    size={'md'}
                    containerStyle={{alignItems: 'flex-start'}}
                />
                <CustomTextInput error={formErrorsToDisplay.age} inputValue={age} inputType={'userInfo'} placeholder={'Age'} valueChange={handleAgeChange}/>
                <HeightInput error={configureErrors()} setMeasurementSystem={handleMeasurmentSystemChange} measurementSystem={measurementSystem} centimeters={centimeters} setCentimeters={(newText) => setCentimeters(newText)} setInches={(newText) => setInches(newText)} inches={inches} feet={feet} setFeet={(newText) => setFeet(newText)} />
                <CustomTextInput error={formErrorsToDisplay.weight} placeholder={'Weight'} inputType={'userInfo'} inputValue={weight} valueChange={setWeight} />
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