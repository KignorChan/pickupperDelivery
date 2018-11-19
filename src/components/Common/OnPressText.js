import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const OnPressText = ({text, onPress})=>{
    return (
        <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
            <Text style={styles.textStyle}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles={
    textStyle:{
        color: '#ff704d',
        fontWeight: 'bold',
        fontSize: 14,
    },
    buttonStyle:{
        backgroundColor: '#fff', 
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingTop: 5,
        paddingBottom: 5,

    }
}

export { OnPressText };