import React from 'react';
import {reduxForm, Field, FieldArray} from 'redux-form';
import {addCat} from "../../../ReduxStore/action";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import {FormControl, Form, Row} from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";

const required = value => value ? undefined : 'Required';
const renderField = ({input, label, type, meta: {touched, error}}) => (
    <div>
        <FormControl {...input} type={type} placeholder={label}/>
        <small>{touched && ((error && <span>{error}</span>))}</small>
        <br/>
    </div>
);
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    }
}));

function AddCategory(props) {
    const classes = useStyles();

    const {handleSubmit, dispatch, pristine, submitting} = props;

    const renderSubCat = ({fields, meta: {error}}) => (
        <div>
            <Button variant="contained" type="button" onClick={() => fields.push()}>
                Add Sub Category
            </Button>
            {fields.map((hobby, index) => (
                <div key={index}>
                    <Row style={{paddingTop: '10px'}}>
                        <IconButton type="button" onClick={() => fields.remove(index)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                        <Field name={hobby} type="text" component={renderField}
                               label={`Sub Category ${index + 1}`}/>
                    </Row>

                </div>
            ))}
            {error && <li className="error">{error}</li>}
        </div>
    )

    return (
        <form onSubmit={handleSubmit}>
            <div className="field">
                <div className="control">
                    <Form.Label className="label">Category name</Form.Label>
                    <Field name="name" component={renderField}
                           type="text" validate={required}/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <Form.Label className="label">Slug</Form.Label>
                    <Field className="input" name="slug" component={renderField}
                           type="text" placeholder="Slug" validate={required}/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <Form.Label className="label">Description</Form.Label>
                    <Field className="input" name="description" component={renderField} type="text"
                           placeholder="Description"/>
                </div>
            </div>

            <div className="field" >
                <div className="control">
                    <FieldArray name="subCategory" component={renderSubCat}/>
                </div>
            </div>
            <hr/>
            <div className="field">
                <div className="control">
                    <Button variant="contained" type="submit">Submit</Button>
                </div>
            </div>
        </form>
    );
}

AddCategory = reduxForm({form: 'CategoryAdd', onSubmit: addCat})(AddCategory);
export default connect(undefined, {onSubmit: addCat})(AddCategory);
