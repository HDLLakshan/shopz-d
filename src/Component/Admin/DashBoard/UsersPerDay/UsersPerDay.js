import React from 'react';
import clsx from 'clsx';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    Divider
} from '@material-ui/core';
import { data, options } from './chart';

const useStyles = makeStyles(() => ({
    root: {},
    chartContainer: {
        height: 400,
        position: 'relative'
    },
    actions: {
        justifyContent: 'flex-end'
    }
}));

export function UsersPerDay(props){
    const { className, ...rest } = props;

    const classes = useStyles();

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardHeader
                title="Latest Sales"
            />
            <Divider />
            <CardContent>
                <div className={classes.chartContainer}>
                    <Bar
                        data={data}
                        options={options}
                    />
                </div>
            </CardContent>
            <Divider />
        </Card>
    );
}
