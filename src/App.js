import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import Mainscreen from '../screen/Main';
import firebase from 'firebase';
import Header from './components/Header';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import BottomNavigatorHome from './BottomNavigatorHome';
import Login from '../screen/Login';
import { Spinner } from './components/Common';


const AppNavigator = createDrawerNavigator({
    Home: BottomNavigatorHome ,
    Profile: Mainscreen
});
  
  
class App extends Component{
    state = { loggedIn: null };

    componentWillMount(){
        firebase.initializeApp(
            {
                apiKey: 'AIzaSyDMCTInU-M97PlNjLhB41Ob2Est2b63oj4',
                authDomain: 'pickupperdeleverytemp.firebaseapp.com',
                databaseURL: 'https://pickupperdeleverytemp.firebaseio.com',
                projectId: 'pickupperdeleverytemp',
                storageBucket: 'pickupperdeleverytemp.appspot.com',
                messagingSenderId: '1046612703196'
              }
        );

        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.setState({loggedIn: true});
            }else{
                this.setState({loggedIn: false});
            }
            
        });
    }

    renderContent(){
        switch(this.state.loggedIn){
            case true:
                return(
                    <View style={{flex:1}}>
                        <Header headerText='配送单'/> 
                        <BottomNavigatorHome/>
                    </View>
                );
            case false:
                return (
                    <View style={{flex:1}}>
                        <Login/>
                    </View>
                );
            default: 
                return (
                    <View style={{flex:1}}>
                        <Spinner/>
                    </View>
                );
                    
                    
                    
        }
    }

    render(){
        return(
            <View style={{flex:1}}>
                {this.renderContent()}
            </View>
        );


    }
}

const CustomDrawerComponent = (props)=>{
    return (
        <SafeAreaView style={{ flex:1 }}>
            <ScrollView>
                <DrawerItems {...props} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default App;