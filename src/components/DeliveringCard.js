import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { Address } from './DeliveryRequestComponents';

class DeliveringCard extends React.Component{
    state={
        orderPathInFirebase:'',
        businessAddress:'',
        businessName: '',
        deliveryFee:'',
        timestamp:'',
        orderFee:'',
        customAddress:'',
        orderDetail:null,
    }

    order = null;
    orderDetail = null;

    constructor(props){
        super(props);
        
    }

    componentWillMount(){
        this.setState({orderPathInFirebase: this.props.orderPathInFirebase});

        this.order = JSON.parse(this.props.value);
        this.orderDetail= this.order.orderDetail;


        firebase.database().ref(this.props.orderPathInFirebase).on('value',snapshot=>{
            orderObj = snapshot.val();
            this.setState({
                orderDetail:orderObj
            });
        })

        var userId = this.orderDetail.userId;

        firebase.database().ref('users/'+userId).on('value', snapshot=>{
            var userObj = snapshot.val();
            customAddress = userObj.pickupLocation;
            stripeId = userObj.stripeId;
            this.setState({
                customAddress:customAddress,
            });

        });

        var storeId = this.orderDetail.storeUid;  
        firebase.database()
        .ref('stores/'+storeId)
        .on('value',snapshot=>{
            var store = snapshot.val();
            this.setState({
                businessAddress:store.address,
                businessName:store.business_name
            });
        });

    }

    handleOnPress(){
        //alert(this.state.orderPathInFirebase);
        this.props.onPress(this.state.orderPathInFirebase, this.state.businessName);
    }
    
    render(){
        imageSource = this.props.icon;
        text=this.props.text;

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

        if(this.state.orderDetail.status=='delivering'){
            return (
                <TouchableOpacity style={styles.rootView} onPress={this.handleOnPress.bind(this)}>
                    <View style={{flex:1, padding:10}}>
                        <View style={firstLineStyle}>
                            <View style={circleBlue}><Text style={circleTextstyle}>起</Text></View>
                            <View style={distanceView}><Text style={distanceView.textStyle}>12km</Text></View>
                            <View style={circleRed}><Text style={circleTextstyle}>我</Text></View>
                            <View style={distanceView}><Text style={distanceView.textStyle}>8km</Text></View>
                            <View style={circleGreen}><Text style={circleTextstyle}>终</Text></View>
                        </View>
                        <View style={textView}>
                            <Address target='From' tag='店名：'>{this.state.businessName}</Address>
                            <Address target='From' tag='取:'>{this.state.businessAddress}</Address>
                            <Address target='To' tag='送:'>{this.state.customAddress}</Address>
                        <View style={textView}>
                            <Text style={textStyle}>剩余时间：</Text>
                            <Text style={textStyle}>订单简况：</Text>
                        </View>
                        </View>
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
    
                </TouchableOpacity>
            );

        }else{
            return null;
        }
        
    }
    
    
    
    
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