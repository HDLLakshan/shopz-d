import axios from "axios";
import {SubmissionError} from "redux-form";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

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
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        dispatch(showForm());
                        dispatch(AssignUser(data));
                        return axios.post('http://localhost:4000/admin/add', data)
                            .then(() => {})
                            .catch(error => {
                                throw(error);
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });

    }
};


export const updateUser = (data) => {
    return (dispatch) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        dispatch(showEditForm());
                        dispatch(UpdateList(data));
                        return axios.put(`http://localhost:4000/admin/${data.username}`,data)
                            .then(() => {})
                            .catch(error => {
                                throw(error);
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });

    }
};
export const deleteUser = (data) => {
    return (dispatch) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        dispatch(DeleteListPM(data));
                        return axios.delete(`http://localhost:4000/admin/${data}`)
                            .then(response => {
                            })
                            .catch(error => {
                                throw(error);
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
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
        return axios.get('http://localhost:4000/admin/all')
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
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        dispatch(showFormCat());
                        dispatch(AssignCat(data));
                        return axios.post('http://localhost:4000/category/add', data)
                            .then(response => {})
                            .catch(error => {
                                throw(error);
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });

    }
}


export const updateCat = (data) => {
    return (dispatch) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        dispatch(showEditFormCat());
                        dispatch(UpdateListCat(data))
                        return axios.put(`http://localhost:4000/category/${data.name}`,data)
                            .then(response => {

                            })
                            .catch(error => {
                                throw(error);
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });

    }
};

export const deleteCat = (data) => {
    return (dispatch) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        dispatch(DeleteListCat(data));
                        return axios.delete(`http://localhost:4000/category/${data}`)
                            .then(response => {
                            })
                            .catch(error => {
                                throw(error);
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
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
        return axios.get('http://localhost:4000/category/all')
            .then(response => {
                dispatch(fetchCats(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const Login = (data)=>{
    axios.get('http://localhost:4000/userAdmin/all')
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

