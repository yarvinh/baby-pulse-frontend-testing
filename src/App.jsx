
import './App.css'
import AuthPage from './components/user/AuthPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout  from './components/Layout'
import NoMatch from './components/NoMatch';
import SignUp from './components/user/SignUp';
import EmailValidation  from './components/user/EmailValidation'
import { useContext, useEffect } from 'react';
import { PregnancyContext } from './contexts/PregnancyContext';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import { getFetchActions } from './actions/fetchings';
import { ACTIONS_TYPES } from './actions/actionsHelpers';
import { paths } from './helpers/paths';
import PregnanciesContainer from './containers/PregnanciesContainer';
import EditUser from './components/user/EditUser';

function App() {
  const {dispatch} = useContext(PregnancyContext)
  let hasFetchedCheckLogin = false
  useEffect(()=>{
    if (hasFetchedCheckLogin) return;
    getFetchActions({
      path: paths().checkLoginPath,
      dispatch: dispatch, 
      actions:{
        actionType: ACTIONS_TYPES.addUser, 
      }
    })
    hasFetchedCheckLogin = true
  },[dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<PregnanciesContainer/>}/> 
          <Route path='users/:id' element={<EditUser />} />
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
