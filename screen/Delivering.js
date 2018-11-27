import React, {Component} from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import DeliveringCard from '../src/components/DeliveringCard';
import firebase from 'firebase';
import { AppConsumer } from '../model/AppContext';
import DeliveryRequest from '../src/components/DeliveryRequest'; 

//import DeliveryRequest from '../src/components/DeliveryRequest'; 


class Delivering extends Component{
    state={
        userId:'',
        orders:[]
    }

    orders = [];

    constructor(){
        super();
        orders = [];

    }

    addOrderToArray(order){
        //this.orders.push(order);
        this.orders.push(order);
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                var userId = user.uid;
                this.setState({
                    userId: userId
                }) 

                //get the delivering orders for this user
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
                                var courierId = orderSubObject[subKey].courierId? orderSubObject[subKey].courierId : '';

                                //alert(courierId);

                                //order status: 
                                if(orderStatus != null && orderStatus != ''){
                                    if(orderStatus == 'delivering' && courierId == this.state.userId){
                                        var orderSubObjectInJson = JSON.stringify(orderSubObject[subKey]);
                                        console.log('orderSubObjectInJson'+orderSubObjectInJson);
                                    
                                        var order={
                                                orderPathInFirebase: snapshot.key +'/'+ key +'/'+ subKey,
                                                orderDetail: JSON.parse(orderSubObjectInJson),
                                            }
                                    
                                        this.addOrderToArray(order);
        
                                        //alert(this.state.orders.length);
                                        //this.setState({dataSource: ds.cloneWithRows(JSON.stringify(this.orders))})
                                        console.log('lllll'+JSON.stringify(this.orders));
                                        console.log('ggggg '+ this.orders[0].orderDetail.status);
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




                //////////////

            }
        });

        

    }

    renderDeliveryCards(orders){
        var keysArray = [];

        return this.state.orders.map(order=>{
            if(!keysArray.includes(order.orderPathInFirebase)){
                keysArray.push(order.orderPathInFirebase);
                console.log('fdsdfsd'+order.orderPathInFirebase);
               // alert(order.orderPathInFirebase)

                return (            
                    <DeliveringCard key={order.orderPathInFirebase} value={JSON.stringify(order)} orderPathInFirebase={order.orderPathInFirebase}/>
                );
            }
        });
    }
    
    
    render(props){
        return (
            <View style={{flex:1, backgroundColor:'#F2F2F2'}}>
                <ScrollView>
                    {this.renderDeliveryCards(this.orders)}
                </ScrollView>
            </View>
        );
    }
}


export default Delivering;