const ShowEditFormCat = (state =false, action) =>{
    switch(action.type){
        case 'EDITFORMCAT':
            return !state;
        default:
            return state
    }
}
export default ShowEditFormCat;