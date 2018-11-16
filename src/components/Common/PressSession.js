import React from 'react';
import { Text, View, Image } from 'react-native';


const PressSession = (props)=>{
    const {
        sessionStyle,
        iconStyle,
        iconViewStyle,
        textViewStyle
    } = styles;
    
    
    //imageSource = props.icon;
    imageSource = props.icon;
    text=props.text;

    return (
        <View style={sessionStyle}>
            <View style={iconViewStyle}>
                <Image source={props.icon} style={iconStyle}/>
            </View>

            <View style={textViewStyle}>
                <Text>{text}</Text>
            </View>
        </View>
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