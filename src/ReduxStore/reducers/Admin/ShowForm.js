const ShowForm = (state =false,action) =>{
    switch(action.type){
        case 'ADDFORMPM':
            return !state;
        default:
            return state
    }
}
export default ShowForm;