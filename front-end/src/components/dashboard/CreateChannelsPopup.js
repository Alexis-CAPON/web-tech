import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useNavigate} from 'react-router-dom'
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

export default function CreateChannelsPopup() {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();

    const channel = {
        name: ""
    }

    const handleClose = () => {
        setOpen(false);
        navigate("/dashboard");
    };

    const handleSubmit = async () => {
        await axios.post(`http://localhost:3001/channels`,channel);
        navigate("/dashboard");
        window.location.reload() 
    };

    return (
        <div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Channel Creation</DialogTitle>
            <DialogContent>
            <div>
            <DialogContentText sx = {{marginBottom: 0, color: "red"}}>
                Please enter all the required field ! 
            </DialogContentText>
            <Divider />
            <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="My beautiful channel"
                sx = {{marginTop: 3}}
                onChange = {(event)=>{
                    channel.name = event.target.value
                }}
            />
            </div>
            <div style = {{display:"flex", alignItems:"center"}}>
                <Typography sx = {{marginTop: 2}}> Check if watchtable by everyone :</Typography>
                <Checkbox sx = {{color: "green", marginTop: 2}} disabled checked />
            </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={()=>{handleSubmit()}}>Create</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
