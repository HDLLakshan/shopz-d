import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Button from "@material-ui/core/Button";
import {deleteCat, indexCatlist, showEditFormCat, showFormCat} from "../../../ReduxStore/action";
import AddIcon from "@material-ui/icons/Add";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import {Col, Row} from "react-bootstrap";
import {HomeAdmin} from "../HomeAdmin/HomeAdmin";
import AuthService from "../../UserManagement/services/auth.service";
import {Unauthorized} from "../Unathorized/Unauthorized";

export const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 10,
        marginLeft: 10,
        padding: 10
    },
    marginTop: {
        marginTop: '15px'
    },
    content: {
        marginTop: 10
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    column: {
        flexBasis: '50%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        color: theme.palette.text.secondary,
    },
}));

export function Category(props) {
    let admin;
    let user = AuthService.getCurrentUser();
    if (user) {
        admin = AuthService.getCurrentUser().roles[0] === "ROLE_ADMIN"
    } else {
        admin = false
    }
    const classes = useStyles();
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const list_CAT = useSelector(state => state.AllCats).map((cat, i) => {
        return (
            <ExpansionPanel expanded={expanded === i} onChange={handleChange(i)} className={classes.marginTop}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1bh-content"
                                       id="panel1bh-header">
                    <Typography className={classes.secondaryHeading}>Category Name</Typography>
                    <Typography className={classes.heading}>{cat.name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.column}>
                        <Typography variant="h6">Name :</Typography>
                        <Typography variant="subtitle2">{cat.name}</Typography>
                        <Typography variant="h6">Sub Categories:</Typography>
                        {cat.subCategory != undefined ?
                            (cat.subCategory.map((sub) => {
                                    return (
                                        <Typography variant="subtitle2">{sub}</Typography>
                                    )
                                })
                            )
                            : null}

                    </div>
                    <div className={clsx(classes.column, classes.helper)}>
                        <Typography variant="subtitle2">
                            Slug:
                            <br/>
                            {cat.slug}
                            <br/>
                            <br/>
                            Created At: {cat.createdAt}
                            <br/>
                            Updated At: {cat.updatedAt}
                        </Typography>
                    </div>
                </ExpansionPanelDetails>
                <Divider/>
                <ExpansionPanelActions>
                    <Button variant="contained" size="small" onClick={() => {
                        dispatch(deleteCat(cat.name))
                    }}>DELETE</Button>
                    <Button variant="contained" size="small" color="primary" onClick={() => {
                        dispatch(indexCatlist(i));
                        dispatch(showEditFormCat())
                    }}>
                        Edit
                    </Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        )
    });

    let AddCat = useSelector(state => state.ShowAddCat);
    let EditCat = useSelector(state => state.ShowEditCat);

    return (
        <div>
            {
                admin ?
                    <div className={classes.root}>
                        <HomeAdmin path={props}/>
                        <Row className={classes.content}>
                            <Col sm={6} className={classes.marginTop}>
                                <h2>Category details</h2>
                                {list_CAT}
                            </Col>
                            <Col sm={6} className={classes.marginTop}>
                                <Button style={{width: '100%'}}
                                        variant="contained"
                                        startIcon={<AddIcon/>}
                                        onClick={() => dispatch(showFormCat())}
                                >Add</Button>
                                {AddCat ? <AddCategory/> : null}
                                {EditCat ? <EditCategory/> : null}
                            </Col>
                        </Row>
                    </div>
                    :
                    <Unauthorized/>
            }
        </div>
    )
}
