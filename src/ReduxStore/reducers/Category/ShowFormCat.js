const ShowFormCat = (state =false, action) =>{
    switch(action.type){
        case 'ADDFORMCAT':
            return !state;
        default:
            return state
    }
}
export default ShowFormCat;