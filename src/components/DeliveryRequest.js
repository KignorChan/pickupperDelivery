import React from 'react';
import { Text, View, Image } from 'react-native';
import { Address, RoundSquare, Button } from './DeliveryRequestComponents';


const DeliveryRequest = ()=>{
    const {
        requestViewStyle,
        circleRed,
        circleBlue,
        circleGreen,
        circleTextstyle,
        distanceView,
        horizontalArrangement,
        requestPriceView,
        firstLineStyle,
        remarksViewStyle,
        remarksTextStyle
    } = styles;

    return (
        <View style={requestViewStyle}>
            
            <View style={firstLineStyle}>
                <View style={circleRed}><Text style={circleTextstyle}>我</Text></View>
                <View style={distanceView}><Text style={distanceView.textStyle}>12km</Text></View>
                <View style={circleBlue}><Text style={circleTextstyle}>取</Text></View>
                <View style={distanceView}><Text style={distanceView.textStyle}>8km</Text></View>
                <View style={circleGreen}><Text style={circleTextstyle}>送</Text></View>
                <View style={requestPriceView}><Text style={requestPriceView.textStyle}>$7</Text></View>
            </View>

            <View style={horizontalArrangement}>
                <View style={{flex: 1}}>
                    <Address target='From' tag='取:'>115 Sherper Avenue East, Scarborou, ON M1P5B4 </Address>
                    <Address target='To' tag='送:'>630 Marham Road, scarborough, ON, M1D2G3 </Address>
                    <View style={horizontalArrangement}>
                        <RoundSquare>在线支付5.0元</RoundSquare>
                        <RoundSquare>顾客下单时间：13:47</RoundSquare>
                    </View>
                    <View style={remarksViewStyle}>
                        <Text style={remarksTextStyle}>备注：</Text>
                    </View>
                </View>
                <View style={{
                        justifyContent:'center'
                    }}>
                    <Image
                        source={require('../../img/nextArrow.png')}
                        style={{
                            width:20,
                            height: 20
                        }}
                    />
                </View>
            </View>
            

            <View>
                <Button text='取单'/>
            </View>
        </View>
    );
}

const styles = {
    requestViewStyle:{
        padding:15,
        backgroundColor:'#fff',
        borderBottomWidth: 5,
        borderBottomColor: '#F2F2F2',
        
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
        width: 50,
        height:30,
        marginLeft: 5,
        textStyle:{
            fontStyle: 'normal',
            fontWeight: 'bold',
        }
    },
    horizontalArrangement:{
        flexDirection: 'row',

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
        borderBottomWidth: 2
    },
    remarksViewStyle:{
        padding: 8,
    },
    remarksTextStyle:{
        color: '#e65c00',
    }
}

export default DeliveryRequest;