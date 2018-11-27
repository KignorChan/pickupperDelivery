import React from 'react';
import { Text, View, Image, Alert } from 'react-native';
import { Address, RoundSquare, Button } from './DeliveryRequestComponents';
import firebase from 'firebase';
import DataController from '../../model/DataController';
import { AppConsumer } from '../../model/AppContext'

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

    }


    constructor(props){
        super(props);  
    }

    componentWillMount(){
        //console.log('zzzzzzzz'+this.props.orderPathInFirebase);
        this.setState({orderPathInFirebase: this.props.orderPathInFirebase});

        this.order = JSON.parse(this.props.value);
        this.orderDetail= this.order.orderDetail;

        console.log('qqqqqq'+this.order.orderPathInFirebase);

        var storeId = this.orderDetail.storeUid;
        var customAddress = this.orderDetail.customerAddr ? this.orderDetail.customerAddr : null;
        this.setState({
            customAddress:customAddress,
        });
        

        firebase.database()
        .ref('stores/'+storeId)
        .on('value',snapshot=>{
            var store = snapshot.val();
            this.setState({
                businessAddress:store.address,
                businessName:store.business_name
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

    submitGetDelivery(uid){
        //alert(this.state.orderPathInFirebase);
        console.log('asdasd'+uid);
        Alert.alert(
            '订单确认',
            '你确定接受这份订单吗？',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => {
                firebase.database()
                .ref(this.props.orderPathInFirebase)
                .update({
                    status:'delivering',
                    courierId: uid,
                });
              }},
            ],
            { cancelable: false }
          )
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

        return (
            <AppConsumer>
            {(value)=>(
                <View style={requestViewStyle}>
                    
                    <View style={firstLineStyle}>
                        <View style={circleRed}><Text style={circleTextstyle}>我</Text></View>
                        <View style={distanceView}><Text style={distanceView.textStyle}>12km</Text></View>
                        <View style={circleBlue}><Text style={circleTextstyle}>取</Text></View>
                        <View style={distanceView}><Text style={distanceView.textStyle}>8km</Text></View>
                        <View style={circleGreen}><Text style={circleTextstyle}>送</Text></View>
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
                </View>
            )}
            </AppConsumer>



            
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