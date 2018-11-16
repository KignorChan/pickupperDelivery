import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import WarnMessageBox from '../src/components/WarnMessageBox';
import DeliveryRequest from '../src/components/DeliveryRequest'; 
import { createBottomTabNavigator } from 'react-navigation';

class Main extends Component{
    constructor(props){
        super(props);

        this.state={
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false
        };
    }

    componentDidMount(){
        this.makeRemoteRequest();
    }

    makeRemoteRequest(){

    }

    render() {

        network = 0;
        display={};
        if(network){
            
        }
        const styles = {

        }

        return(
            <View style={{flex:1}}>

                <WarnMessageBox style={{}}>Warning!!!!</WarnMessageBox>

                <View style={{flex:16, padding:10, backgroundColor:'#F2F2F2'}}>
                    <ScrollView style={{backgroundColor:'#F2F2F2'}}>
                        <DeliveryRequest/>
                        <DeliveryRequest/>
                        <DeliveryRequest/>
                        <DeliveryRequest/>
                        <DeliveryRequest/>
                    </ScrollView>
                </View>

            </View>
            
        );        
    }
}



export default Main;