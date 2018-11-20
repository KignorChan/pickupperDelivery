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
        loadEmailValidationErrorMessage: null,
        loadPasswordNotMatchErrorMessage: null,
    };

    loginButtonPressed(){
        const { email, password }=this.state;
        if(this.validateEmail(email)){
            firebase.auth().signInWithEmailAndPassword(email, password).then(
                ()=>{console.log('Sucessly login')}
            ).catch(
                ()=>{
    
                    console.log('failed login:'+ email +'  '+ password);
                    this.setState({loadErrorMessage:true});
            });
        }else{
            this.setState({loadEmailValidationErrorMessage:true});
        } 
    }

    renderEmailValidationErrorMessage(){
        if(this.state.loadEmailValidationErrorMessage){
            return (
                <OnPressText text='邮箱根式错误，请重新输入！' onPress={this.findPassword.bind(this)}/>
            );
        }
    }

    renderPasswordNotMatchErrorMessage(){
        if(this.state.loadPasswordNotMatchErrorMessage){
            return (
                <OnPressText text='密码不一致，请重新输入！' onPress={this.findPassword.bind(this)}/>
            );
        }
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
            loadErrorMessage: null
        });
        this.setState({loadRegisterPage: null});
    }

    createUserButton(){
        if(this.matchPassword()){
            const { email, password }=this.state;
            firebase.auth().createUserWithEmailAndPassword(email, password).then(
                ()=>{
                    console.log('Sucessfully regist!');
                }
            ).catch(
                ()=>{
                    console.log('Fail to  regist!');
                }
            );
        }else{
            this.setState({loadPasswordNotMatchErrorMessage: true});
        }



        

    }

    validateEmail(text){
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false)
        {
            console.log("Email is Not Correct");
            //this.setState({email:text})
            return false;
        }
        else {
            //this.setState({email:text})
            console.log("Email is Correct");
            return true;
        }
    }

    matchPassword(){
        const {password, passwordConfirm}=this.state;
        if(password==passwordConfirm){
            console.log('password match!!');
            return true;
        }else{
            console.log('password not match!!');
            return false;
        }
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
                onChangeText={(email) => this.setState({email:email,loadEmailValidationErrorMessage:null, loadErrorMessage:null})}
            />

            <Input 
                placeHolder='请输入密码' 
                value={this.state.password} 
                onChangeText={password => this.setState({password: password,loadErrorMessage:null})}
                secureTextEntry={true}
            />
            <View>
                {this.renderErrorMessage()}
                {this.renderEmailValidationErrorMessage()}
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
                onChangeText={password => this.setState({password:password, loadPasswordNotMatchErrorMessage:null})}
                secureTextEntry={true}
            />
            <Input 
                placeHolder='再次输入密码' 
                value={this.state.passwordConfirm} 
                onChangeText={passwordConfirm => this.setState({passwordConfirm:passwordConfirm, loadPasswordNotMatchErrorMessage:null})}
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
            <View>
                {this.renderPasswordNotMatchErrorMessage()}
            </View>
            
            <View style={{ marginTop:20 }}>
                <Button text='注册' onPress={this.createUserButton.bind(this)}/>
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