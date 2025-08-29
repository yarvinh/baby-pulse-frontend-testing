
import './App.css'
import AuthPage from './components/user/AuthPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout  from './components/Layout'
import NoMatch from './components/NoMatch';
import Home from './components/Home';
import SignUp from './components/user/SignUp';
import EmailValidation  from './components/user/EmailValidation'
import { useContext, useEffect } from 'react';
import { getFetchAction } from './actions/fetchings';
import { PregnancyContext } from './contexts/PregnancyContext';
import { paths } from './helpers/paths';
import { ACTIONS_TYPES } from './actions/actionsHelpers';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import { useRef } from 'react';

function App() {
  const {dispatch} = useContext(PregnancyContext)
  let hasFetchedCheckLogin = false
  const renderCounter = useRef(0)

  useEffect(()=>{
    if (hasFetchedCheckLogin) return;
    getFetchAction({dispatch: dispatch, type: ACTIONS_TYPES.addUser, path: paths().checkLoginPath})
  },[dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home/>} /> 
          <Route path='login' element={<AuthPage />} />
          <Route path="sign_up" element={<SignUp/>} />
          <Route path='verifying_email' element={<EmailValidation/>} />
          <Route path="*" element={<NoMatch />} /> 
          <Route path='password_recovery' element={<ForgotPassword/>} />
          <Route path='reset_password' element={<ResetPassword/>} /> 
        </Route>
      </Routes>
    </BrowserRouter>   
  )
}

export default App
