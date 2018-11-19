import React, { Component } from 'react';
import { Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

import { Input,Button, OnPressText } from '../src/components/Common';


class Login extends Component{
    state = {
        email:'',
        password:'',
        passwordConfirm:'',
        loadRegisterPage: null,
        loadErrorMessage: null,
    };

    loginButtonPressed(){
        const { email, password }=this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).then(
            ()=>{console.log('Sucessly login')}
        ).catch(
            ()=>{

                console.log('failed login:'+ email +'  '+ password);
                this.setState({loadErrorMessage:true});
        });
    }

    loadRegisterPage(){
        this.setState({
            email:'',
            password:'',
            passwordConfirm:'',
        });
        this.setState({loadRegisterPage: true});
    }

    findPassword(){
        console.log('Find password!');
    }

    renderErrorMessage(){
        if(this.state.loadErrorMessage){
            return (
                <OnPressText text='用户名或密码错误，点击这里找回密码' onPress={this.findPassword.bind(this)}/>
            );
        }
    }

    backToLogin(){
        this.setState({
            email:'',
            password:'',
            passwordConfirm:'',
        });
        this.setState({loadRegisterPage: null});
    }

    renderLogin(){
        const { containerStyle } = styles;

        console.log(this.state.email);
        console.log(this.state.password);

        return(
            <View style={containerStyle}>
            <Image source={require('../img/logo.png')} />

            <Input 
                autoFocus= {true}
                placeHolder='请输入用户名' 
                value={this.state.email}
                onChangeText={(email) => this.setState({email})}
            />

            <Input 
                placeHolder='请输入密码' 
                value={this.state.password} 
                onChangeText={password => this.setState({password})}
                secureTextEntry={true}
            />
            <View>
                {this.renderErrorMessage()}
            </View>
            <View style={{ marginTop: 20 }}>
                <Button text='登陆' onPress={this.loginButtonPressed.bind(this)}/>
            </View>
            <View style={{ marginTop: 20 }}>
                <Button text='新用户注册' onPress={this.loadRegisterPage.bind(this)}/>
            </View>
        </View>
        );
    }

    renderRegisterPage(){
        const { containerStyle } = styles;

        return (
            <View style={containerStyle}>
            <Input 
                autoFocus= {true}
                placeHolder='请输入用户名' 
                value={this.state.email}
                onChangeText={(email) => this.setState({email})}
            />
            <Input 
                placeHolder='请输入密码' 
                value={this.state.password} 
                onChangeText={password => this.setState({password})}
                secureTextEntry={true}
            />
            <Input 
                placeHolder='再次输入密码' 
                value={this.state.passwordConfirm} 
                onChangeText={passwordConfirm => this.setState({passwordConfirm})}
                secureTextEntry={true}
            />
            <View style={{ alignItems:'flex-end', justifyContent:'flex-end', flexDirection:'row'}}>
                <TouchableOpacity style={{
                    backgroundColor: '#fff', 
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    paddingTop: 5,
                    paddingBottom: 5,
                    flex:1,
                    paddingRight:20
                }} onPress={this.backToLogin.bind(this)}>
                    <Text style={{
                        color: '#000',
                        fontWeight: 'bold',
                        fontSize: 14,
                    }}>返回登陆界面</Text>
                </TouchableOpacity>
            </View>
            
            <View style={{ marginTop:20 }}>
                <Button text='注册' onPress={this.loginButtonPressed.bind(this)}/>
            </View>
            </View>
        );
    }

    render(){
        if(this.state.loadRegisterPage){
            return(this.renderRegisterPage());
            
        }

        return(this.renderLogin());  
    }





    


}

const styles = {
    containerStyle:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
    },
    textStyle:{

    },


}

export default Login;