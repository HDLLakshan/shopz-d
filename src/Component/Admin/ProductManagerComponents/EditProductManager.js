import React from 'react';
import { reduxForm, Field } from 'redux-form';
import {connect} from "react-redux";
import {updateUser} from "../../../ReduxStore/action";
import {FormControl} from "react-bootstrap";
import Button from "@material-ui/core/Button";

const required = value => value ? undefined : 'Required';
const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength6 = minLength(6);
const passwordsMatch = (value, allValues) =>
    value !== allValues.password ? 'Passwords don\'t match' : undefined;

const renderField = ({ input, label, type, meta: { touched, error },disabled }) => (
    <div>
        <FormControl {...input} type={type} placeholder={label} disabled={disabled}/>
        <small>{touched && ((error && <span>{error}</span>))}</small>
        <br/>
    </div>
);

function EditProductManager(props) {
    const { handleSubmit ,dispatch} = props;



    return (
        <form onSubmit={handleSubmit}>
            <div className="field">
                <div className="control">
                    <label className="label">User name</label>
                    <Field className="input" name="username" component={renderField}
                           type="text" validate={required}/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <label className="label">Password</label>
                    <Field className="input" name="password" component={renderField}
                           type="text" validate={[required,minLength6]}/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <label className="label">Email</label>
                    <Field className="input" name="email" component={renderField}
                           type="email" validate={required} disabled={true}/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <Button variant="contained" type="submit">Submit</Button>
                </div>
            </div>
        </form>
    );
}
EditProductManager = reduxForm({form: 'EditPM',onSubmit: updateUser})(EditProductManager);
export default connect( state => ({
    initialValues: state.AllPMs[state.IndexPM]
}),{ onSubmit: updateUser})(EditProductManager);
