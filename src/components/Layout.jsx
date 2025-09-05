import { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import { Link} from 'react-router-dom'
import { PregnancyContext } from "../contexts/PregnancyContext"
import { fetchLogOut } from "../actions/userActions"
import { isLoginSessionActive } from "../helpers/token"

const Layout = () => {

    const navigate = useNavigate()
    const {dispatch, userPayload} = useContext(PregnancyContext)
    
    const { is_login: isLogin} = userPayload;
    const {user} = userPayload
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
                        <button onClick={handleOnClick} className="p-2 text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition-colors">Log out</button>
                    </li>}
                    <li>
                        <p className="text-gray-600 text-base sm:text-lg px-4">Welcome back{`${user?.first_name ? `, ${user?.first_name}` : ""}`}! </p>
                    </li>
                </ul>
            </nav>
           <Outlet/>
        </div>
    )
}

export default Layout