import {useContext, useState} from 'react';
import ErrorsOrMsg from '../ErrosOrMsg';
import { useSearchParams } from 'react-router-dom';
import { PregnancyContext } from '../../contexts/PregnancyContext';
import { resetUserPassword } from '../../actions/userActions';
import { paths } from '../../helpers/paths';

const ResetPassword= () =>{
    const {dispatch, userPayload, errorsOrMessages: errorsOrMsg, state} = useContext(PregnancyContext)
    const { is_login: isLogin,verification_session} = userPayload;
    const [searchParams] = useSearchParams();
    const code = searchParams?.get('security_code')

    const [user, setUser] = useState({
      security_code: code,
      password: "",
      password_confirmation: "",
    })
    
    let handleOnChange = (e)=>{
      setUser({
       ...user,[e.target.name]: e.target.value
      })
    }

    let handleOnSubmit = (e) =>{
        e.preventDefault()
       resetUserPassword({dispatch: dispatch ,user: user, path: paths().resetPassword}) 
    }

    return (
        <div>
              <div className="email-container"> 
                  <form onSubmit={handleOnSubmit}  className="verify_email">  
                     <div className="inputs-container">
                        <label>New Password:</label>
                        <input onChange={handleOnChange} value={user.password}className="verify-email-input" type="password" name="password" />
                        <label>Confirm Password:</label>
                        <input onChange={handleOnChange}  value={user.password_confirmation}className="verify-email-input" type="password" name="password_confirmation" />
                        <button type='submit' className="verify-email-button">Save</button>
                      </div>
                      <div className="center"> 
                        {errorsOrMsg.from === 'reset_password' &&  <ErrorsOrMsg errors={errorsOrMsg?.errors} msg={errorsOrMsg?.msg}/>}
                      </div> 
                  </form>  
              </div>
            <br/>
        </div>
    )
}

export default ResetPassword