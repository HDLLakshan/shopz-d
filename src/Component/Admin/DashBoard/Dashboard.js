import * as React from "react";
import {HomeAdmin} from "../HomeAdmin/HomeAdmin";
import AuthService from "../../UserManagement/services/auth.service";
import {Unauthorized} from "../Unathorized/Unauthorized";
import {useStyles} from '../CategoryComponents/Category'
import './dashboard.scss'
import Button from "@material-ui/core/Button";

export function Dashboard(props) {
    const classes = useStyles();
    let admin;
    let user = AuthService.getCurrentUser();
    if (user) {
        admin = AuthService.getCurrentUser().roles[0] === "ROLE_ADMIN"
    } else {
        admin = false
    }

    return (
        <div>
            {
                admin ?
                    <div className={classes.root}>
                        <HomeAdmin path={props}/>
                        <div className="image"></div>
                        Site embed with google analytics Where you can see Site viewers, session durations and etc
                        <hr/>
                        <a href="https://analytics.google.com/analytics/web/#/report-home/a145125220w232896032p21865"><Button>Go to Google analytics site</Button></a>
                        <div id="embed-api-auth-container"></div>
                        <div id="chart-container"></div>
                        <div id="view-selector-container"></div>
                    </div>
                    :
                    <Unauthorized/>
            }

        </div>
    )
}
