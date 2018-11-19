import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const Button = ({text, onPress})=>{
    return (
        <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
            <Text style={styles.textStyle}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles={
    textStyle:{
        color: '#888888',
        fontWeight: 'bold',
        fontSize: 22,
    },
    buttonStyle:{
        backgroundColor: '#fff', 
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 2,
        borderRadius:5,
        width:200,
        borderColor: '#008888',

    }
}

export { Button };