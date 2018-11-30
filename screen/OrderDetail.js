import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import firebase from 'firebase';
import { TouchableTextField } from '../src/components/Common'
import DataController from '../model/DataController';

class OrderDetail extends React.Component{

    state = {
        orderPathInFirebase: '',
        title:'',

        //Order information
        courierId: '',
        deliveryFee: '',
        status: '',
        storeUid: '',
        sum: '',
        timestamp: '',
        tip: '',
        customerId: '',
        orderItems: [],
        customerAddress: '',
        customerPhoneNumber:'',

        //Store information
        storeAddress: '',
        businessName: '',
        businessPhone: '',
        businessCoord: {
            latitude: '',
            longitude:''
        },
        rating: '',
        businessStatus: '',
        businessTimestamp: '',
        businessType: '',
        businessUserId: '',
        businessImages: [],


    }

    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('otherParam', 'A Nested Details Screen'),
        headerStyle: {
            backgroundColor: '#0080ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        fontSize:20,
        },
    })
    constructor(props){
        super(props);
    }

    componentWillMount(){
        var orderPathInFirebase = this.props.navigation.state.params.orderPathOnFirebase;
        var storeId = '';
        //alert(orderPathInFirebase);
        this.props.navigation.setParams({otherParam: this.props.navigation.state.params.businessName})
                
        firebase.database().ref(orderPathInFirebase).on('value', (snapshot)=>{
            var orderObj = snapshot.val();
            storeId = orderObj.storeUid;
            userId = orderObj.userId;

            firebase.database().ref('users/'+userId).on('value', snapshot=>{
                var userObj = snapshot.val();
                customAddress = userObj.pickupLocation;
                customerPhoneNumber = userObj.phoneNumber;
                stripeId = userObj.stripeId;
                this.setState({
                    customerAddress:customAddress,
                    customerPhoneNumber:customerPhoneNumber
                });
    
            });

            var timestamp = DataController.parseTimeStamp(orderObj.timestamp)
            var orderTime = timestamp[0]+'/'+timestamp[1]+'/'+timestamp[2]+' '+timestamp[3]+':'+timestamp[4]+':'+timestamp[5];


            this.setState({
                courierId: orderObj.courierId,
                deliveryFee: orderObj.deliveryFee,
                status: orderObj.status,
                storeUid: orderObj.storeUid,
                sum: orderObj.sum,
                timestamp: orderTime,
                tip: orderObj.tip,
                customerId: orderObj.userId,
                orderItems: orderObj.orders,
            })
            
        }, (error)=>{
            alert(error);
        })
        

        firebase.database().ref('/stores/'+storeId).on('value',(data)=>{
            var store = data.val();

            console.log('JSONNN'+JSON.stringify(store));
            //businessName= store.business_name;

            this.setState({
                businessName: store.business_name,
                storeAddress: store.address,
            })

        },(error)=>{
            alert(error);
        });
    }

    renderOrderItems(){

        //orderItems = this.state.orderItems;
        //alert(orderItems[0].name);
        return this.state.orderItems.map(item=>{

            return(
                <View key={item.name}>
                    <View style={{
                        flexDirection:'row', 
                        marginTop:5,    
                    }}>
                        <Text style={{flex:3}}>{item.name}</Text>
                        <Text style={{flex:1}}>{item.quantity}</Text>
                    </View>
                </View>

            );
        });
    }

    render(){

        //alert(this.status);
        return(
                <View style={{flex:1, resizeMode: 'stretch', backgroundColor:'#fff' ,bottom: 0,}}>
                    <ScrollView>
                    <TouchableTextField 
                        tag='店名' 
                        text={this.state.businessName}
                        unTouchable='true'/>
                    <TouchableTextField 
                        tag='取餐地址' 
                        icon={require('../img/mapnavigation.png')} 
                        text={this.state.storeAddress}/>
                    <TouchableTextField 
                        tag='送餐地址' 
                        icon={require('../img/mapnavigation.png')} 
                        text={this.state.customerAddress}/>
                    <TouchableTextField 
                        tag='客人联系电话' 
                        text={this.state.customerPhoneNumber}
                        unTouchable='true'/>
                    <TouchableTextField 
                        tag='点餐时间' 
                        text={this.state.timestamp}
                        unTouchable='true'/>
                    <View style={{
                        margin: 20,
                        backgroundColor: '#FAD992',
                        padding:20,
                        height:250,
                    }}>
                        <View style={{
                            flexDirection:'row',
                        }}>
                            <Text style={{flex:3, fontSize:16, fontWeight:'bold'}}>名字</Text>
                            <Text style={{flex:1, fontSize:16, fontWeight:'bold'}}>数量</Text>
                        </View>
                        <ScrollView>
                            {this.renderOrderItems()}
                        </ScrollView>
                    </View>
                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end', marginRight: 30}}>
                        <Text style={{fontSize:16, fontWeight: 'bold'}}>订单价格</Text>
                        <Text style={{fontSize:16, marginLeft:20, }}>{this.state.sum}</Text>     
                    </View>
                   
                    </ScrollView>
                </View>
                
            )
    }
}

export default OrderDetail;