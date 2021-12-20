/** @jsxImportSource @emotion/react */
import {useContext, useEffect} from 'react';
import axios from 'axios';
// Layout
import {ListItem} from '@mui/material';

// Local
import Context from './Context'
import {useNavigate} from 'react-router-dom'
import ForwardIcon from '@mui/icons-material/Forward';
import List from '@mui/material/List';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const styles = {
  root: {
    '& a': {
      padding: '.4rem .10rem',
      whiteSpace: 'nowrap',
      fontSize: '20px',
      lineHeight: "40px",
      color: '#000000',
    },
    paddingTop: "20px",
    textAlign:'center',
  },
  buttonAdd:{
    '.buttonAdd':{
      textAlign:'center',
      position:'relative',
    }
  }
}

export default function Channels() {
  const {
    oauth,
    channels, setChannels
  } = useContext(Context)
  const naviate = useNavigate();
  useEffect( () => {
    const fetch = async () => {
      try{
        const {data: channels} = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        setChannels(channels)
      }catch(err){
        console.error(err)
      }
    }
    fetch()
  }, [oauth, setChannels])


  return (
    <List>

      { channels.map( (channel, i) => (
        <ListItem button key = {i} onClick={ (e) => {
          naviate(`/dashboard/channels/${channel.id}`)
        }}>
          <ListItemIcon>
            {<ForwardIcon/>}
          </ListItemIcon>
          <ListItemText primary={channel.name} />
        </ListItem>
    ))}
  </List>

  );
}