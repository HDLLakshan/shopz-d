import mockData from './data';
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardHeader from "@material-ui/core/CardHeader";
import clsx from "clsx";
import React, {useState} from "react";
import CardContent from "@material-ui/core/CardContent";
import PerfectScrollbar from 'react-perfect-scrollbar';
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableBody from "@material-ui/core/TableBody";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import Tooltip from "@material-ui/core/Tooltip";
import moment from 'moment';
import TableHead from "@material-ui/core/TableHead";



const useStyles = makeStyles(theme => ({
    root: {},
    content: {
        padding: 0
    },
    inner: {
        minWidth: 800
    },
    statusContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    actions: {
        justifyContent: 'flex-end'
    }
}));

const statusColors = {
    delivered: 'success',
    pending: 'info',
    refunded: 'danger'
};
export function TopSales(props) {
    const { className, ...rest } = props;

    const classes = useStyles();

    const [orders] = useState(mockData);
return(
    <Card
        {...rest}
        className={clsx(classes.root, className)}
    >
        <CardHeader
            title="Latest Orders"
        />
        <Divider />
        <CardContent className={classes.content}>
            <PerfectScrollbar>
                <div className={classes.inner}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order Ref</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell sortDirection="desc">
                                    <Tooltip
                                        enterDelay={300}
                                        title="Sort"
                                    >
                                        <TableSortLabel
                                            active
                                            direction="desc"
                                        >
                                            Date
                                        </TableSortLabel>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map(order => (
                                <TableRow
                                    hover
                                    key={order.id}
                                >
                                    <TableCell>{order.ref}</TableCell>
                                    <TableCell>{order.customer.name}</TableCell>
                                    <TableCell>
                                        {moment(order.createdAt).format('DD/MM/YYYY')}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </PerfectScrollbar>
        </CardContent>
        <Divider />
    </Card>
);
}
