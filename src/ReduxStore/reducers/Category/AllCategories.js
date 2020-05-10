const AllCategoryReducer = (state =[],action) =>{
    switch(action.type){
        case 'FETCHALLCATS':
          return action.payload;
        case 'ADDNEWCAT' :
            return [...state,action.payload]
        case 'UPDATECAT' :
            return state.map((category,key)=>{
                if(category.name=== action.payload.name){
                    return action.payload;
                }
                return category;
            });
        case 'DELETECAT' :
            return state.filter(category => category.name !== action.payload)
        default:
            return state
    }
}
export default AllCategoryReducer;