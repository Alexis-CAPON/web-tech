/** @jsxImportSource @emotion/react */
import {useContext, useEffect} from 'react';
import axios from 'axios';
// Layout
import {Divider} from '@mui/material';

// Local
import Context from '../../Context'
import {useNavigate} from 'react-router-dom'


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';
import backgroundimage1 from '../../icons/default.jpg';
  

export default function MyChannels() {
  const {
    oauth,
    channels, setChannels
  } = useContext(Context)
  const navigate = useNavigate();
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
    <div>
        <h1>Your channels</h1>
        <div>
            <Stack direction="row" spacing = {3}>
            { channels.map( (channel, i) => (
                     <Card key={i} onClick={ () => {
                        navigate(`/dashboard/channels/${channel.id}`)
                      }} sx={{ width: 200 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="300"
                                image={backgroundimage1}
                                alt="default-image"
                                />
                            <CardContent>
                            <Divider/>
                            <Typography sx = {{marginTop:2}}gutterBottom variant="h5" component="div">
                                {channel.name}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
            ))}
            </Stack>
        </div>
    </div>
  );
}