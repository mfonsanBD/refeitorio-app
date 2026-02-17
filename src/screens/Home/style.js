import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF9900',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        borderRadius: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#FF9900',
        padding: 12,
        borderRadius: 5,
    },
    title: {
        fontSize: 36,
        color: '#FFFFFF',
        marginBottom: 30,
        textTransform: 'uppercase',
        fontFamily: 'PoppinsBold',
    },
    descriptionTop: {
        fontSize: 18,
        color: '#C4C4C4',
        textTransform: 'uppercase',
        fontFamily: 'PoppinsRegular',
    },
    descriptionBottom: {
        fontSize: 18,
        color: '#FF9900',
        textTransform: 'uppercase',
        fontFamily: 'PoppinsBold',
        marginTop: -10,
    },
});

export default styles;
