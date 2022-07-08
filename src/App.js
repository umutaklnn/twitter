import * as React from 'react';
import { useEffect, useState, CSSProperties } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import './asset/css/App.css';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';


function App() {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(0);
  const [home, setHome] = useState(false);
  const [userId, setUserId] = useState(null);

  let [color, setColor] = useState("#ffffff");
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const override: CSSProperties = {
    borderColor: "blue",
  };
  return (
    <>
      {loading ?
        <ClipLoader color={color} className="loading" loading={loading} cssOverride={override} size={70} />
        :
        <>


          {login === 0 ? <Login setUserId={setUserId} setHome={setHome} loginExt={login} setLogin={setLogin} /> : ''}
          {login === 1 ? <Register loginExt={login} setLogin={setLogin} /> : ''}
          {login === 2 ? <Profile setHome={setHome} userId={userId} /> : ''}










        </>}
    </>
  );
}

export default App;
