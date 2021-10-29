
/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from '@mui/styles';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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


export default function Login({
  onUser
}) {
  const styles = useStyles(useTheme())
  return (

    <div css={styles.root}>
      <div>
        <fieldset>
          <TextField id="standard-basic" label="User" variant="standard" />
        </fieldset>
        <fieldset>
          <TextField id="standard-basic" label="Password" variant="standard" />
        </fieldset>
        <fieldset>
          <Button variant="contained" onClick={ (e) => {
            e.stopPropagation()
            onUser({username: 'david'})
          }}>Log In</Button>
        </fieldset>
      </div>
    </div>

  );
}
