const CartCount = (state =0,action) =>{
    if (action.type === 'count') {
        return action.payload;
    } else {
        return state
    }
}
export default CartCount;
