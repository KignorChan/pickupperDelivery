import React from 'react';
import { Text, View, Image } from 'react-native';


const PressSession = (props)=>{
    imageSource = props.icon;
    text=props.text;
    // return (
    //     <View>
    //         <View>
    //             <Image source={require(imageSource)}/>
    //         </View>
    //         <View>
    //             <Text>
    //                 {text}
    //             </Text>
    //         </View>
            

    //     </View>
    // );
    return (
        <View>
            <Text>{text}</Text>
        </View>
    );
}

export {PressSession};