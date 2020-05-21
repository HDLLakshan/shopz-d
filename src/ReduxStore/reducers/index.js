import {combineReducers} from "redux";
import { reducer as formReducer } from 'redux-form';
import AllProductManagerReducer from "./Admin/AllProductManagers";
import ShowForm from "./Admin/ShowForm";
import ShowEdit from "./Admin/ShowEdit";
import IndexPM from "./Admin/IndexPM";
import ShowEditFormCat from "./Category/ShowEditFormCat";
import ShowFormCat from "./Category/ShowFormCat";
import AllCategoryReducer from "./Category/AllCategories";
import IndexCategory from "./Category/IndexCategory";
import CartCount from "./Cart/CartCount";

const allReducers = combineReducers({
    CartCount:CartCount,
    ShowEditPM: ShowEdit,
    ShowAddPM: ShowForm,
    AllPMs: AllProductManagerReducer,
    form: formReducer,
    IndexPM:IndexPM,
    ShowEditCat: ShowEditFormCat,
    ShowAddCat: ShowFormCat,
    AllCats: AllCategoryReducer,
    IndexCat:IndexCategory,
});
export default allReducers;
