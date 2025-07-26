import { useContext } from "react"
import { PregnancyContext } from "../contexts/PregnancyContext"

const Home = () => {
    const {userPayload} = useContext(PregnancyContext)
    const {user} = userPayload
    return (
        <div >
           <h3>{ `Welcome ${user?.first_name}`}</h3>
        </div>
    )
}
export default Home