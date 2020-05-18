import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Divider,
    Typography
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import RefreshIcon from '@material-ui/icons/Refresh';
import TabletMacIcon from '@material-ui/icons/TabletMac';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        fontSize: '10px'
    },
    chartContainer: {
        position: 'relative',
        height: '300px'
    },
    stats: {
        display: 'flex',
        justifyContent: 'center'
    },
    device: {
        textAlign: 'center'
    }
}));

export function UsersPerDevice(props) {
    const { className, ...rest } = props;

    const classes = useStyles();
    const theme = useTheme();

    const data = {
        datasets: [
            {
                data: [63, 15, 22],
                backgroundColor: [
                    '#FFC300',
                    '#FF5733',
                    '#C70039'
                ],
                borderWidth: 8,
                borderColor: '#FFFFFF',
                hoverBorderColor: '#FFFFFF'
            }
        ],
        labels: ['Desktop', 'Tablet', 'Mobile']
    };

    const options = {
        legend: {
            display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        cutoutPercentage: 80,
        layout: { padding: 0 },
        tooltips: {
            enabled: true,
            mode: 'index',
            intersect: false,
            borderWidth: 1,
            borderColor: '#000000',
            backgroundColor: '#FFFFFF',
            titleFontColor:'#000000' ,
            bodyFontColor:'#000000',
            footerFontColor:'#000000'
        }
    };

    const devices = [
        {
            title: 'Desktop',
            value: '63',
            icon: <LaptopMacIcon />,
            color: '#FFC300'
        },
        {
            title: 'Tablet',
            value: '15',
            icon: <TabletMacIcon />,
            color: '#FF5733'
        },
        {
            title: 'Mobile',
            value: '23',
            icon: <PhoneIphoneIcon />,
            color: '#C70039'
        }
    ];

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardHeader
                action={
                    <IconButton size="small">
                        <RefreshIcon />
                    </IconButton>
                }
                title="Users By Device"
            />
            <Divider />
            <CardContent>
                <div className={classes.chartContainer}>
                    <Doughnut
                        data={data}
                        options={options}
                    />
                </div>
                <div className={classes.stats}>
                    {devices.map(device => (
                        <div
                            className={classes.device}
                            key={device.title}
                        >
                            <span className={classes.deviceIcon}>{device.icon}</span>
                            <Typography variant="body1">{device.title}</Typography>
                            <Typography
                                style={{ color: device.color, fontSize:20 }}
                                variant="h2"
                            >
                                {device.value}%
                            </Typography>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
