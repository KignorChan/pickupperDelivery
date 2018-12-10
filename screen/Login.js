import React, { Component } from 'react';
import { Text, TextInput, View, Image, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';

import { Input,Button, OnPressText, Avatar } from '../src/components/Common';


class Login extends Component{
    state = {
        username:'',
        phonenumber:'',
        email:'',
        password:'',
        passwordConfirm:'',
        loadRegisterPage: null,
        loadErrorMessage: null,
        loadEmailValidationErrorMessage: null,
        loadPasswordNotMatchErrorMessage: null,
        loadEmptyInputErrorMessage: null,
        avatarSource:require('../img/qq.jpg'),
    };

    loginButtonPressed(){
        const { email, password }=this.state;
        if( email=='' || password == '' ){
            Alert.alert('注意','输入项不能为空！');
        }else{
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
                <OnPressText text='密码不一致，请重新输入！' />
            );
        }
    }

    renderEmptyInputErrorMessage(){
        if(this.state.loadEmptyInputErrorMessage){
            return (
                <OnPressText text='输入项不能为空！' />
            );
        }
    }

    loadRegisterPage(){
        this.setState({
            email:'',
            password:'',
            passwordConfirm:'',
            username:'',
            phonenumber:'',
            loadRegisterPage: true,
            loadErrorMessage: null,
            loadEmailValidationErrorMessage: null,
            loadPasswordNotMatchErrorMessage: null,
        });
    }

    findPassword(){
        console.log('Find password!');
        firebase.auth().sendPasswordResetEmail(this.state.email).then(()=>{
            Alert.alert('发送成功','重设密码邮件已发到你的邮箱，请前往你的邮件进行操作！');
        }).catch((error)=>{
            console.log(error);
        });
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
            username:'',
            phonenumber:'',
            email:'',
            password:'',
            passwordConfirm:'',
            loadErrorMessage: null,
            loadRegisterPage: null,
            loadEmailValidationErrorMessage: null,
            loadPasswordNotMatchErrorMessage: null,
        });

    }

    createUserButton(){
        const { username, phonenumber, email, password, passwordConfirm }=this.state;

        if(username=='' || phonenumber=='' || email=='' || password=='' || passwordConfirm==''){
            Alert.alert('注意', '输入项不能为空！');
        }else{

            if(this.validateEmail(email)){
                if(this.matchPassword()){
                    
                    firebase.auth().createUserWithEmailAndPassword(email, password).then(
                        (data)=>{
                            console.log(data.user.uid);
                            //regist username and phonenumber
                            //alert(data.user.uid);
                            firebase.database().ref('deliveryMan/'+data.user.uid).update({
                                userId: data.user.uid,
                                userName: username,
                                phoneNumber: phonenumber,
                                userType: 'deliveryMan'
                            });
                        }
                    ).catch(
                        (error)=>{
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            if (errorCode == 'auth/weak-password') {
                                alert('The password is too weak.');
                            } else {
                                alert(errorMessage);
                            }
                            console.log(error);
                        }
                    );
                }else{
                    this.setState({loadPasswordNotMatchErrorMessage: true});
                }
            }else{
                this.setState({loadEmailValidationErrorMessage:true});
            }
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


    //Not test yet
    uploadImage(){
        //alert('upload image');
        const options = {
            title: 'Select Avatar',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                avatarSource: source,
              });

            //   this.uploadImage(response.uri).then(()=>{
            //       alert('Sucess upload!');
            //   }).catch((error)=>{
            //       alert(error);
            //   });
              

              console.log('avatarSource'+source.uri);
            }
          });
    }

    //// need blob tech
    // uploadImage = async(uri) => {
    //     const response = await fetch(uri);
    //     const blob = await response.blob();
    //     var ref = firebase.storage().ref('useravatar').child("my-image");
    //     return ref.put(blob);
    // }

    renderLogin(){
        const { containerStyle } = styles;

        console.log(this.state.email);
        console.log(this.state.password);

        return(
            <KeyboardAvoidingView style={containerStyle} behavior="padding" enabled>
            <Image source={require('../img/logo.png')}/>

            <Input 
                autoFocus= {true}
                placeHolder='请输入用户名' 
                keyboardType='email-address'
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
        </KeyboardAvoidingView>

        );
    }

    renderRegisterPage(){
        const { containerStyle } = styles;

        return (
            
            <KeyboardAvoidingView style={containerStyle} behavior="padding" enabled>
            <Avatar 
                source={this.state.avatarSource} 
                style={{height:120, width:120}} 
                username={this.state.username} 
                imageUpdatable={true}
                onPress={this.uploadImage.bind(this)}/>
                
            <Input 
                autoFocus= {true}
                placeHolder='请输入邮箱' 
                keyboardType='email-address'
                value={this.state.email}
                onChangeText={(email) => this.setState({email, loadEmailValidationErrorMessage:false})}
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

            <View style={{height:50 }}>

            </View>
            <Input 
                placeHolder='请输入用户名' 
                value={this.state.username}
                onChangeText={(username) => this.setState({username})}
            />
            <Input 
                placeHolder='请输入手机号码' 
                keyboardType='numeric'
                value={this.state.phonenumber}
                onChangeText={(phonenumber) => this.setState({phonenumber})}
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
            </View >
            <View>
                {this.renderPasswordNotMatchErrorMessage()}
                {this.renderEmailValidationErrorMessage()}
            </View>
            
            <View style={{ marginTop:20 }}>
                <Button text='注册' onPress={this.createUserButton.bind(this)}/>
            </View>
            </KeyboardAvoidingView>
        );
    }

    renderResetPassword

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