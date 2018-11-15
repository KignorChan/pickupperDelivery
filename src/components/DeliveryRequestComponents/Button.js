import React from 'react';
import { Text, View } from 'react-native';

const Button = (props)=>{
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{props.text}</Text>
        </View>
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