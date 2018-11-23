//import firebase from 'firebase';


export default class DataController{
    static order={
        userId:'',
        subOrder:{
            deliveryFee: '',
            orders:{

            },
            status:'',
            storeUid:'',
            sum: '',
            timestamp: '',
            tip:'',
            userId:'',
        }
    }

    static orderNum = '';

    static parseTimeStamp(timestamp){
        //convert timestamp to readable time
        var timestamp = 1540266506125;
        date = new Date(timestamp);
        datevalues = [
            date.getFullYear(),
            date.getMonth()+1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
        ];
    }

    static asyncOrders(){

    }

}