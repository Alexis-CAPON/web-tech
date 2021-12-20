import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MessageIcon from '@mui/icons-material/Message';
import ForumIcon from '@mui/icons-material/Forum';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import MyChannels from './MyChannels';
import Channels from '../../Channels'
import Channel from '../../Channel'
import {useNavigate} from 'react-router-dom'

import Context from '../../Context';
import {useContext, useState} from 'react';

import {Tokens} from '../../Login';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Settings from '../../Settings';
import Music from '../../music/1.mp3';

import {
  Route,
  Routes,
} from 'react-router-dom'
import Popup from './CreateChannelsPopup';

const drawerWidth = 240;



export default function ClippedDrawer() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(true);
  const {oauth} = useContext(Context)

  window.addEventListener("DOMContentLoaded", event => {
    const audio = document.querySelector("audio");
    audio.volume = 0.5;
    audio.play();
 });

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (checked==false) {
      window.location.reload()
    }
  };

  const [openPopup, setOpenPopup] = useState(false);
  return (
    <div>
    <Box sx={{ display: 'fixed' }}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          zIndex: 0
        }}
      >
        <Toolbar/>
        <Box sx={{ overflow: 'auto'}}>
          <List>
            {['Create a channel', 'My channels'].map((text, index) => (
              <ListItem button key={text} onClick={ () => {
                if ((text) == "Create a channel"){
                  navigate("/dashboard/newchannel");
                }
                if ((text) == "My channels"){
                  navigate("/dashboard");
                }
              }}>
                <ListItemIcon>
                  {index === 0 && <MessageIcon/>}
                  {index === 1 && <ForumIcon/>}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Channels />
          <Divider />
          <List>
            {['Settings', 'Logout'].map((text, index) => (
              <ListItem button key={text} 
              
              onClick={ () => {
                if ((text) == "Settings"){
                  navigate(`/dashboard/settings`);
                }
                if ((text) == "Logout"){
                  navigate("/dashboard/logout");
                }
              }}>
                <ListItemIcon>
                  {index === 0 && <SettingsIcon/>}
                  {index === 1 && <LogoutIcon/>}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <div>
            <FormGroup sx = {{marginLeft:3, marginTop:2}}>
              <FormControlLabel control={<Switch checked={checked} onChange={handleChange}/>} label="Activate Christmas Music" />
            </FormGroup>
            <div>
            {checked ? (<div>
              <audio>
                  <source src = {Music} type="audio/mp3"></source>
              </audio>
            </div>):(<div></div>)}
            </div>
          </div>

        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
          <Routes>
            <Route path="" element={<MyChannels />}/>
            <Route path="/channels/:id" element={<Channel />}/>
            <Route path="/channels/*" element={<h1>CHICH</h1>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/logout" element={<Tokens oauth = {oauth}/>}/>
            <Route path="/newchannel" element={<Popup/>}/>
        </Routes>
      </Box>
    </Box>
    </div>
  );
}
