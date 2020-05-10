const IndexCategory = (state =0, action) =>{
    switch(action.type){
        case 'CHANGECAT':
            return action.payload;
        default:
            return state
    }
}
export default IndexCategory;