import React from 'react';
import { Text, View } from 'react-native';

const WarnMessageBox = (props)=>{
    return (
        <View style={ styles.viewStyle }>
            <Text style={ styles.textStyle }>{props.children}</Text>
        </View>
    );
};

const styles = {
    viewStyle:{
        backgroundColor: '#ff9900',
        padding: 5,
    },
    textStyle:{
        color: '#fff'
    }

}


export default WarnMessageBox;