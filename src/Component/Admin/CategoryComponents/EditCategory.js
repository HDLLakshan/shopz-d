import React from 'react';
import { reduxForm, Field, FieldArray} from 'redux-form';
import {connect} from "react-redux";
import {updateCat, updateUser} from "../../../ReduxStore/action";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import {FormControl} from "react-bootstrap";

const required = value => value ? undefined : 'Required'

function EditProductManager(props) {
    const { handleSubmit ,dispatch} = props;
    const renderField = ({ input, label, type, meta: { touched, error } }) => (
        <div>
            <label>{label}</label>
            <div>
                <FormControl {...input} type={type} placeholder={label} />
                <br/>
                <small>{touched && ((error && <span>{error}</span>))}</small>
            </div>
        </div>
    )

    const renderSubCat = ({ fields, meta: { error } }) => (
        <div>
            <button type="button" onClick={() => fields.push()}>
                Add Sub Category
            </button>
            {fields.map((hobby, index) => (
                <div key={index}>
                    <Button type="button" startIcon={<DeleteIcon/>} onClick={() => fields.remove(index)}/>
                    <Field name={hobby} type="text" component={renderField} label={`Sub Category ${index + 1}`}/>
                </div>
            ))}
            {error && <li className="error">{error}</li>}
        </div>
    )


    return (
        <form onSubmit={handleSubmit}>
            <div className="field">
                <div className="control">
                    <label className="label">Category name</label>
                    <Field className="input" name="name" component="input"
                           type="text" placeholder="name" component={renderField}/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <label className="label">Slug</label>
                    <Field className="input" name="slug" component="input"
                           type="text" placeholder="Slug ex: similar word" component={renderField}/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <label className="label">Description</label>
                    <Field className="input" name="description" component="input"
                           type="text" placeholder="Description" component={renderField}/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <FieldArray name="subCategory" component={renderSubCat}/>
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
EditProductManager = reduxForm({form: 'EditPM',onSubmit: updateCat})(EditProductManager);
export default connect( state => ({
    initialValues: state.AllCats[state.IndexCat]
}),{ onSubmit: updateCat})(EditProductManager);
