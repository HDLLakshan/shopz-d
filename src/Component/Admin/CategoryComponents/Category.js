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

const useStyles = makeStyles((theme) => ({
    root: {
        width: '50%',
        marginTop: 20,
        marginLeft: 10,
        padding:10
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

export function Category() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const list_CAT = useSelector(state => state.AllCats).map((cat, i) => {
        return (
            <ExpansionPanel expanded={expanded === i} onChange={handleChange(i)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1bh-content"
                                       id="panel1bh-header">
                    <Typography className={classes.secondaryHeading}>User Name</Typography>
                    <Typography className={classes.heading}>{cat.name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.column}>
                        <Typography variant="h6">User Name :</Typography>
                        <Typography variant="subtitle2"></Typography>
                        <Typography variant="h6">Password :</Typography>
                        <Typography variant="subtitle2"></Typography>
                    </div>
                    <div className={clsx(classes.column, classes.helper)}>
                        <Typography variant="caption">
                            Email:
                            <br/>

                        </Typography>
                    </div>
                </ExpansionPanelDetails>
                <Divider/>
                <ExpansionPanelActions>
                    <Button size="small" onClick={()=>{dispatch(deleteCat(cat.name))}}>DELETE</Button>
                    <Button size="small" color="primary" onClick={()=>{ dispatch(indexCatlist(i));
                        dispatch(showEditFormCat())}}>
                        Edit
                    </Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        )
    });

    return (
        <Row style={{width:'100%'}}>
            <Col className={classes.root}>
                <h2>Category details</h2>
                {list_CAT}
            </Col>
            <Col className={classes.root}>
                <Button style={{width:'100%'}}
                        variant="contained"
                        color="secondary"
                        startIcon={<AddIcon />}
                        onClick={()=> dispatch(showFormCat())}
                >Add</Button>
                {useSelector(state=>state.ShowAddCat) ? <AddCategory/>: null}
                {useSelector(state=>state.ShowEditCat) ? <EditCategory/>: null}
            </Col>
        </Row>
    )
}