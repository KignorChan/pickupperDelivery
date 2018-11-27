import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, AsyncStorage, ListView } from 'react-native';
import firebase from 'firebase';
import WarnMessageBox from '../src/components/WarnMessageBox';
import DeliveryRequest from '../src/components/DeliveryRequest'; 
import { createBottomTabNavigator } from 'react-navigation';
import DataController from '../model/DataController';
import { AppConsumer } from '../model/AppContext';

const ds = new ListView.DataSource({rowHasChanged: (r1,r2)=>r1!=r2});

class Main extends Component{
    orders = [];

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
            dataSource: ds.cloneWithRows([]),
        };
    }

    addOrderToArray(order){
        //this.orders.push(order);
        this.orders.push(order);
    }

    componentWillMount(){ 
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

        return this.state.orders.map(order=>{
            return (
                <DeliveryRequest 
                    key={order.orderPathInFirebase} 
                    value={JSON.stringify(order)} 
                    orderPathInFirebase={order.orderPathInFirebase} 
                />
                        
            );
        }    
        )
    }

    //render single order
    renderOrder(order){

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



export default Main;