import React from 'react';
import { Text, View, Image } from 'react-native';
import { AppConsumer } from '../../model/AppContext';


const PersonalInfoCard = ()=>{
    const {
        cardViewStyle,textStyle
    }=styles;
    
    return(
        <AppConsumer>
        {(value)=>(
            <View style={cardViewStyle}> 
                <View style={{justifyContent:'center', alignItems:'center', height:120, width:120}}>
                    <Image source={require('../../img/qq.jpg')} style={{width:90, height: 90}} />
                </View>
                <View style={{flex:2, paddingLeft: 10,paddingBottom:10, justifyContent:'flex-end'}}>
                    <Text style={textStyle}>{value.userName}</Text>
                    <Text style={textStyle}>{value.email}</Text>
                </View>
            </View>
        )}
        </AppConsumer>

    );
}

const styles={
    cardViewStyle:{
        backgroundColor: '#fff',
        height:120,
        flexDirection:'row',
        
    },
    textStyle:{
        fontSize:18,
        margin:2,
        fontWeight: 'bold',
    }
}

export default PersonalInfoCard;