import {useContext, useState} from 'react';
import {verifyEmail} from '../../actions/userActions'
import {Navigate} from 'react-router-dom'
import {requestSecurityCode} from '../../actions/userActions'
import { PregnancyContext } from '../../contexts/PregnancyContext';
import ErrorsOrMsg from '../ErrosOrMsg';

const EmailValidation = () => {
  const {dispatch, userPayload, errorsOrMessages: errorsOrMsg, state} = useContext(PregnancyContext)
  const { is_login: isLogin,verification_session} = userPayload;
    const [user, setUser] = useState({
      security_code: ""
    })
    const handleOnSubmit = (e) => {
        e.preventDefault()
        user.security_code.trim().length > 0 && verifyEmail({dispatch: dispatch,user: user})

    }
    const handleOnChange = (e) => {
      setUser({
        ...user,[e.target.name]: e.target.value 
      })
    }

    const handleOnClick=(e)=>{
      dispatch(requestSecurityCode({dispatch: dispatch}))
    }

    if(isLogin){
      return (<Navigate to='/'/>)
    }else {
      return (
      <div className="email-container">
            <form onSubmit={handleOnSubmit} className="verify_email">
              <div className="inputs-container">
                <label>Enter security code:</label>
                <input onChange={handleOnChange} className="verify-email-input" value={user.security_code} name="security_code" type='text'/> <br/>
                <button type='submit' className="verify-email-button">Submit</button> <br/>
                <div className="center"> 
                  {errorsOrMsg?.from === 'verify_email' && (<ErrorsOrMsg errors={errorsOrMsg?.errors} msg={errorsOrMsg.msg}/>)}
                </div>  
              </div>
            </form>
        <div className='inputs-container'>
          <label  htmlFor='get-new-security-code'> Didn't receive the code?</label>
          <button id="get-new-security-code" onClick={handleOnClick} className="verify-email-button"> Request new code</button>
        </div>
      </div>
      )  
    }
};

export default EmailValidation 