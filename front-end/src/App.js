
/** @jsxImportSource @emotion/react */
import {useState} from 'react';
import Layout from './Layout';
import './App.css';
// Local
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Login from './Login'

const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '',
    padding: '50px',
  },
}

let { data } = require('./Context.js');

export default function App() {
  const [user, setUser] = useState(null);
  console.log(data.liveUserInfo.isConnected);
  data.liveUserInfo.isConnected = false;
  console.log(data.liveUserInfo.isConnected);
  if (data.liveUserInfo.isConnected){
    return (
      <div className="App" css={styles.root}>
        <Header />
        {
            <Layout><Main /> </Layout>
        }

      </div>
    );

  }
  else{

    return (
      <div className="App" css={styles.root}>
        <Header />
        {
            <Login onUser={setUser} />
        }
      </div>
    );
  }
}
