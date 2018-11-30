import React from 'react';
import { Text, View} from 'react-native';
import firebase from 'firebase';
import { Input,Button } from '../src/components/Common';
import { AppConsumer } from '../model/AppContext';



class PersonInfoEdit extends React.Component{
    state={
        username:null,
        phonenumber:null,
        avartapath:'',
        uid:'',
    }
    constructor(props){
        super(props);
    }

    updateInfo(value){
        this.props.closeComponent;
        var updatePhone = this.state.phonenumber? this.state.phonenumber: value.userphonenumber ;
        var updateName = this.state.username?this.state.username:value.userName;

        firebase.database().ref('deliveryMan/'+ value.userId).update({
            phoneNumber: updatePhone,
            userName: updateName,
        }).then((msg)=>{
            alert('成功修改信息！');
        })
    }
    
    
    render(){
        const {containerStyle} = styles;

        return (
            <AppConsumer>
            {(value)=>{
                return(
                    <View style={containerStyle}>
                        <Input 
                            autoFocus= {true}
                            placeHolder={value.userName}
                            value={this.state.username?this.state.username:value.userName}
                            onChangeText={(username) => this.setState({username})}
                        />
                        <Input 
                            placeHolder={value.userphonenumber}
                            value={this.state.phonenumber? this.state.phonenumber: value.userphonenumber}
                            onChangeText={(phonenumber) => this.setState({phonenumber})}
                        />
                        <View style={{ 
                            marginTop:30, 
                        }}>
                            <Button text='修改信息' onPress={this.updateInfo.bind(this,value)
                            }/>
                        </View>
                    </View>
            )}}
            </AppConsumer>



            

        );
    }
}

const styles = {
    containerStyle:{
        justifyContent: 'center',
        alignItems:'center',
    }
}

export default PersonInfoEdit;