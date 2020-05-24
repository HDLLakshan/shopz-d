const AllPaymentReducer = (state =[],action) =>{
    if (action.type === 'FETCHALLPAY') {
        return action.payload;
    } else {
        return state
    }
}
export default AllPaymentReducer;
