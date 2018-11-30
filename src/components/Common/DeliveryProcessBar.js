import React from 'react';
import { View, Text } from 'react-native';

import Geocoder from 'react-native-geocoding';

class DeliveryProcessBar extends React.Component{

    state={
        meToBusinessDistance: '',
        meToCustomerDistance: '',
        businessAddress:'',
        customerAddress:''
    }

    constructor(props){
        super(props);
        this.setState({
            businessAddress:this.props.businessAddress,
            customerAddress:this.props.customerAddress,
        });

    }
    

    render(){

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
            remarksTextStyle,
            circleView
        } = styles;


        return (
            <View style={firstLineStyle}>
                <View style={circleView}>
                    <View style={circleRed}><Text style={circleTextstyle}>我</Text></View>
                </View>

                <View style={distanceView}><Text style={distanceView.textStyle}>16km</Text></View>
                
                <View style={circleView}>
                    <View style={circleBlue}><Text style={circleTextstyle}>取</Text></View>
                </View>
                
                <View style={distanceView}><Text style={distanceView.textStyle}>12km</Text></View>
                
                <View style={circleView}>
                    <View style={circleGreen}><Text style={circleTextstyle}>送</Text></View>
                </View>
            </View>
        );
    }
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
        width: 70,
        height:30,
        marginLeft: 5,
        textStyle:{
            fontStyle: 'normal',
            fontWeight: 'bold',
        },
        flex:2
    },
    horizontalArrangement:{
        flexDirection: 'row',

    },
    requestPriceView:{
        justifyContent: 'center',
        marginLeft: 10,
        padding:10,
        paddingRight: 10,
        borderLeftWidth: 2,
        borderColor:'#d9d9d9',
        width:70,
        height:40,
        textStyle:{
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 20,
        }
    },
    firstLineStyle:{
        flexDirection: 'row',
    },
    remarksViewStyle:{
        padding: 8,
    },
    remarksTextStyle:{
        color: '#e65c00',
    },
    circleView:{
        flex:1,
    }
}
export { DeliveryProcessBar };