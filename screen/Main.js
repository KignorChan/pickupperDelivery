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

    renderOrderList(value){
        return (
            <View>
                <Text>{value.orderNumber}</Text>
                <DeliveryRequest/>
            </View>
        );
    }
    // renderOrderList(value){
    //     for(var i =0; i<value.orderNumber; i++){
    //         this.renderOrder(value);
    //     }

    // }
    // renderOrderList = value=>{
    //     var temp = '';
    //     for(var i =0; i<value.orderNumber; i++){
    //         temp += this.renderOrder(value);
    //     }
    //     return temp;
    // }

    // _retrieveData = async () => {
    //     try {
    //       const value = await AsyncStorage.getItem('newOrderData');
    //       if (value !== null) {
    //         // We have data!!
    //         console.log('Aaaaaaa: '+ value);

    //       }
    //      } catch (error) {
    //        // Error retrieving data
    //      }
    //   }



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
                    <Text>{value.trye}</Text>
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



export default Main;