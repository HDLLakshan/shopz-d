import React from 'react';
import { reduxForm, Field } from 'redux-form';
import {addUser} from "../../../ReduxStore/action";
import {connect} from "react-redux";
import {FormControl} from "react-bootstrap";
import Button from "@material-ui/core/Button";

const required = value => value ? undefined : 'Required';
const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength6 = minLength(6);
const passwordsMatch = (value, allValues) =>
    value !== allValues.password ? 'Passwords don\'t match' : undefined;
const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <FormControl {...input} type={type} placeholder={label} />
        <small>{touched && ((error && <span>{error}</span>))}</small>
        <br/>
    </div>
);

function AddProductManager(props) {
    const { handleSubmit ,dispatch,pristine,submitting} = props;


    return (
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <div className="control">
                        <label className="label">User name</label>
                        <Field className="input" name="username" component={renderField}
                               type="text" placeholder="User name" validate={required}/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Password</label>
                        <Field className="input" name="password" component={renderField}
                               type="password" placeholder="Password" validate={[required,minLength6]}/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Confirm Password</label>
                        <Field className="input" name="ConfirmPassword" component={renderField}
                               type="password" placeholder="Password" validate={[required,passwordsMatch]}/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Email</label>
                        <Field className="input" name="email" component={renderField}
                               type="email" placeholder="Email Address" validate={required}/>
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
AddProductManager = reduxForm({form: 'signIn',onSubmit: addUser})(AddProductManager);
export default connect(undefined,{ onSubmit: addUser})(AddProductManager);
