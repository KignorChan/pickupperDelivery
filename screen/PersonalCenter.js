import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { createStackNavigator } from 'react-navigation';
import { PressSession } from '../src/components/Common';
import PersonalInfoCard from '../src/components/PersonalInfoCard';
import PersonInfoEdit from './PersonInfoEdit';

class PersonalCenter extends Component{
    state={
        renderEditUserInfoView: null,
    }

    static navigationOptions = ({navigation}) => ({
        title: "个人中心",
        headerStyle: {
            backgroundColor: '#0080ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        fontSize:20,
        },
    })

    signOut(){
        console.log('Sign out');
        firebase.auth().signOut();
    }

    renderEditUserInfoView(){
        this.setState({renderEditUserInfoView:true});
    }

    renderMainMenu(){
        const styles={
            viewStyle:{
                backgroundColor:'#F2F2F2',
                flex:1
            }
        };

        return (
            <View style={styles.viewStyle}>
                <TouchableOpacity style={{marginTop:40}} onPress={this.renderEditUserInfoView.bind(this)}>
                    <PersonalInfoCard/>
                </TouchableOpacity>
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

    renderChangePersonalInfoView(){
        return(<PersonInfoEdit closeComponent={this.closePersonInfoEdit.bind(this)}/>);
    }

    closePersonInfoEdit = ()=>{
        this.setState({renderEditUserInfoView:null});
    }

    render(){
        const {buttonStyle, textStyle}=styles;

        if(this.state.renderEditUserInfoView==true){
            return(
                <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
                    {this.renderChangePersonalInfoView()}
                    <View style={{justifyContent:'center', alignContent:'center', flexDirection:'row', marginTop:30}}>
                        <TouchableOpacity style={buttonStyle} onPress={this.closePersonInfoEdit.bind(this)}><Text style={textStyle}>返回</Text></TouchableOpacity>
                    </View>
                </View>
            );
        }


        return (this.renderMainMenu());
    }
}

const styles={
    textStyle:{
        color: '#888888',
        fontWeight: 'bold',
        fontSize: 22,
    },
    buttonStyle:{
        backgroundColor: '#fff', 
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 2,
        borderRadius:5,
        width:200,
        borderColor: '#008888',

    }
}

//export default PersonalCenter;
export default createStackNavigator({
    PersonalCenter: {
        screen: PersonalCenter,
    }
});