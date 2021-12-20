import * as React from 'react';
import { makeStyles } from '@mui/styles';
import './dashboard.css';
import {useEffect} from 'react';
import Navbar2 from './components/dashboard/Navbar2';

import Grid from '@mui/material/Grid';
import Feed from './components/dashboard/Feed';

const useStyles = makeStyles((theme) => ({

}));

const Dashboard = () => {
    const classes = useStyles();
    useEffect(() => { document.body.style.backgroundColor = '#ffffff' }, [])
    return (
        <div position="fixed">
            <div className = "top" >
                <Navbar2/>
            </div>
            <div className = "middle"> 
                <Grid container className={classes.container}>
                        <Grid item xs={10} className={classes.leftbar}>
                            <Feed/>
                        </Grid>
                        <Grid item xs={2} className={classes.right}>
                        </Grid>
                </Grid>
            </div>
        </div>

    )
};


export default Dashboard;