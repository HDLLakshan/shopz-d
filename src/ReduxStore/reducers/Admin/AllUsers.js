const AllUsersReducer = (state =[],action) =>{
    if (action.type === 'FETCHALLUSER') {
        return action.payload;
    } else {
        return state
    }
}
export default AllUsersReducer;
