import React from 'react';
import { Text, View } from 'react-native';

const Address = (props)=>{
    const { 
        horizontalArrangement,
        textStyleBlue,
        textStyleRed,
        tagStyle,
        addressStyle,
        addressTextStyle
     } = styles;

     if(props.target == 'From'){
        textStyle = textStyleBlue;
     }else if(props.target == 'To'){
        textStyle = textStyleRed;
     }

    return (
        <View style={horizontalArrangement}>
            <View style={tagStyle}><Text style={textStyle}>{props.tag}</Text></View>

            <View style={addressStyle}>
                <Text style={addressTextStyle}>
                    {props.children}
                </Text>
            </View>
        </View>

    );
}

const styles = {
    horizontalArrangement:{
        flexDirection: 'row',
    },
    textStyleBlue:{
        fontSize: 22,
        color: '#3399ff',
        fontWeight: 'bold',

    },
    textStyleRed:{
        fontSize: 22,
        color: '#ff6600',
        fontWeight: 'bold',
    },
    tagStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 5,
        paddingRight: 5,
    },
    addressStyle:{
        padding:5,
        justifyContent: 'center',
        flex: 1,
    },
    addressTextStyle:{
        fontSize: 18,
    }

}

export { Address };