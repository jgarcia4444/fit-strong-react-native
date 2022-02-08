import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Colors from '../../../config/Colors';
const {} = Colors;

import globalStyles from '../../../styles/globalStyles';
const {fullWidthContainer} = globalStyles;
import CustomTextInput from '../CustomTextInput';
import CustomText from '../CustomText';

const FirstAndLastName = ({inputOptions}) => {
    const {firstName, lastName, changeFirstName, changeLastName} = inputOptions;

    return(
        <View style={[fullWidthContainer, ]}>
            <View style={[fullWidthContainer,]}>
                <CustomText 
                    content={'Name'}
                    size={'md'}
                    containerStyle={{alignItems: 'flex-start'}}
                />
            </View>
            <CustomTextInput inputValue={firstName} valueChange={changeFirstName} inputType={'userInfo'} placeholder={"First"}/>
            <CustomTextInput inputValue={lastName} valueChange={changeLastName} inputType={'userInfo'} placeholder={"Last"}/>
        </View>
    )
}

const styles = StyleSheet.create({

});

export default FirstAndLastName;