import { useContext } from "react"
import { Outlet } from "react-router"
import { Link } from 'react-router-dom'
import { PregnancyContext } from "../contexts/PregnancyContext"
import { fetchLogOut } from "../actions/userActions"
import { isLoginSessionActive } from "../helpers/token"
import { House, LogOut } from "lucide-react"

const Layout = () => {

    const {dispatch, userPayload} = useContext(PregnancyContext)
    const { is_login: isLogin} = userPayload;
    const {user} = userPayload
    const handleOnClick = (e) =>{
        fetchLogOut({dispatch: dispatch})
    }

    return (
        <div>
            <nav className="nav-bar">
                <ul className="nav-ul">
                    <li>
                        <Link to="/" className="h-9 p-2 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-lg transition-colors flex items-center justify-center"> 
                          <House className="w-6 h-6 sm:w-6 sm:h-6 text-rose-600    text-rose-700 hover:text-rose-600 rounded-lg transition-colors" />
                        </Link>
                    </li>

                    {!isLogin && !isLoginSessionActive() && <li>
                         {/* <Link to={`users/${user?.id}`} className="h-100">Settings</Link> */}
                        <Link to="sign_up"  className=" w-6 h-10 sm:w-10 sm:h-10 text-rose-600 p-2 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-lg transition-colors">Sign up</Link>
                    </li>}
                    {!isLogin && !isLoginSessionActive() && <li>
                        <Link to="login"  className=" w-6 h-10 sm:w-10 sm:h-10 text-rose-600 p-2 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-lg transition-colors">Log in</Link>
                    </li>}
                    {isLogin && isLoginSessionActive() && <li>
                        <Link to={`users/${user?.id}`} className=" w-6 h-10 sm:w-10 sm:h-10 text-rose-600 p-2 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-lg transition-colors">Settings</Link>
                    </li>}
                    {isLoginSessionActive() &&<li onClick={handleOnClick}>
                        
                        <button onClick={handleOnClick} 
                            className="h-9 p-2 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-lg transition-colors flex items-center justify-center">
                              <LogOut className="w-6 h-6 sm:w-6 sm:h-6 text-rose-600 text-rose-700 hover:text-rose-600 rounded-lg transition-colors"/>  
                        </button>
                    </li>}
                    <li>
                        <p className="text-rose-600 text-base sm:text-lg px-4">Welcome back{`${user?.first_name ? `, ${user?.first_name}` : ""}`}! </p>
                    </li>

                </ul>
            </nav>
           <Outlet/>
        </div>
    )
}

export default Layout