import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';

import HomeIcon from '@mui/icons-material/Home';
import './navbar2.css';

import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import Context from '../../Context';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom'


const Navbar = () => {
    const settings = ['Change image', 'Logout'];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
    const handleCloseNavMenu = (text) => {
        setAnchorElNav(null);
        if (text == "Logout") {
            navigate('/dashboard/logout')
        }
        if (text == "Change image") {
            navigate('/dashboard/settings')
        }
      };

    const navigate = useNavigate();
    const goback = () => {
        navigate("..");
    }

    const {oauth} = useContext(Context)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="absolute" sx = {{boxShadow: 0}}>
                <Toolbar style = {{backgroundColor:"#d7ffb0"}}>
                    <IconButton onClick={goback}
                        size="small"
                        style = {{color:"black"}}>
                        <HomeIcon sx={{ fontSize:25, mr: 2  }} />
                    </IconButton>
                    <Typography className='title' variant="h6" color = '#000000' sx={{ flexGrow: 1.1 }}>
                        ECEChat
                    </Typography>

                    <Typography className='title2' variant="h5" color = '#000000' sx={{ flexGrow: 1 }}>
                        Dashboard
                    </Typography>
                    <div className = "button" style = {{display:"flex", alignItems:"center"}}>

                        <div>
                        </div>

                        <Typography color = '#000000' sx={{ mr: 2 }}>
                            {oauth.email}
                        </Typography>
                    </div>

                    <div className = "login" style = {{display:"flex", alignItems:"center"}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0}}>
                                <Avatar> {oauth.email.substring(0,1).toUpperCase()} </Avatar>
                            </IconButton>

                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => {handleCloseNavMenu(setting)}}>
                                <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    )
};

export default Navbar;