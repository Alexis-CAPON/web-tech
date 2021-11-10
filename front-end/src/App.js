
/** @jsxImportSource @emotion/react */
import {useState} from 'react';
import Layout from './component/Layout';
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

export default function App() {
  const [user, setUser] = useState(null)
  return (
    <div className="App" css={styles.root}>
      //<Header />

      {
        user ? <Layout><Main /> </Layout>: <Login onUser={setUser} />  
      }

    </div>
  );
}
