import { useContext } from "react"
import { Outlet } from "react-router"
import { Link} from 'react-router-dom'
import { PregnancyContext } from "../contexts/PregnancyContext"
import { fetchLogOut } from "../actions/userActions"

const Layout = () => {
    const {dispatch, userPayload,errorsOrMessages} = useContext(PregnancyContext)
    const { is_login: isLogin, verification_session } = userPayload;
    const handleOnClick = (e) =>{
        fetchLogOut({dispatch: dispatch})
    }
    return (
        <div>
            <nav className="nav-bar">
                <ul className="nav-ul">
                    {!isLogin && <li>
                        <Link to="sign_up">Sign up</Link>
                    </li>}
                    {!isLogin && <li>
                        <Link to="login">Log in</Link>
                    </li>}
                    {isLogin && <li>
                        <button onClick={handleOnClick}>Log out</button>
                    </li>}
                </ul>
            </nav>
           <Outlet/>
        </div>
    )
}

export default Layout