import React, {Component} from 'react';
import { Text, View, Image } from 'react-native';
import firebase from 'firebase';
import { PressSession } from '../src/components/Common';
import PersonalInfoCard from '../src/components/PersonalInfoCard';

class PersonalCenter extends Component{
    
    signOut(){
        console.log('Sign out');
        firebase.auth().signOut();
    }

    render(){
        
        const styles={
            viewStyle:{
                backgroundColor:'#F2F2F2',
                flex:1
            }
        };
        return (
            <View style={styles.viewStyle}>
                <View style={{marginTop:40}}>
                    <PersonalInfoCard/>
                </View>
                <View style={{marginTop:20}}>
                     <PressSession text='我的等级' icon={require('../img/reward.png')}/>
                </View>
                <View style={{marginTop:20}}>
                    <PressSession text='我收到的评价'icon={require('../img/smile.png')}/>
                    <PressSession text='我收到的投诉' icon={require('../img/unhappy.png')}/>
                    <PressSession text='我的罚单' icon={require('../img/moneyoff.png')}/>
                    <PressSession text='账单明细' icon={require('../img/balance.png')}/>    
                    <PressSession text='设置' icon={require('../img/setting.png')} />
                </View>
                <View style={{marginTop:20}}>
                    <PressSession text='Sign out' icon={require('../img/exit.png')} 
                    onPress={this.signOut.bind(this)}/>
                </View>
                
            </View>
        );
    }
}






export default PersonalCenter;