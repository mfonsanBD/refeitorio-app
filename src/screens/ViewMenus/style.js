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
    loadingArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyMenu: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    EmptyMenuText: {
        width: '70%',
        fontFamily: 'PoppinsMedium',
        textAlign: 'center',
        fontSize: 18,
        color: '#AAAAAA',
    },
    itemsCategories: {},
    dishContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dish: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        marginBottom: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    categoryName: {
        fontSize: 16,
        fontFamily: 'PoppinsMedium',
        color: '#495057',
        marginLeft: 5,
    },
    dishView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    dishName: {
        fontSize: 16,
        fontFamily: 'PoppinsRegular',
        color: '#AAAAAA',
        marginLeft: 5,
    },
});

export default styles;
