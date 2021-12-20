
/** @jsxImportSource @emotion/react */
import { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import crypto from 'crypto'
import qs from 'qs'
import axios from 'axios'
// Layout
import { useTheme } from '@mui/styles';
import { Link } from '@mui/material';
// Local
import Context from './Context'
import {useNavigate} from 'react-router-dom'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';


const base64URLEncode = (str) => {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

const sha256 = (buffer) => {
  return crypto
    .createHash('sha256')
    .update(buffer)
    .digest()
}

const useStyles = (theme) => ({
  root: {
    flex: '1 1 auto',
    background: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& > div': {
      margin: `${theme.spacing(1)}`,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    '& fieldset': {
      border: 'none',
      '& label': {
        marginBottom: theme.spacing(.5),
        display: 'block',
      },
    },
  },
})


const Redirect = ({
  config,
  codeVerifier,
}) => {
  const styles = useStyles(useTheme())
  const redirect = (e) => {
    e.stopPropagation()
    const code_challenge = base64URLEncode(sha256(codeVerifier))
    const url = [
      `${config.authorization_endpoint}?`,
      `client_id=${config.client_id}&`,
      `scope=${config.scope}&`,
      `response_type=code&`,
      `redirect_uri=${config.redirect_uri}&`,
      `code_challenge=${code_challenge}&`,
      `code_challenge_method=S256`,
    ].join('')
    window.location = url
  }

  const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

  return (
    <div css={styles.root}>
      <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Login - Welcome !</DialogTitle>
            <DialogContent>
              <DialogContentText sx = {{marginBottom: 0, color: "#868686"}}>
                  Welcome ! Please choose a login method :
              </DialogContentText>
              <Divider />

              <Button  sx = {{marginTop: 2}} variant="outlined" onClick = {redirect}>
                Oauth - Secured authentification
              </Button>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    </div>
  )
}



export function Tokens ({oauth})  {
  const styles = useStyles(useTheme())
  const {setOauth} = useContext(Context)
  const {id_token} = oauth
  const id_payload = id_token.split('.')[1]
  const {email} = JSON.parse(atob(id_payload))
  const {name} = JSON.parse(atob(id_payload))
  const [cookies, setCookie, removeCookies] = useCookies();
  
  const navigate = useNavigate();
  const logout = (e) => {
    navigate("..");
    navigate("/homepage");
    e.stopPropagation()
    setOauth(null);
    removeCookies(oauth);
    
  }
  return (
    <div css={styles.root}>
      <h2>Are you sure you want to do this {oauth.email.split('@')[0].split('.')[0].toUpperCase()[0] + oauth.email.split('@')[0].split('.')[0].substring(1)} ?</h2>
      <Link onClick={logout} color="secondary">Yes, I am. (logout)</Link>
    </div>
  )
}

const LoadToken = function({
  code,
  codeVerifier,
  config,
  removeCookie,
  setOauth
}) {
  const styles = useStyles(useTheme());
  useEffect( () => {
    const fetch = async () => {
      try {
        const {data} = await axios.post(
          config.token_endpoint
        , qs.stringify ({
          grant_type: 'authorization_code',
          client_id: `${config.client_id}`,
          code_verifier: `${codeVerifier}`,
          redirect_uri: `${config.redirect_uri}`,
          code: `${code}`,
        }))
        removeCookie('code_verifier')
        setOauth(data)
        window.location = '/'
      }catch (err) {
        console.error(err)
      }
    }
    fetch()
  })
  return (
    <div css={styles.root}>Loading tokens</div>
  )
}

export default function Login({
  onUser
}) {
  const styles = useStyles(useTheme())
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const {oauth, setOauth} = useContext(Context)
  const config = {
    authorization_endpoint: 'http://localhost:5556/dex/auth',
    token_endpoint: 'http://localhost:5556/dex/token',
    client_id: 'webtech-frontend',
    redirect_uri: 'http://localhost:3000/dashboard',
    scope: 'openid%20email%20offline_access',
  }
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  // Is there a code query parameters in the url 
  if(!code){ // No: we are not being redirected from an oauth server
    console.log("Debug - Not redirected")
    if(!oauth){
      console.log("Debug - No oauth")
      const codeVerifier = base64URLEncode(crypto.randomBytes(32))
      setCookie('code_verifier', codeVerifier)
      return (
        <Redirect codeVerifier={codeVerifier} config={config} css={styles.root} />
      )
    }else{ // Yes: user is already logged in, great, is is working
      console.log("Debug - Already logged")
      /*
      return (
        <Tokens oauth={oauth} css={styles.root} />
      )
      */
     return (<div></div>)
    }
  }else{ // Yes, we are coming from an oauth server
    console.log("Debug - Redirected")
    return (
      <LoadToken
        code={code}
        codeVerifier={cookies.code_verifier}
        config={config}
        setOauth={setOauth}
        removeCookie={removeCookie} />
    )
  }
}