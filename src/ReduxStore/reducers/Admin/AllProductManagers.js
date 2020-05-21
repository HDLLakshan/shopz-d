const AllProductManagerReducer = (state =[],action) =>{
    switch(action.type){
        case 'FETCHALL':
          return action.payload;
        case 'ADDNEW' :
            return [...state,action.payload]
        case 'UPDATE' :
            return state.map((user,key)=>{
                if(user.email=== action.payload.email){
                    return action.payload;
                }
                return user;
            });
        case 'DELETE' :
            return state.filter(pm => pm.email !== action.payload)
        default:
            return state
    }
}
export default AllProductManagerReducer;
