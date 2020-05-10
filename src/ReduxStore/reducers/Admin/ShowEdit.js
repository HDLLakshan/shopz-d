const ShowEdit = (state =false,action) =>{
    switch(action.type){
        case 'EDITFORMPM':
            return !state;
        default:
            return state
    }
}
export default ShowEdit;