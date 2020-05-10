const AllProductManagerReducer = (state =[],action) =>{
    switch(action.type){
        case 'FETCHALL':
          return action.payload;
        case 'ADDNEW' :
            return [...state,action.payload]
        case 'UPDATE' :
            return state.map((user,key)=>{
                if(user.username=== action.payload.username){
                    return action.payload;
                }
                return user;
            });
        case 'DELETE' :
            return state.filter(pm => pm.username !== action.payload)
        default:
            return state
    }
}
export default AllProductManagerReducer;