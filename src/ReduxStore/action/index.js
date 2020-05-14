import axios from "axios";
import {SubmissionError} from "redux-form";
export const showForm =() => {
    return {
        type: 'ADDFORMPM'
    }
};
export const showEditForm =() => {
    return {
        type: 'EDITFORMPM'
    }
};
export const indexPMlist =(data)=> {
    return {
        type: 'CHANGE',
        payload: data
    }
};
export const AssignUser = (data) =>{
    return {
        type: 'ADDNEW',
        payload: data
    }
};

export const UpdateList = (data) =>{
    return {
        type: 'UPDATE',
        payload: data
    }
};
export const DeleteListPM = (data) => {
    return {
        type: 'DELETE',
        payload: data
    }
};
export const addUser = (data) => {
    return (dispatch) => {
        dispatch(showForm());
        dispatch(AssignUser(data));
        return axios.post('https://the-hanger-af.el.r.appspot.com/admin/add', data)
            .then(() => {})
            .catch(error => {
            throw(error);
        });
    }
};


export const updateUser = (data) => {
    return (dispatch) => {
        dispatch(showEditForm());
        dispatch(UpdateList(data));
        return axios.put(`https://the-hanger-af.el.r.appspot.com/admin/${data.username}`,data)
            .then(() => {})
            .catch(error => {
                throw(error);
            });
    }
};
export const deleteUser = (data) => {
    return (dispatch) => {
        dispatch(DeleteListPM(data));
        return axios.delete(`https://the-hanger-af.el.r.appspot.com/admin/${data}`)
            .then(response => {
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const fetchPMs = (PMs) => {
    return {
        type: 'FETCHALL',
        payload:PMs
    }
};

export const fetchAllPMs =() => {
    return (dispatch) => {
        return axios.get('https://the-hanger-af.el.r.appspot.com/admin/all')
            .then(response => {
                dispatch(fetchPMs(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};


//Category
export const showFormCat =() => {
    return {
        type: 'ADDFORMCAT'
    }
};
export const showEditFormCat =() => {
    return {
        type: 'EDITFORMCAT'
    }
}
export const indexCatlist =(data)=> {
    return {
        type: 'CHANGECAT',
        payload: data
    }
}
export const AssignCat = (data) =>{
    return {
        type: 'ADDNEWCAT',
        payload: data
    }
}

export const UpdateListCat = (data) =>{
    return {
        type: 'UPDATECAT',
        payload: data
    }
}
export const DeleteListCat = (data) => {
    return {
        type: 'DELETECAT',
        payload: data
    }
}
export const addCat = (data) => {
    return (dispatch) => {
        dispatch(showFormCat());
        dispatch(AssignCat(data));
        return axios.post('https://the-hanger-af.el.r.appspot.com/category/add', data)
            .then(response => {})
            .catch(error => {
                throw(error);
            });
    }
}


export const updateCat = (data) => {
    return (dispatch) => {
        dispatch(showEditFormCat());
        dispatch(UpdateListCat(data))
        return axios.put(`https://the-hanger-af.el.r.appspot.com/category/${data.name}`,data)
            .then(response => {

            })
            .catch(error => {
                throw(error);
            });
    }
};

export const deleteCat = (data) => {
    return (dispatch) => {
        dispatch(DeleteListCat(data));
        return axios.delete(`https://the-hanger-af.el.r.appspot.com/category/${data}`)
            .then(response => {
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const fetchCats = (Cats) => {
    return {
        type: 'FETCHALLCATS',
        payload:Cats
    }
};


export const fetchAllCats =() => {
    return (dispatch) => {
        return axios.get('https://the-hanger-af.el.r.appspot.com/category/all')
            .then(response => {
                dispatch(fetchCats(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const Login = (data)=>{
    axios.get('https://the-hanger-af.el.r.appspot.com/userAdmin/all')
        .then(response =>{
            response.data.map((user)=>{
                console.log(user.username)
            })
        })
        .catch(error=>{
            throw(error);
        });
    throw new SubmissionError({ username: 'User does not exist', _error: 'Login failed!' })
};

