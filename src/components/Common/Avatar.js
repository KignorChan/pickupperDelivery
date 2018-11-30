import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';

class Avatar extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        const {
            touchableViewStyle,
            imageStyle
        }=styles;

        var imageStyleChange = imageStyle
        if(this.props.style){
            imageStyleChange = this.props.style;
        }



        if(this.props.imageUpdatable){
            return(
                <TouchableOpacity style={touchableViewStyle} onPress={this.props.onPress} >
                    <Image source={this.props.source} style={imageStyleChange}/>
                </TouchableOpacity>
            );
        }

        return(
            <View style={touchableViewStyle} >
                <Image source={this.props.source} style={imageStyleChange}/>
            </View>
        );
    }
}

const styles={
    touchableViewStyle:{
        
    },
    imageStyle:{
        width:90, 
        height: 90
    }
}

export {Avatar};