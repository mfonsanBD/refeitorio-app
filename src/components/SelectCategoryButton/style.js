import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    selectContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    modalHeader: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalHeaderTitle: {
        color: '#333333',
        fontFamily: 'PoppinsBold',
        fontSize: 17,
    },
    iconBackground: {
        width: 130,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FF9900',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    cancel: {
        color: '#FFFFFF',
        fontFamily: 'PoppinsMedium',
        marginLeft: 5,
    },
    clickCategory: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    modalCategory: {
        fontSize: 16,
        fontFamily: 'PoppinsRegular',
        color: '#495057',
    },
});

export default styles;
