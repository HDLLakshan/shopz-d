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
                    onClick:  () => {

                        axios.post('http://localhost:4000/admin/add', data , )
                            .then((response) => {
                                console.log(response)
                                if (response.status == 200){
                                    dispatch(AssignUser(data));
                                    dispatch(showForm());
                                }
                                else if (response.status == 208){
                                    alert('user email already exist')
                                }else {
                                    alert(response.status)
                                }
                            })
                            .catch(error => {
                                alert(error);
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

                        return axios.put(`http://localhost:4000/admin/${data.email}`,data)
                            .then((response) => {
                                if (response.status == 200){
                                    dispatch(showEditForm());
                                    dispatch(UpdateList(data));
                                } else {
                                    alert(response.status)
                                }
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
export const deleteUser = (data) => {
    console.log(data)
    return (dispatch) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {

                        return axios.delete(`http://localhost:4000/admin/${data}`)
                            .then(response => {
                                if (response.status == 200){
                                    dispatch(DeleteListPM(data));
                                } else {
                                    alert(response.status)
                                }
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

                        return axios.post('http://localhost:4000/category/add', data)
                            .then(response => {
                                if (response.status == 200){
                                    dispatch(showFormCat());
                                    dispatch(AssignCat(data));
                                } else {
                                    alert(response.status)
                                }
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
                        return axios.put(`http://localhost:4000/category/${data.name}`,data)
                            .then(response => {
                                if (response.status === 200){
                                    dispatch(showEditFormCat());
                                    dispatch(UpdateListCat(data));
                                } else {
                                    alert(response.status)
                                }
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

                        return axios.delete(`http://localhost:4000/category/${data}`)
                            .then(response => {
                                if (response.status === 200){
                                    dispatch(DeleteListCat(data));
                                } else {
                                    alert(response.status)
                                }
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

export const CartLength = (data)=>{
    return {type:'count', payload:data}
};

export const fetchUsers = (Users) => {
    return {
        type: 'FETCHALLUSER',
        payload:Users
    }
};
export const fetchAllUsers =() => {
    return (dispatch) => {
        return axios.get('http://localhost:4000/users/all')
            .then(response => {
                dispatch(fetchUsers(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const fetchProducts = (Users) => {
    return {
        type: 'FETCHALLPRO',
        payload:Users
    }
};
export const fetchAllProducts =() => {
    return (dispatch) => {
        return axios.get('http://localhost:4000/products/')
            .then(response => {
                dispatch(fetchProducts(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};


export const fetchPayment = (Users) => {
    return {
        type: 'FETCHALLPAY',
        payload:Users
    }
};
export const fetchAllPayments =() => {
    return (dispatch) => {
        return axios.get('http://localhost:4000/payment/get-payment')
            .then(response => {
                dispatch(fetchPayment(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};
