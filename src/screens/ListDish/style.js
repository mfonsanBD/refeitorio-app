import { StyleSheet } from 'react-native';

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
    loadingArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyDish: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    EmptyDishText: {
        width: '70%',
        fontFamily: 'PoppinsMedium',
        textAlign: 'center',
        fontSize: 18,
        color: '#AAAAAA',
    },
});

export default styles;
