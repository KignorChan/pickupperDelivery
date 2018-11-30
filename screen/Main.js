import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, AsyncStorage, ListView, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { createStackNavigator } from 'react-navigation';
import WarnMessageBox from '../src/components/WarnMessageBox';
import DeliveryRequest from '../src/components/DeliveryRequest'; 
import DataController from '../model/DataController';
import { AppConsumer } from '../model/AppContext';
import OrderDetail from './OrderDetail';

const ds = new ListView.DataSource({rowHasChanged: (r1,r2)=>r1!=r2});

class Main extends Component{
    orders = [];
    //keysArray = [];

    static navigationOptions = ({navigation}) => ({
        title: "待送餐列表",
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

        this.state={
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            displayNetworkError:false,
            

            orders: [],
        };
    }

    addOrderToArray(order){        
        this.orders.push(order);
    }

    componentWillMount(){ 
        this.orders = [];
        getData = (snapshot)=>{

            const dataObject = snapshot.val() || null;
            
            if (dataObject) {              
            const keys = Object.keys(dataObject);
            
                for(var i=0; i<keys.length; i++){
                    //console.log('Keys['+i+']: '+keys[i]);
                    var key = keys[i];
                    
                    var orderSubObject = dataObject[key];
                    
                    var orderSubObjectKeys = Object.keys(orderSubObject);

                    for(var k=0; k<orderSubObjectKeys.length ; k++){
                        var subKey = orderSubObjectKeys[k];
                        console.log('subOrderKey['+i+']['+k+']'+subKey);    //get all suborder keys for now
                        console.log('subOrderKey['+i+']['+k+'] status: ' +orderSubObject[subKey].status);
                        var orderStatus = orderSubObject[subKey].status;

                        //order status: 
                        if(orderStatus != null && orderStatus != ''){
                            if(orderStatus == 'progressing'){
                                var orderSubObjectInJson = JSON.stringify(orderSubObject[subKey]);
                                console.log('orderSubObjectInJson'+orderSubObjectInJson);
                            
                                var order={
                                        orderPathInFirebase: snapshot.key +'/'+ key +'/'+ subKey,
                                        orderDetail: JSON.parse(orderSubObjectInJson),
                                    }
                            
                                this.addOrderToArray(order);

                                //alert(this.state.orders.length);
                                console.log('Testttttaaaa: '+this.orders[0].orderDetail.deliveryFee);
                                console.log('fffff'+this.orders[0].orderDetail.status);
                                
                                this.setState({
                                    orders: this.orders
                                })
                            }
                        }
                    }
                }         
            }
        }

        getError = err =>{
            console.log(err);
        }

        firebase.database()
        .ref('/orders/')
        .on('value', getData, getError);

    }

    componentDidMount(){
        this.makeRemoteRequest();
    }

    makeRemoteRequest(){

    }

    renderNetworkError(){
        if(this.state.displayNetworkError){
            return (<WarnMessageBox>Warning!!!!</WarnMessageBox>);
            
        }
    }

    //Render Entire order list
    renderOrderList(value){
        var keysArray = [];


        return this.state.orders.map(order=>{            
            if(!keysArray.includes(order.orderPathInFirebase)){
                keysArray.push(order.orderPathInFirebase);
                console.log('fdsdfsd'+order.orderPathInFirebase);

                return (
                    <DeliveryRequest 
                        key={order.orderPathInFirebase} 
                        value={JSON.stringify(order)} 
                        orderPathInFirebase={order.orderPathInFirebase} 
                        onPress={this.returnValueFromCard}
                    />
                            
                );
            }    
        }    
        )
    }

    //get the value(orderPathInFirebase) by clicking specific card
    returnValueFromCard=(orderPathOnFirebase, businessName)=>{
        //alert(value);
        this.props.navigation.navigate('Detail', {orderPathOnFirebase, businessName})
    }

    render() {

        network = 0;
        display={};
        if(network){
            
        }
        const styles = {

        }

        return(
                <AppConsumer>
                    
                {(value)=>(
                    <View style={{flex:1}}>
                        {this.renderNetworkError()}
                        <View style={{flex:16, padding:10, backgroundColor:'#F2F2F2'}}>
                            <ScrollView style={{backgroundColor:'#F2F2F2'}}>
                                {this.renderOrderList(value.orders)}
                            </ScrollView>
                        </View>
                    </View>
                    
                    
                )}
                </AppConsumer>
        );        
    }
}



//export default Main;
export default createStackNavigator({
    Home: {
        screen: Main,
    },
    Detail:{
        screen: OrderDetail
    }
});