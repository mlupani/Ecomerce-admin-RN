import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
    formContainer:{
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        height: 600,
        marginBottom: 50,
    },
    title: {
        color:'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 30,
    },
    label: {
        color: 'white',
        fontWeight: 'bold',
    },
    buttonContainer:{
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 50,
    },
    button:{
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    buttonBack: {
        position:'absolute',
        top: 30,
        left: 20,
    },
});
