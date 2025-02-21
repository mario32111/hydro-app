import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'rgb(147,194,26)',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'gray',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    iconWrapper: {
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxLabel: {
        marginLeft: 10,
        color: 'gray',
    },
    submitButton: {
        backgroundColor: 'rgb(147,194,26)',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    picker: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        padding: 0,
    },
    pickerContainer: {
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: '#FFF',
    },
});

export default styles;
