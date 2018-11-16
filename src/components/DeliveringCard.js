import React from 'react';
import { Text, View, Image } from 'react-native';


const DeliveringCard = (props)=>{
    imageSource = props.icon;
    text=props.text;
    const {
        circleRed,
        circleBlue,
        circleGreen,
        circleTextstyle,
        distanceView,
        requestPriceView,
        firstLineStyle,
        textView,
        textStyle
    } = styles;

    return (


        <View style={styles.rootView}>
            <View style={{flex:1, padding:10}}>
                <View style={firstLineStyle}>
                    <View style={circleBlue}><Text style={circleTextstyle}>起</Text></View>
                    <View style={distanceView}><Text style={distanceView.textStyle}>12km</Text></View>
                    <View style={circleRed}><Text style={circleTextstyle}>我</Text></View>
                    <View style={distanceView}><Text style={distanceView.textStyle}>8km</Text></View>
                    <View style={circleGreen}><Text style={circleTextstyle}>终</Text></View>
                </View>
                <View style={textView}><Text style={textStyle}>剩余时间：</Text></View>
                <View style={textView}><Text style={textStyle}>接收人：</Text></View>
                <View style={textView}><Text style={textStyle}>订单简况：</Text></View>
            </View>
            <View style={{justifyContent:'center'}}>
                <Image
                    source={require('../../img/nextArrow.png')}
                    style={{
                        width:20,
                        height: 20
                    }}
                />
            </View>

        </View>
    );
}

const styles = {
    rootView:{
        backgroundColor:'#fff',
        flexDirection: 'row',
        margin:5,
        padding:5
    },
    textStyle:{
        fontSize:18,
        fontStyle:'normal',
        fontWeight:'bold',
        color:'#444'
    },
    circleRed: {
        width: 30,
        height: 30,
        borderRadius: 100/2,
        backgroundColor: '#ff6600',
        borderWidth: 2,
        borderColor: '#ffc299',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleGreen: {
        width: 30,
        height: 30,
        borderRadius: 100/2,
        backgroundColor: '#33cc33',
        borderWidth: 2,
        borderColor: '#99e699',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleBlue: {
        width: 30,
        height: 30,
        borderRadius: 100/2,
        backgroundColor: '#3399ff',
        borderWidth: 2,
        borderColor: '#99ccff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleTextstyle:{
        color: '#fff'
    },
    distanceView:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height:30,
        marginLeft: 5,
        textStyle:{
            fontStyle: 'normal',
            fontWeight: 'bold',
        }
    },
    requestPriceView:{
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 60,
        padding:10,
        paddingRight: 10,
        borderLeftWidth: 2,
        borderColor:'#d9d9d9',
        width:100,
        height:40,
        textStyle:{
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 20,
        }
    },
    firstLineStyle:{
        flexDirection: 'row',
        borderColor:'#d9d9d9',
        borderBottomWidth: 2,
        justifyContent:'center',
        alignItems: 'center',
    },
    textView:{
        margin:10
    },

}

export default DeliveringCard;