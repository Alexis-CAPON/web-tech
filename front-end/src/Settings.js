import * as React from 'react';

import Context from './Context';
import {useContext} from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export default function Settings() {
    const {oauth} = useContext(Context)
    
    const Input = styled('input')({
        display: 'none',
      });

    return (
        <div>
            <h1>Settings :</h1>
            <h4>Name : {oauth.email.split('@')[0].split('.')[0].toUpperCase()[0] + oauth.email.split('@')[0].split('.')[0].substring(1)}</h4>
            <h4>Email : {oauth.email}</h4>

            <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                <Button variant="outlined" component="span">
                Change profile image
                </Button>
            </label>
        </div>
    );
};