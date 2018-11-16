import React, {Component} from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import DeliveringCard from '../src/components/DeliveringCard';


class Delivering extends Component{
    
    
    render(props){
        return (
            <View style={{flex:1, backgroundColor:'#F2F2F2'}}>
                <ScrollView>
                    <DeliveringCard />
                    <DeliveringCard />
                    <DeliveringCard />
                    <DeliveringCard />
                    <DeliveringCard />
                </ScrollView>
            </View>
        );
    }
}


export default Delivering;