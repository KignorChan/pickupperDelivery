import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, AsyncStorage } from 'react-native';
import firebase from 'firebase';
import WarnMessageBox from '../src/components/WarnMessageBox';
import DeliveryRequest from '../src/components/DeliveryRequest'; 
import { createBottomTabNavigator } from 'react-navigation';
import DataController from '../model/DataController';
import { AppConsumer } from '../model/AppContext';


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

            orders: []
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
                            console.log('Testtttt: '+this.orders[0].orderDetail.deliveryFee);
                            
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
        firebase.database()
        .ref('/orders/').on('child_added',function(data,prevChildKey){
            this.orders = data.val();
        });

    }

    makeRemoteRequest(){

    }

    renderNetworkError(){
        if(this.state.displayNetworkError){
            return (<WarnMessageBox>Warning!!!!</WarnMessageBox>);
            
        }
    }

    //Render Entire order list
    renderOrderList(orders){
        console.log('rrrrrrr'+orders[0]);
        

        //let orders = JSON.parse(value);

        // for(var i=0;i < orders.length;i++ ){
        //     console.log('Orderzzzzz'+orders[i].orderPathInFirebase);
        
        // }

        // return (()=>{
        //     for(var i=0;i < orders.length;i++ ){
        //         console.log('Orderzzzzz'+orders[i].orderPathInFirebase);
                
        //         <View>

        //             <DeliveryRequest value={JSON.stringify(orders[i])}/>
        //         </View>
        //     }
        // }
        // );

        return orders.map(order=>
            <DeliveryRequest key={order.orderPathInFirebase} value={JSON.stringify(order)} orderPathInFirebase={order.orderPathInFirebase} />
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
                            {this.renderOrderList(this.orders)}
                        </ScrollView>
                    </View>

                </View>
            )}
            </AppConsumer>

            
        );        
    }
}



export default Main;