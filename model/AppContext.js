import React from 'react';
import firebase from 'firebase';

const initalState = {
    orderNumber:'100',
};

export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;


export class AppProvider extends React.Component{
    orders = [];
    //orders = [];
    state = {
        uid:'',
        username:'',
        userphonenumber:'',
        email:''
    }

    constructor(props){
        super(props);
        this.orders = [];
    }

    addOrderToArray(order){
            //this.orders.push(order);
            this.orders.push(order);
    }

    componentWillMount(){ 
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.setState({email: user.email}) 
                firebase.database().ref('deliveryMan/'+user.uid).on('value',(snapshot)=>{
                    var deliveryMan = snapshot.val();
                    if(deliveryMan){
                        this.setState({
                            uid:deliveryMan.userId,
                            username:deliveryMan.userName,
                            userphonenumber: deliveryMan.phoneNumber
                        });
                    }
                    
                });
            }else{
                
            } 
        });



        getData = (snapshot)=>{

            const dataObject = snapshot.val() || null;
            
            if (dataObject) {              
              const keys = Object.keys(dataObject);
              
                for(var i=0; i<keys.length; i++){
                    //console.log('Keys['+i+']: '+keys[i]);
                    var key = keys[i];
                    
                    var orderSubObject = dataObject[key];
                    
                    var orderSubObjectKeys = Object.keys(orderSubObject);

                    for(var k=0; k<orderSubObjectKeys.length ; k++){
                        var subKey = orderSubObjectKeys[k];
                        console.log('subOrderKey['+i+']['+k+']'+subKey);    //get all suborder keys for now
                        console.log('subOrderKey['+i+']['+k+'] status: ' +orderSubObject[subKey].status);
                        var orderStatus = orderSubObject[subKey].status;

                        //order status: 
                        if(orderStatus != null && orderStatus != ''){
                            if(orderStatus == 'progressing'){
                                var orderSubObjectInJson = JSON.stringify(orderSubObject[subKey]);
                                console.log('orderSubObjectInJson'+orderSubObjectInJson);
                               
                                var order={
                                        orderPathInFirebase: snapshot.key +'/'+ key +'/'+ subKey,
                                        orderDetail: JSON.parse(orderSubObjectInJson),
                                    }
                            
                                this.addOrderToArray(order);

                                //alert(this.state.orders.length);
                                //console.log('Testtttt: '+this.orders[0].orderDetail.deliveryFee);
                                
                            }
                        }
                    }
                }         
            }
        }

        getError = err =>{
            console.log(err);
        }

        firebase.database()
        .ref('/orders/')
        .on('value', getData, getError);

    }

    updateContext(){

    }

    render(){
        return(
            <AppContext.Provider value={{
                orders: JSON.stringify(this.orders),
                userName: this.state.username,
                email: this.state.email,
                userId: this.state.uid,
                userphonenumber: this.state.userphonenumber
            }}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}





// const Context = React.createContext({
//     numberOfOrders:'',
// });

// export default Context;