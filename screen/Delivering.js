import React, {Component} from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import DeliveringCard from '../src/components/DeliveringCard';
import firebase from 'firebase';
import { AppConsumer } from '../model/AppContext';
import DeliveryRequest from '../src/components/DeliveryRequest'; 
import OrderDetail from './OrderDetail';
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';


//import DeliveryRequest from '../src/components/DeliveryRequest'; 


class Delivering extends Component{
    state={
        userId:'',
        orders:[]
    }

    static navigationOptions = ({navigation}) => ({
        title: "配送列表",
        headerStyle: {
            backgroundColor: '#0080ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        fontSize:20,
        },
    })

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
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                var userId = user.uid;
                this.setState({
                    userId: userId
                }) 

                firebase.database().ref('/orders/').on('value', snapshot=>{
                    var allObjs = snapshot.val();
                    var ordersTemp = [];
                    Object.keys(allObjs).map(firstLvlKey=>{
                        Object.keys(allObjs[firstLvlKey]).map(secondLvlKey=>{
                            var orderPathInFirebase = 'orders/'+firstLvlKey+'/'+secondLvlKey;
                            var order = {
                                orderPathInFirebase: orderPathInFirebase,
                                orderDetail:allObjs[firstLvlKey][secondLvlKey]
                            }
                            console.log("OBJECTTTTT: "+ JSON.stringify(order));
                            if(order.orderDetail.courierId==userId){
                                ordersTemp.push(order);
                            }
                        })
                    });
                    this.setState({orders:ordersTemp})
                })
            }
        });
    }


    renderDeliveryCardsTaking(){

        console.log('TYUIUTRER:'+JSON.stringify(this.state.orders));

        return this.state.orders.map(order=>{
            console.log("FGHFGHFGH"+JSON.stringify(order))
            if(order.orderDetail.status=='taking'){
                console.log("TAKKING!!!");
                return (            
                    <DeliveringCard key={order.orderPathInFirebase} value={JSON.stringify(order)} orderPathInFirebase={order.orderPathInFirebase} onPress={this.returnValueFromCard}/>
                );
            }
        });
    }

    renderDeliveryCardsDelivering(){
        console.log('TYUIUTRER:'+JSON.stringify(this.state.orders));

        return this.state.orders.map(order=>{
            console.log("FGHFGHFGH"+JSON.stringify(order))
            if(order.orderDetail.status=='delivering'){
                console.log("TAKKING!!!");
                return (            
                    <DeliveringCard key={order.orderPathInFirebase} value={JSON.stringify(order)} orderPathInFirebase={order.orderPathInFirebase} onPress={this.returnValueFromCard}/>
                );
            }
        });
    }

    renderDeliveryCardsCompleted(){
        console.log('TYUIUTRER:'+JSON.stringify(this.state.orders));

        return this.state.orders.map(order=>{
            console.log("FGHFGHFGH"+JSON.stringify(order))
            if(order.orderDetail.status=='completed'){
                console.log("TAKKING!!!");
                return (            
                    <DeliveringCard key={order.orderPathInFirebase} value={JSON.stringify(order)} orderPathInFirebase={order.orderPathInFirebase} onPress={this.returnValueFromCard}/>
                );
            }
        });
    }

    //get the value(orderPathInFirebase) by clicking specific card
    returnValueFromCard = (orderPathOnFirebase, businessName)=>{
        //alert(value);
        this.props.navigation.navigate('Detail', {orderPathOnFirebase, businessName});
    }
    
    
    render(){
        return (
            <View style={{flex:1, backgroundColor:'#F2F2F2'}}>
                
                <ScrollableTabView
                    style={{backgroundColor:'#f2f2f2',marginTop:10, }}
                    initialPage={0}
                    renderTabBar={() => <DefaultTabBar />}
                    onChangeTab={(obj) => {
                        //console.log('index:' + obj.i);
                        //this._goToProfile(obj)
                        }
                }>
                    <View tabLabel='取单' style={{flex:1}}>
                    {this.orders?
                        <ScrollView>
                            {this.renderDeliveryCardsTaking()}
                        </ScrollView>:null
                    }
                    </View>
                    <View tabLabel='送单'>
                    {this.orders?
                        <ScrollView>
                            {this.renderDeliveryCardsDelivering()}
                        </ScrollView>:null
                    }
                    </View>
                    <View tabLabel='完成'>
                    {this.orders?
                        <ScrollView>
                            {this.renderDeliveryCardsCompleted()}
                        </ScrollView>:null
                    }
                    </View>
                
                </ScrollableTabView>
                
            </View>
        );
    }
}


//export default Delivering;

export default createStackNavigator({
    Delivering: {
        screen: Delivering,
    },
    Detail:{
        screen: OrderDetail
    }

});