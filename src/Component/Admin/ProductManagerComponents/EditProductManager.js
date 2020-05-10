import React from 'react';
import { reduxForm, Field } from 'redux-form';
import {connect} from "react-redux";
import {updateUser} from "../../../ReduxStore/action";
import {FormControl} from "react-bootstrap";

const required = value => value ? undefined : 'Required';

function EditProductManager(props) {
    const { handleSubmit ,dispatch} = props;

    const renderField = ({ input, label, type, meta: { touched, error } }) => (
        <div>
            <FormControl {...input} type={type} placeholder={label} />
            <br/>
            <small>{touched && ((error && <span>{error}</span>))}</small>
        </div>
    )

    return (
        <form onSubmit={handleSubmit}>
            <div className="field">
                <div className="control">
                    <label className="label">User name</label>
                    <Field className="input" name="username" component={renderField}
                           type="text" disabled validate={required}/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <label className="label">Password</label>
                    <Field className="input" name="password" component={renderField}
                           type="text" validate={required}/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <label className="label">Email</label>
                    <Field className="input" name="email" component={renderField}
                           type="email" validate={required}/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button type="submit">Submit</button>
                </div>
            </div>
        </form>
    );
}
EditProductManager = reduxForm({form: 'EditPM',onSubmit: updateUser})(EditProductManager);
export default connect( state => ({
    initialValues: state.AllPMs[state.IndexPM]
}),{ onSubmit: updateUser})(EditProductManager);
