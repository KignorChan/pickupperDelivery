import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, AsyncStorage } from 'react-native';
import WarnMessageBox from '../src/components/WarnMessageBox';
import DeliveryRequest from '../src/components/DeliveryRequest'; 
import { createBottomTabNavigator } from 'react-navigation';
import DataController from '../model/DataController';
import { AppConsumer } from '../model/AppContext';


class Main extends Component{


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

        alert(JSON.parse(value.orders).length);

        // return JSON.parse(value.orders).map(order=>{
        //     <Text>{order.orderSubObjectInJson}</Text>
        // });

        return (
            <View>
                <Text>{JSON.parse(value.orders).length}</Text>
                <DeliveryRequest/>
            </View>
        );
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
                            {this.renderOrderList(value)}
                        </ScrollView>
                    </View>

                </View>
            )}
            </AppConsumer>

            
        );        
    }
}


// const WithContext = (Component) => {
//   return (props) => (
//       <CustomContext.Consumer>
//            {value =>  <Component {...props} value={value} />}
//       </CustomContext.Consumer>
//   )
// }



export default Main;