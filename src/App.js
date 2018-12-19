import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, AsyncStorage, Platform, NativeModules, NativeAppEventEmitter } from 'react-native';
import Mainscreen from '../screen/Main';
import firebase from 'firebase';
import Header from './components/Header';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import BottomNavigatorHome from './BottomNavigatorHome';
import Login from '../screen/Login';
import { Spinner } from './components/Common';
import DataController from '../model/DataController';
import { AppProvider } from '../model/AppContext';
import BackgroundTimer from 'react-native-background-timer';

// const EventEmitter = Platform.select({
//     ios: () => NativeAppEventEmitter,
//     android: () => DeviceEventEmitter,
// })();

const BackgroundTaskManager = NativeModules.BackgroundTaskManager;

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


     constructor(props){
         super(props);
         this.state={
             backgroundTaskStatus:'Not Started',
         }
     }

    componentWillMount(){

        NativeAppEventEmitter.addListener('backgroundProgress', (e)=>{
            this.setState({backgroundTaskStatus:e.backgroundTaskStatus});
        });

        NativeAppEventEmitter.emit('backgroundProgress', 'Test');

        BackgroundTaskManager.loadInBackground();

        

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

        var result = firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                
                firebase.database().ref('deliveryMan/'+user.uid).on('value',(snapshot)=>{
                    var deliveryMan = snapshot.val();
                    if(deliveryMan){
                        this.setState({
                            uid:deliveryMan.userId,
                            username:deliveryMan.userName,
                            userphonenumber: deliveryMan.phoneNumber
                        });
                    }
                });
                this.setState({
                    loggedIn: true,
                    uid: user.uid,
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

            //----------OR----------//
            const data = snapshot.val() || null;
            if (data) {
              const orderNum = Object.keys(data).length;
              //alert(id);
              this.setState({orderNum});
            
              
            }
        });

        
        // BackgroundTimer.start();

        // // listen for event
        // EventEmitter.addListener('backgroundTimer', () => {
        //     // this will be executed every 5 seconds
        //     // even when app is the the background
        //     console.log('toe');
        // });

        BackgroundTimer.runBackgroundTimer(() => { 
            console.log('BACKGROUND CALL');
            if(this.state.uid){
                
                this.updateUserPositionToServer(this.state.uid);
            }
            }, 
            30000);
    }

    componentDidMount(){
        
    }

    componentWillUnmount(){
        BackgroundTimer.stopBackgroundTimer();
    }

    //get user position and update to db(firebase)
    updateUserPositionToServer(userId){
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                console.log('POSITION UPDATED!');
                firebase.database().ref('deliveryMan/'+userId).update({position})
            }
            ,
            (error)=>{console.log(error);}
            ,
            {
                enableHighAccuracy:true,
            }
        );

    }

    renderContent(){
        switch(this.state.loggedIn){
            case true:
                return(
                    <View style={{flex:1}}>
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
            //<Header headerText={'配送员：'+this.state.username}/> 

                
                
         
                  
            

        );
    }
}

export default App;




