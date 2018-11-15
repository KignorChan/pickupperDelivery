import React from 'react';
import { Text, View } from 'react-native';

const Header = (props)=>{
    return (
        <View style={ styles.headerView }>
            <Text style={ styles.headerText }>{props.headerText}</Text>
        </View>
    );
};

const styles = {
    headerText:{
        fontSize: 22,
        fontWeight: 'bold'
    },
    headerView:{
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        shadowColor: '#000',
        shadowOffset: { width:0, height:2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1
    }

};


export default Header;