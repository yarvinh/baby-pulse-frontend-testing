import {useContext, useState} from 'react';
import ErrorsOrMsg from '../ErrosOrMsg';
import { recoveryPassword } from '../../actions/userActions';
import { PregnancyContext } from '../../contexts/PregnancyContext';
import { paths } from '../../helpers/paths';

const ForgotPassword = () =>{
  const {dispatch, userPayload, errorsOrMessages: errorsOrMsg} = useContext(PregnancyContext)
  const { is_login: isLogin,verification_session} = userPayload;
    const [user, setUser] = useState({
      username: ""
    })
    const handleOnChange = (e)=>{
      setUser({
       ...user,[e.target.name]: e.target.value
      })
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        recoveryPassword({dispatch: dispatch ,username: user.username, path: paths().passwordRecovery})
    }
    
    return (
        <section>
            <div className="email-container">
                <form onSubmit={handleOnSubmit} className="verify_email">
                  <div className="inputs-container">
                    <label >Enter your username:</label >
                    <input  onChange={handleOnChange} className="verify-email-input" value={user.username} name="username" type='text'/> <br/>
                    <button className="verify-email-button" type='submit' >Submit</button>
                  </div>
                  <div className="center"> 
                    {errorsOrMsg.from === 'set_password_session' && <ErrorsOrMsg errors={errorsOrMsg?.errors} msg={errorsOrMsg?.msg}/>}
                  </div>
                </form>   
            </div> 
        </section>
    )
}
      
export default ForgotPassword