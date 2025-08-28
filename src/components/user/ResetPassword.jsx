import {useContext, useState} from 'react';
import ErrorsOrMsg from '../ErrosOrMsg';
import { useSearchParams } from 'react-router-dom';
import { PregnancyContext } from '../../contexts/PregnancyContext';
import { resetUserPassword } from '../../actions/userActions';
import { paths } from '../../helpers/paths';
import { Eye, EyeOff, Lock } from 'lucide-react';

const ResetPassword= () =>{
    const {dispatch, errorsOrMessages: errorsOrMsg} = useContext(PregnancyContext)
    const [searchParams] = useSearchParams();
    const code = searchParams?.get('security_code')
    const [showPassword, setShowPassword] = useState(false);
    const [ShowConfirmPassword,setShowConfirmPassword] =  useState(false)
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
              <div className="auth-container"> 
                  <form onSubmit={handleOnSubmit}  className="auth-form change-password"> 
                     <div className="inputs-container">
                        <div>
                          <label>New Password:</label>
                          <div className='password-input-container'>
                            <Lock className="password-lock" />
                            <input onChange={handleOnChange} value={user.password}className="password-input" type={showPassword? "text":"password"} name="password" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-eye">
                              {showPassword ? <EyeOff className="eye" /> : <Eye className="eye" />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label>Confirm Password:</label>
                          <div className='password-input-container'>
                            <Lock className="password-lock" />
                            <input onChange={handleOnChange}  value={user.password_confirmation}className="password-input" type={ShowConfirmPassword ?"text" :"password"} name="password_confirmation" />
                            <button type="button" onClick={() => setShowConfirmPassword(!ShowConfirmPassword)} className="password-eye">
                              {ShowConfirmPassword ? <EyeOff className="eye" /> : <Eye className="eye" />}
                            </button>
                          </div>
                        </div>

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