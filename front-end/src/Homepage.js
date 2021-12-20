import * as React from 'react';
import Navbar from './components/homepage/Navbar'

import './homepage.css';
import {useEffect} from 'react';
import Typography from '@mui/material/Typography';

import backgroundimage1 from './icons/image.PNG';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Context from './Context'
import { useContext } from 'react'

const Homepage = () => {
    const {oauth} = useContext(Context)
    let navigate = useNavigate();

    const handleOnClick = () => navigate('/dashboard', {replace: true});
    const handleOnClickLogin = () => navigate('/login', {replace: true});
    
    useEffect(() => { document.body.style.backgroundColor = '#d7ffb0' }, [])
    return (
        <div>
            <div className = "top">
                <Navbar/>
            </div>
            <div className = "middle" style = {{display:"flex", alignItems:"center"}} >
                <div className = "leftSide">
                    <Typography  variant="h2" color = '#000000' sx={{ ml: 10, mt: 20}}>
                        The ECE<br/> online chat !
                    </Typography>
                    <Typography  variant="h5" color = '#000000' sx={{ ml: 10, mt: 3}}>
                        Chat with your friends from <br/> wherever you want.
                    </Typography>
                </div>

                <div className = "rightSide" >
                    <img style = {{marginLeft:100, marginTop: 50}}  src = {backgroundimage1}/>
                </div>
            </div>
            <div className='bottom'>
                <Button sx={{ml: 10}} variant = "outlined" onClick ={oauth ? (handleOnClick) : (handleOnClickLogin)}> Start now !</Button>
            </div>
        </div>

    )
};

export default Homepage;