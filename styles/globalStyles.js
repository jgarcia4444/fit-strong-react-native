import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../config/Colors';

const {width, height} = Dimensions.get('window');
const {white} = Colors;

const globalStyles = StyleSheet.create ({
    parentContainer: {
        paddingHorizontal: width * 0.02,
        paddingVertical: height * 0.05,
        backgroundColor: white,
        width: width,
        height: height,
    },
    fullWidthContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default globalStyles