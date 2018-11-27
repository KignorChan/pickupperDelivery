import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, AsyncStorage } from 'react-native';
import Mainscreen from '../screen/Main';
import firebase from 'firebase';
import Header from './components/Header';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import BottomNavigatorHome from './BottomNavigatorHome';
import Login from '../screen/Login';
import { Spinner } from './components/Common';
import DataController from '../model/DataController';
import { AppProvider } from '../model/AppContext';
import OrderDetail from '../screen/OrderDetail';

class App extends Component{
    state = { 
        loggedIn: null,
        orderNum:'10',
        id:'',
        uid:'',
        username:'',
        userphonenumber:''

     };

     orderNmu='';

    componentWillMount(){

        firebase.initializeApp(
            {
                apiKey: "AIzaSyBaBcr9jzqTL4DFidcsDkZ0CcPv1gFfMrE",
                authDomain: "pickupper-47f2b.firebaseapp.com",
                databaseURL: "https://pickupper-47f2b.firebaseio.com",
                projectId: "pickupper-47f2b",
                storageBucket: "pickupper-47f2b.appspot.com",
                messagingSenderId: "69350237423"
              }
        );

        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                
                firebase.database().ref('deliveryMan/'+user.uid).on('value',(snapshot)=>{
                    var deliveryMan = snapshot.val();
                    this.setState({
                        uid:deliveryMan.userId,
                        username:deliveryMan.userName,
                        userphonenumber: deliveryMan.phoneNumber
                    });
                });
                this.setState({
                    loggedIn: true,
                    uid: user.uid,
                    username:'',
                    userphonenumber:''
                });
            }else{
                this.setState({loggedIn: false});
            }
            
        });

        firebase.database().ref('orders/').once('value', snap=>{
            console.log(JSON.stringify(snap.val()))                     //json in string
            var object = JSON.parse(JSON.stringify(snap.val()));        //parse to json object
            console.log(Object.keys(object)[0]);
            var length = Object.keys(object).length;
            //alert(length);
            this.setState({orderNum: length});
            //this.orderNmu = length;
            DataController.orderNum = length;
        })        



        DataController.parseTimeStamp(1540266506125);

        firebase.database()
        .ref('/orders/')
        .on('value', snapshot => {
            const id = snapshot.key;
            var temp = JSON.stringify(snapshot.val());
            // console.log('Aaaaaaa: '+ temp);
            //this._storeData('newOrderData',temp);

            
            //alert(id);

            //----------OR----------//
            const data = snapshot.val() || null;
            if (data) {
              const orderNum = Object.keys(data).length;
              //alert(id);
              this.setState({orderNum});
            
              
            }
        });
        //alert(this.state.id);

        
    }
    
    // _storeData = async (key, value) => {
    //     try {
    //       await AsyncStorage.setItem(key, value);
    //     } catch (error) {
    //       // Error saving data
    //     }
    //   }

    renderContent(){
        switch(this.state.loggedIn){
            case true:
                return(
                    <View style={{flex:1}}>
                        <Header headerText={'配送员：'+this.state.username}/> 
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
            <AppProvider>
                <View style={{flex:1}}>
                    {this.renderContent()}
                </View>   
            </AppProvider>
            //<OrderDetail/>
                
                
         
                  
            

        );
    }
}

export default App;




