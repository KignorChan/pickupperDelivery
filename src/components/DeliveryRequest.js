import React from 'react';
import { Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { Address, RoundSquare, Button } from './DeliveryRequestComponents';
import firebase from 'firebase';
import geolib from 'geolib';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DataController from '../../model/DataController';
import { AppConsumer } from '../../model/AppContext';
import { DeliveryProcessBar } from './Common'

class DeliveryRequest extends React.Component{
    order = null;
    orderDetail = null;
    state={
        orderPathInFirebase:'',
        businessAddress:'',
        businessName: '',
        deliveryFee:'',
        timestamp:'',
        orderFee:'',
        customAddress:'',
        stripeId: '',
        
        userPosition:null,

        businessCoord: {latitude: 0, longitude: 0},
        userCurrentCoord:{latitude: 0, longitude: 0},
        meToBusinessDistance:0,
        businessToCustomerDistance:0,

        orderDetail:null,

    }


    constructor(props){
        super(props);  
    }

    componentWillMount(){
        this.getCurrentUserPosition();

        this.setState({orderPathInFirebase: this.props.orderPathInFirebase});

        this.order = JSON.parse(this.props.value);
        this.orderDetail= this.order.orderDetail;
        

        firebase.database().ref(this.props.orderPathInFirebase).on('value',snapshot=>{
            orderObj = snapshot.val();
            this.setState({orderDetail:orderObj});
        })

        storeId = this.orderDetail.storeUid;
        userId = this.orderDetail.userId;

        firebase.database().ref('users/'+userId).on('value', snapshot=>{
            var userObj = snapshot.val();

            if(userObj){
                customAddress = userObj.pickupLocation;
                stripeId = userObj.stripeId;
                this.setState({
                    customAddress:customAddress,
                });
            }
        });



        

        firebase.database()
        .ref('stores/'+storeId)
        .on('value',snapshot=>{
            var store = snapshot.val();
            this.setState({
                businessAddress:store.address,
                businessName:store.business_name,
                businessCoord:{
                    latitude: store.latitude ,
                    longitude: store.longitude,
                }
            });
        });

        firebase.database()
        .ref(this.props.orderPathInFirebase)
        .on('value',snapshot=>{
            var order = snapshot.val();
            this.setState({
                deliveryFee:order.deliveryFee,
                timestamp: order.timestamp,
                orderFee: order.sum,
            });
        }); 
    }

    //handle some geo calculate
    getCurrentUserPosition(){
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                console.log('Position'+JSON.stringify(position));
                this.setState({
                    userPosition: position,
                    userCurrentCoord: position.coords,
                });
                
            }
            ,
            (error)=>{console.log(error);}
            ,
            {
                enableHighAccuracy:true,
            }
        );

    }



    submitGetDelivery(uid){
        console.log('asdasd'+uid);
        Alert.alert(
            '订单确认',
            '你确定接受这份订单吗？',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => {
                if(this.state.orderDetail.status!='progressing'){
                    Alert.alert('取单失败','看来你慢了一步，此单已被他人提取了！');
                }else{
                    firebase.database()
                    .ref(this.props.orderPathInFirebase)
                    .update({
                        status:'taking',
                        courierId: uid,
                    }).then(()=>{
                        Alert.alert('取单成功', '去完成你的伟大使命吧！');
                    }).catch((error)=>{
                        alert(error);
                    });
                }
              }},
            ],
            { cancelable: false }
        )
    }

    meToBusinessDistance(){
        var distance = geolib.getDistance(
                            {latitude:43.77173745, longitude: -79.26133264244683},   //要改成GPS获取的位置
                            this.state.businessCoord
                        )

        var distanceInKm = distance/1000;
        distanceInKm = distanceInKm.toFixed(1);
        
        return (
            <Text>{distanceInKm+' km'}</Text>
        );

    }

    handleOnPress(){
        this.props.onPress(this.state.orderPathInFirebase, this.state.businessName);
    }

    render(){
        var timestamp = DataController.parseTimeStamp(this.state.timestamp);
        console.log(timestamp);

        var orderTime = timestamp[0]+'/'+timestamp[1]+'/'+timestamp[2]+' '+timestamp[3]+':'+timestamp[4]+':'+timestamp[5];
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
        if(this.state.orderDetail.status == 'progressing'){
            return (
                <AppConsumer>
                {(value)=>(
                    <TouchableOpacity style={requestViewStyle} onPress={this.handleOnPress.bind(this)}>
                        <View style={firstLineStyle}>
                            <View style={{flex:5}}>
                                <DeliveryProcessBar businessCoord={this.state.businessCoord}/>

                            </View>

                            <View style={requestPriceView}><Text style={requestPriceView.textStyle}>$ {this.state.deliveryFee}</Text></View>
                        </View>
            
                        <View style={horizontalArrangement}>
                            <View style={{flex: 1}}>
                                <Address target='From' tag='店名：'>{this.state.businessName}</Address>
                                <Address target='From' tag='取:'>{this.state.businessAddress}</Address>
                                <Address target='To' tag='送:'>{this.state.customAddress}</Address>
                                <View style={horizontalArrangement}>
                                    <RoundSquare>订单价格:{this.state.orderFee}元</RoundSquare>
                                    <RoundSquare>下单时间：{orderTime}</RoundSquare>
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
                            <Button text='取单' onPress={this.submitGetDelivery.bind(this, value.userId)}/>
                        </View>
                    </TouchableOpacity>
                )}
                </AppConsumer>
                
            );
        }else{
            return null;
        }

        
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
        }
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
        },
        flex:1
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

const Navigator = createStackNavigator

export default DeliveryRequest;