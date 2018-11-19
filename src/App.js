import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import Mainscreen from '../screen/Main';
import firebase from 'firebase';
import Header from './components/Header';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import BottomNavigatorHome from './BottomNavigatorHome';
import Login from '../screen/Login';


const AppNavigator = createDrawerNavigator({
    Home: BottomNavigatorHome ,
    Profile: Mainscreen
});
  
  
class App extends Component{
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
    }

    render(){
        //return(
        //     <View style={{flex:1}}>
        //         <Header headerText='配送单'/> 
        //         <BottomNavigatorHome/>
        //     </View>

        // );
        return (
            <Login/>
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


  

// class App extends Component{


//     render() {

//         network = 0;
//         display={};
//         if(network){
//             display
//         }
//         const styles = {
//             headerStyle:{
//                 paddingTop: 30,
//                 flex:1,
//             }
//         }

//         return(
//             <View style={{flex: 1}}>
//                 <View style={ styles.headerStyle }>
//                     <Header headerText='配送单'/>   
//                 </View>
//                 <View style={{flex: 15}}><Mainscreen/></View>  
//             </View>

            
//         );        
//     }
// }



export default App;