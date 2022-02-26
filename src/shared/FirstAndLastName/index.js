import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import Colors from '../../../config/Colors';
const {} = Colors;

import globalStyles from '../../../styles/globalStyles';
const {fullWidthContainer} = globalStyles;
import CustomTextInput from '../CustomTextInput';
import CustomText from '../CustomText';

import FormError from '../FormError';

const FirstAndLastName = ({inputOptions}) => {
    const {firstName, lastName, changeFirstName, changeLastName, firstNameError, lastNameError} = inputOptions;

    return(
        <View style={[fullWidthContainer, styles.nameContainer]}>
            
            <View style={[fullWidthContainer,]}>
                <CustomText 
                    content={'Name'}
                    size={'md'}
                    containerStyle={{alignItems: 'flex-start'}}
                />
            </View>
            <View style={[fullWidthContainer, styles.inputRow]}>
                <View style={styles.inputCol}>
                    <CustomTextInput error={firstNameError} inputValue={firstName} valueChange={changeFirstName} inputType={'userInfo'} placeholder={"First"}/>
                </View>
                <View style={styles.inputCol}>
                    <CustomTextInput error={lastNameError} inputValue={lastName} valueChange={changeLastName} inputType={'userInfo'} placeholder={"Last"}/>
                </View>
            </View>
        </View>
    )
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    inputCol: {
        width: '49%',
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameContainer: {
        marginTop: height * 0.02,
    }
});

export default FirstAndLastName;