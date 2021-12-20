import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import './navbar.css';
import { useNavigate } from "react-router-dom";
import Context from '../../Context'
import { useContext } from 'react'

const Navbar = () => {
    const {oauth} = useContext(Context)
    let navigate = useNavigate();

    const handleOnClick = () => navigate('/dashboard', {replace: false});
    const handleOnClickLogin = () => navigate('/login', {replace: false});
    const handleOnClickLogout = () => navigate("/dashboard/logout");
    const github = () => {
        window.open("https://github.com/Alexis-CAPON/web-tech");
      };
    const about = () => {
        window.open("https://www.linkedin.com/in/alexis-capon/");
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx = {{boxShadow: 0}}>
                <Toolbar style = {{backgroundColor:"white"}}>
                    <IconButton
                        size="small"
                        style = {{color:"black"}}>
                        <ArrowRightIcon size ="large" />
                    </IconButton>
                    <Typography className='title' variant="h6" color = '#000000' sx={{ flexGrow: 1 }}>
                        ECEChat
                    </Typography>
                    <div className = "button" style = {{display:"flex", alignItems:"center"}}>
                        <Button style = {{color:'#000000'}} sx={{ mr: 2 }}>
                            home
                        </Button>

                        <Button style = {{color: '#000000'}} sx={{ mr: 2 }} onClick ={oauth ? (handleOnClick) : (handleOnClickLogin)}>
                            dashboard
                        </Button>

                        <Button style = {{color: '#000000'}} sx={{ mr: 2 }} onClick = {github}>
                            github
                        </Button>

                        <Button style = {{color: '#000000'}} sx={{ mr: 8 }} onClick = {about}>
                            about
                        </Button>
                    </div>

                    <div className = "login" style = {{display:"flex", alignItems:"center"}}>
                        <Button style = {{color:'#000000'}} onClick ={oauth ? (handleOnClickLogout) : (handleOnClickLogin)}>
                            {oauth ? (<div>logout</div>): (<div>login</div>)}
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    )
};

export default Navbar;