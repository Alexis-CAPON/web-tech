
/** @jsxImportSource @emotion/react */
import {forwardRef, useImperativeHandle, useLayoutEffect, useRef, useContext, useState} from 'react'
// Layout
import { useTheme } from '@mui/styles';
// Markdown
import { unified } from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
// Time
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import updateLocale from 'dayjs/plugin/updateLocale'
import Context from '../Context'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
dayjs.extend(calendar)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  calendar: {
    sameElse: 'DD/MM/YYYY hh:mm A'
  }
})

const useStyles = (theme) => ({
  root: {
    position: 'relative',
    flex: '1 1 auto',
    overflow: 'auto',
    '& ul': {
      'margin': 0,
      'padding': 0,
      'textIndent': 0,
      'listStyleType': 0,
    },
  },
  message: {
    padding: '.2rem .5rem',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,.05)',
    },
  },
  fabWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '50px',
  },
  fab: {
    position: 'fixed !important',
    top: 0,
    width: '50px',
  },
})

export default forwardRef(({
  channel,
  messages,
  onScrollDown,
}, ref) => {
  const styles = useStyles(useTheme())
  // Expose the `scroll` action
  useImperativeHandle(ref, () => ({
    scroll: scroll
  }));
  const rootEl = useRef(null)
  const scrollEl = useRef(null)
  const scroll = () => {
    scrollEl.current.scrollIntoView()
  }
  const {oauth} = useContext(Context)

  const settings = {
    deletedMessage: {},
    updatedMessage: {},
    updatedKey: 0,
    updateContent: "",
  }


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isModifing, setisModifing] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

  };

  const handleUpdate = () => {
    setAnchorEl(null);
    setisModifing(true);
  };

  const handleUpdateMessage = async () => {
    await axios.put(
        `http://localhost:3001/channels/${channel.id}/messages/${settings.updatedMessage.creation}`
      , {
        content: settings.updateContent,
        author: oauth.email,
      })
      window.location.reload()
  }
  const handleDelete = async () => {

    setAnchorEl(null);
    await axios.delete(
      `http://localhost:3001/channels/${channel.id}/messages/${settings.deletedMessage.creation}`
    )
    window.location.reload()
  };

  // See https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
  const throttleTimeout = useRef(null) // react-hooks/exhaustive-deps
  useLayoutEffect( () => {
    const rootNode = rootEl.current // react-hooks/exhaustive-deps
    const handleScroll = () => {
      if (throttleTimeout.current === null) {
        throttleTimeout.current = setTimeout(() => {
          throttleTimeout.current = null
          const {scrollTop, offsetHeight, scrollHeight} = rootNode // react-hooks/exhaustive-deps
          onScrollDown(scrollTop + offsetHeight < scrollHeight)
        }, 200)
      }
    }
    handleScroll()
    rootNode.addEventListener('scroll', handleScroll)
    return () => rootNode.removeEventListener('scroll', handleScroll)
  })
  return (
    <div css={styles.root} ref={rootEl}>
      <h1>{channel.name}</h1>
      <ul>
        { messages.map( (message, i) => {
            const {value} = unified()
            .use(markdown)
            .use(remark2rehype)
            .use(html)
            .processSync(message.content);
            return (
              <li key={i} css={styles.message}>
                <div style = {{display:"flex", alignItems:"center"}}>
                  <p>
                    <span>{message.author.split('@')[0].split('.')[0].toUpperCase()[0] + message.author.split('@')[0].split('.')[0].substring(1)}</span>
                    {' - '}
                    <span>{new Date(parseInt(message.creation)/1000).toLocaleString()}</span>
                  </p>
                  <div style = {{marginLeft: 20}}>
                    {oauth.email === message.author ? (
                      <div>
                      <IconButton
                        id="long-button"
                        aria-controls="demo-positioned-menu"
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                      >
                        <MenuItem onClick={()=>{
                          settings.updatedMessage = message;
                          settings.updatedKey = i;
                          handleUpdate()
                          }}>Modify</MenuItem>
                        <MenuItem onClick={()=>{
                          settings.deletedMessage = message;
                          handleDelete()

                          }}>Delete</MenuItem>
                      </Menu>
                      </div>
                    ):(<div></div>)}
                  </div>
                </div>
                {isModifing == true && oauth.email == message.author ? (

                <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="Required"
                      defaultValue= ""
                      onChange = {(event)=>{
                          settings.updateContent = event.target.value
                      }}
                    />
                    <IconButton sx = {{marginTop: 1, color:"green"}} aria-label="validate" onClick={() => {handleUpdateMessage()}}>
                      <DoneIcon />
                    </IconButton>
                    <IconButton sx = {{marginTop: 1, color:"red"}} aria-label="validate" onClick={() => {
                      setisModifing(false);
                    }}>
                      <CloseIcon />
                    </IconButton>



                </div>) : (<div dangerouslySetInnerHTML={{__html: value}}/>)}


              </li>
            )
        })}
      </ul>
      <div ref={scrollEl} />
    </div>
  )
})

/* <span>{dayjs().calendar(message.creation)}</span> */