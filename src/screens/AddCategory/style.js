import { StyleSheet } from 'react-native';

export const getModalColors = (modalType) => {
    switch (modalType) {
        case 'success': return { bg: 'rgb(165, 220, 134)', bgOpacity: 'rgba(165, 220, 134, 0.1)' };
        case 'warning': return { bg: 'rgb(250, 206, 168)', bgOpacity: 'rgba(250, 206, 168, 0.1)' };
        default: return { bg: 'rgb(242, 116, 116)', bgOpacity: 'rgba(242, 116, 116, 0.1)' };
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6FA',
        padding: 25,
    },
    header: {
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'PoppinsBold',
        color: '#333333',
    },
    label: {
        fontSize: 16,
        color: '#495057',
        marginBottom: 10,
        fontFamily: 'PoppinsMedium',
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDDDDD',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        color: '#495057',
        fontSize: 16,
        padding: 10,
        marginBottom: 20,
        fontFamily: 'PoppinsRegular',
    },
    saveButton: {
        backgroundColor: '#FF9900',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 5,
    },
    saveButtonText: {
        fontFamily: 'PoppinsBold',
        color: '#FFFFFF',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 25,
        paddingBottom: 30,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalTitle: {
        fontFamily: 'PoppinsBold',
        fontSize: 28,
        color: '#495057',
    },
    circleOpacity: {
        width: 135,
        height: 135,
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backToHome: {
        width: '100%',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    backToHomeText: {
        fontFamily: 'PoppinsBold',
        textAlign: 'center',
    },
    message: {
        fontFamily: 'PoppinsMedium',
        textAlign: 'center',
        fontSize: 18,
        color: '#AAAAAA',
    },
});

export default styles;
