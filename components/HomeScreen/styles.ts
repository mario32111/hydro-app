import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    noDataText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginBlockStart:30
    },
    logo: {
        width: 50,
        height: 50,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
        paddingTop: 50,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'rgb(147,194,26)',
        marginTop: 10,
    },
    systemContainer: {
        marginTop: 20,
    },
    system: {
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    systemInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    systemName: {
        fontSize: 18,
        color: 'rgb(147,194,26)',
        marginLeft: 10,
        flex: 1,
    },
    progressBar: {
        marginVertical: 10,
    },
    stageSummary: {
        marginTop: 10,
    },
    systemHoursContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    systemHours: {
        color: 'gray',
        fontSize: 14,
        marginLeft: 10,
    },
    warning: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});
