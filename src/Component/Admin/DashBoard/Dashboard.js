import * as React from "react";
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {ActiveUsers} from "./ActiveUsers/ActiveUsers";
import {CategoryCount} from "./Category/CategoryCount";
import {Managers} from "./ProjectManagers/Managers";
import {TopSales} from "./TopSales/TopSales";
import {UsersPerDay} from "./UsersPerDay/UsersPerDay";
import {UsersPerDevice} from "./UsersByDevice/UsersByDevice";

export function Dashboard(){
        return(
            <div>
                <Grid
                    container
                    spacing={4}
                >
                    <Grid
                        item
                        lg={4}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <ActiveUsers/>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Managers/>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <CategoryCount/>
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={12}
                        xl={9}
                        xs={12}
                    >
                        <UsersPerDay/>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xl={3}
                        xs={12}
                    >
                        <UsersPerDevice/>
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={12}
                        xl={9}
                        xs={12}
                    >
                        <TopSales/>
                    </Grid>
                </Grid>
            </div>
        )
}
