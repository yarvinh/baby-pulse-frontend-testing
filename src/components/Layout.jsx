import { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import { Link} from 'react-router-dom'
import { PregnancyContext } from "../contexts/PregnancyContext"
import { fetchLogOut } from "../actions/userActions"
import { isLoginSessionActive } from "../helpers/token"

const Layout = () => {
    const navigate = useNavigate()
    const {dispatch, userPayload,errorsOrMessages, state} = useContext(PregnancyContext)
    const { is_login: isLogin, verification_session } = userPayload;
    const handleOnClick = (e) =>{
        fetchLogOut({dispatch: dispatch})
    }
   
    useEffect(()=>{
        !isLoginSessionActive() && !isLogin && navigate('/login')
      },[isLogin])

    return (
        <div>
            <nav className="nav-bar">
                <ul className="nav-ul">
                    {!isLogin && !isLoginSessionActive() && <li>
                        <Link to="sign_up">Sign up</Link>
                    </li>}
                    {!isLogin && !isLoginSessionActive() && <li>
                        <Link to="login">Log in</Link>
                    </li>}
                    {isLoginSessionActive() &&<li>
                        <button onClick={handleOnClick}>Log out</button>
                    </li>}
                </ul>
            </nav>
           <Outlet/>
        </div>
    )
}

export default Layout