import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const Button = ({text, onPress})=>{
    return (
        <TouchableOpacity style={styles.viewStyle} onPress={onPress}>
            <Text style={styles.textStyle}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles={
    viewStyle:{
        backgroundColor: '#0080ff', 
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,

    },
    textStyle:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22,
    }
}

export { Button };