import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import clsx from "clsx";
import MoneyIcon from '@material-ui/icons/Money';

const white = '#FFFFFF';
const black = '#000000';

export function ActiveUsers(props){
    const useStyles = makeStyles(theme => ({
        root: {
            height: '100%'
        },
        content: {
            alignItems: 'center',
            display: 'flex'
        },
        title: {
            fontWeight: 700
        },
        avatar: {
            height: 56,
            width: 56
        },
        icon: {
            height: 32,
            width: 32
        },
        difference: {
            //marginTop: theme.spacing(2),
            display: 'flex',
            alignItems: 'center'
        }
    }));
    const { className, ...rest } = props;
    const classes = useStyles();

    return(
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardContent>
                <Grid
                    container
                    justify="space-between"
                >
                    <Grid item>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >
                            Active Users
                        </Typography>
                        <Typography variant="h3">5</Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <MoneyIcon className={classes.icon} />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
