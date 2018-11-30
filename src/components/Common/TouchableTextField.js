import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';


const TouchableTextField = ({onPress, icon, text, tag, unTouchable})=>{
    const {
        sessionStyle,
        iconStyle,
        iconViewStyle,
        textViewStyle,
        tagTextStyle,
        tagViewStyle
    } = styles;

    if(unTouchable){
        return (
            <View style={sessionStyle} onPress={onPress}>
                <View style={tagViewStyle}>
                    <Text style={tagTextStyle}>{tag}</Text>
                </View>
                <View style={textViewStyle}>
                    <Text>{text}</Text>
                </View>
                <View style={iconViewStyle}>
                    <Image source={icon} style={iconStyle}/>
                </View>
            </View>
        );
    }
    
    return (
        
        <TouchableOpacity style={sessionStyle} onPress={onPress}>
            <View style={tagViewStyle}>
                <Text style={tagTextStyle}>{tag}</Text>
            </View>
            <View style={textViewStyle}>
                <Text>{text}</Text>
            </View>
            <View style={iconViewStyle}>
                <Image source={icon} style={iconStyle}/>
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
        alignItems:'center',
    },
    iconViewStyle:{
        width:80,
        height: 50,
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    textViewStyle:{
        flex:3,
        fontSize:16
    },
    iconStyle: {
        width:25,
        height:25
    },
    tagTextStyle:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    tagViewStyle:{
        marginLeft: 10,
        marginRight: 10,
        flex:1

    }
}

export {TouchableTextField};