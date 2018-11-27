import React from 'react';
import { Text, TextInput, View } from 'react-native';

const Input = ({ label, value, onChangeText, placeHolder, secureTextEntry, autoFocus, keyboardType  })=>{
    const {
        containerStyle,
        labelStyle,
        inputStyle
    }=styles;

    return(
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                autoFocus={autoFocus}
                style={inputStyle}
                placeholder={placeHolder}
                autoCorrect={false}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
            />
        </View>
    );
}

const styles = {
    containerStyle:{
        flexDirection: 'row',
        height:40,
        marginTop:10

    },
    labelStyle:{
        fontSize:18,
        paddingLeft:20,
        fontWeight:'bold',
        paddingTop:10,
        paddingRight:20
    },
    inputStyle:{
        flex:2,
        lineHeight:23,
        alignItems: 'center',
        justifyContent:'center',
        paddingLeft:10,
        paddingRight:10,
        marginRight:10,
        borderBottomColor: '#000',
        borderBottomWidth: 1,




    }
}

export { Input };