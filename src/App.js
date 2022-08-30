import React from 'react';
import './App.css';
import LandingPage from './Pages/LandingPage';
import RegisPage from './Pages/RegisterPage';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import Axios from 'axios';
import { API_URL } from './helper';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from './Actions/userAction';
import ProfilePage from './Pages/ProfilePage';

function App() {

  const dispatch = useDispatch();

  const { status } = useSelector(({ userReducer }) => {
    return {
      status: userReducer.status
    }
  })

  const keepLogin = () => {
    let HelloLog = localStorage.getItem('HelloLog');
    if (HelloLog) {
      Axios.get(API_URL + `/users?id=${HelloLog}`)
        .then((res) => {
          if (res.data.length > 0) {
            localStorage.setItem('HelloLog', res.data[0].id)
            dispatch(loginAction(res.data[0]));
          }
        }).catch((err) => {
          console.log(err);
        })

    }
  }

  React.useEffect(() => {
    keepLogin()
  }, []);

  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<RegisPage />} />
        <Route path='/login' element={<LoginPage />} />
        {
          status == 'Verified' && 'Unverified' 
        }
        <Route path='/home' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
