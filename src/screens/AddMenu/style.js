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
    list: {
        marginBottom: 15,
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
    itemsCategories: {
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#C4C4C4',
    },
    dishContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dish: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        marginBottom: 5,
    },
    dishName: {
        fontSize: 16,
        marginLeft: 5,
        color: '#AAAAAA',
        fontFamily: 'PoppinsRegular',
    },
    label: {
        width: '100%',
        fontSize: 16,
        color: '#495057',
        marginBottom: 10,
        fontFamily: 'PoppinsMedium',
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
    twoButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backToHome: {
        width: '100%',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    backToHomeHalf: {
        width: '48%',
        paddingVertical: 15,
        paddingHorizontal: 30,
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
    loadingArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;
