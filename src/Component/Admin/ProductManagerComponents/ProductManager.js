import React from "react";
import {useDispatch, useSelector} from "react-redux";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import clsx from "clsx";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import AddProductManager from "./AddProductManager";
import {deleteCat, deleteUser, indexPMlist, showEditForm, showForm} from "../../../ReduxStore/action";
import EditProductManager from "./EditProductManager";
import {Col, Row} from "react-bootstrap";
import {HomeAdmin} from "../HomeAdmin/HomeAdmin";
import {Unauthorized} from "../Unathorized/Unauthorized";
import AuthService from "../../UserManagement/services/auth.service";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '40%',
        marginTop: 20,
        marginLeft: 10,
        padding: 10
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

export function ProductManager(props) {
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

    const list_PM = useSelector(state => state.AllPMs).map((pm, i) => {
        return (
            <ExpansionPanel expanded={expanded === i} onChange={handleChange(i)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1bh-content"
                                       id="panel1bh-header">
                    <Typography className={classes.secondaryHeading}>User Name</Typography>
                    <Typography className={classes.heading}>{pm.username}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.column}>
                        <Typography variant="h6">User Name :</Typography>
                        <Typography variant="subtitle2">{pm.username}</Typography>
                        <Typography variant="h6">Password :</Typography>
                        <Typography variant="subtitle2">{pm.password}</Typography>
                    </div>
                    <div className={clsx(classes.column, classes.helper)}>
                        <Typography variant="caption">
                            Email:
                            <br/>
                            {pm.email}
                        </Typography>
                    </div>
                </ExpansionPanelDetails>
                <Divider/>
                <ExpansionPanelActions>
                    <Button size="small" onClick={() => {
                        dispatch(deleteUser(pm.email))
                    }}>Delete</Button>
                    <Button size="small" color="primary" onClick={() => {
                        dispatch(indexPMlist(i));
                        dispatch(showEditForm())
                    }}>
                        Edit
                    </Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        )
    });

    let AddPM = useSelector(state => state.ShowAddPM);
    let EditPM = useSelector(state => state.ShowEditPM);

    return (
        <div>
            {
                admin ?
                    <div>
                        <HomeAdmin path={props}/>
                        <Row style={{width: '100%'}}>
                            <Col className={classes.root}>
                                <h2>Product Managers' Login details</h2>
                                {list_PM}
                            </Col>
                            <Col className={classes.root}>
                                <Button style={{width: '100%'}}
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<AddIcon/>}
                                        onClick={() => dispatch(showForm())}
                                >Add</Button>
                                {AddPM ? <AddProductManager/> : null}
                                {EditPM ? <EditProductManager/> : null}
                            </Col>
                        </Row>
                    </div>
                    :
                    <Unauthorized />
            }
        </div>
    )
}


