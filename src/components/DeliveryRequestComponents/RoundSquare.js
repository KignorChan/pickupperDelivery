import React from 'react';
import { Text, View } from 'react-native';

const RoundSquare =(props)=>{
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>
                {props.children}
            </Text>
        </View>
    );
}

const styles={
    viewStyle:{
        borderWidth: 2,
        borderColor: '#ff6600',
        borderRadius: 100/2,
        padding: 5,
        margin: 3,
    },
    textStyle:{
        color: '#ff6600',
        fontSize: 12,
    }
}

export { RoundSquare };