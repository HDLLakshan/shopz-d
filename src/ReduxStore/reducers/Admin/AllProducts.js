const AllProductsReducer = (state =[],action) =>{
    if (action.type === 'FETCHALLPRO') {
        return action.payload;
    } else {
        return state
    }
}
export default AllProductsReducer;
