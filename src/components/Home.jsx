import { useContext} from "react"
import { PregnancyContext } from "../contexts/PregnancyContext"
import PregnanciesContainer from "../containers/PregnanciesContainer"
import CountUpTimer from "./CountUpTimer"
// import CountdownDemo from "./CountdownDemo"


const Home = () => {
    const {userPayload} = useContext(PregnancyContext)
    const {user} = userPayload
    return (
        <div className="pink flex-column center">

           <h3>{ `Welcome ${user?.first_name}`}</h3>
           <p>Your pregnancy journey, beautiffully tracked</p>
           <PregnanciesContainer/>
        </div>
    )
}
export default Home