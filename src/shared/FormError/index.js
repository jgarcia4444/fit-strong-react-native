import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import globalStyles from '../../../styles/globalStyles';
const {fullWidthContainer} = globalStyles;

import Colors from '../../../config/Colors';
const {red} = Colors;

const FormError = ({error}) => {

    return (
        <View style={[fullWidthContainer, styles.errorRow]}>
            {error !== "" && 
                <Text style={styles.errorText}>{error}</Text>
            }
        </View>
    )
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
        errorText: {
            color: red
        },
        errorRow: {
            alignItems: 'flex-start',
            marginTop: height * 0.01,
        },
    }
)

export default FormError