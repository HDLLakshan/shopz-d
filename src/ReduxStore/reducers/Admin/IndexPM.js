const IndexPM = (state =0,action) =>{
    switch(action.type){
        case 'CHANGE':
            return action.payload;
        default:
            return state
    }
}
export default IndexPM;