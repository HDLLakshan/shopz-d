import * as React from "react";
import {HomeAdmin} from "../HomeAdmin/HomeAdmin";
import AuthService from "../../UserManagement/services/auth.service";
import {Unauthorized} from "../Unathorized/Unauthorized";

export function Dashboard(props) {
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
                    <div>
                        <HomeAdmin path={props}/>
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
