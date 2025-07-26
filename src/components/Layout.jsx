import { useContext } from "react"
import { Outlet } from "react-router"
import { Link} from 'react-router-dom'
import { PregnancyContext } from "../contexts/PregnancyContext"
import { fetchLogOut } from "../actions/userActions"

const Layout = () => {
    const {dispatch} = useContext(PregnancyContext)
    const handleOnClick = (e) =>{
        fetchLogOut({dispatch: dispatch})
    }
    return (
        <div >
            <nav>
                <ul>
                    <li>
                        <Link to="sign_up">Sign up</Link>
                    </li>
                    <li>
                        <Link to="login">Log in</Link>
                    </li>
                    <li>
                        <button onClick={handleOnClick}>Log out</button>
                    </li>
                </ul>
            </nav>
           <Outlet/>
        </div>
    )
}

export default Layout