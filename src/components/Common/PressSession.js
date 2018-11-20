import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';


const PressSession = ({onPress, icon, text})=>{
    const {
        sessionStyle,
        iconStyle,
        iconViewStyle,
        textViewStyle
    } = styles;
    
    
    //imageSource = props.icon;

    return (
        <TouchableOpacity style={sessionStyle} onPress={onPress}>
            <View style={iconViewStyle}>
                <Image source={icon} style={iconStyle}/>
            </View>

            <View style={textViewStyle}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles={
    sessionStyle:{
        backgroundColor:'#fff',
        marginTop:5,
        flexDirection:'row',
        height:50,
        justifyContent:'center',
        alignItems:'center'
    },
    iconViewStyle:{
        width:80,
        height: 50,
        justifyContent:'center',
        alignItems:'center'
    },
    textViewStyle:{
        flex:1
    },
    iconStyle: {
        width:25,
        height:25
    }
}

export {PressSession};