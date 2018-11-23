import React from 'react';
import firebase from 'firebase';

const initalState = {
    orderNumber:'100',
};

export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;


export class AppProvider extends React.Component{
    componentWillMount(){
        firebase.database()
        .ref('/orders/')
        .on('value', snapshot => {
            const id = snapshot.key;
            var temp = JSON.stringify(snapshot.val());
            // console.log('Aaaaaaa: '+ temp);
            //this._storeData('newOrderData',temp);

            
            //alert(id);

            //----------OR----------//
            const data = snapshot.val() || null;
            if (data) {
              const orderNum = Object.keys(data).length;
              this.setState({orderNumber: orderNum})
              
              const keyname = Object.keys(data)[0];
              alert(keyname);
              console.log('The value is:  '+data);
            
              
            }
        });

        firebase.database()
        .ref('/orders/').children

    }
    constructor(props){
        super(props);
        this.state = initalState;

    }

    setOrderNumber(orderNumber){
        this.setState({orderNumber})
    }

    render(){
        return(
            <AppContext.Provider value={{
                orderNumber: this.state.orderNumber,
                setOrderNumber: this.setOrderNumber,
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