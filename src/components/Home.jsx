import { useContext } from "react"
import PregnanciesContainer from "../containers/PregnanciesContainer"
import ErrorsOrMsg from "./ErrosOrMsg"
import { PregnancyContext } from "../contexts/PregnancyContext"

const Home = () => {
    const {errorsOrMessages} = useContext(PregnancyContext)
    return (
        <div className="pink flex-column center">
            <p className="text-gray-600 text-base sm:text-lg px-4">
               Your pregnancy journey continues beautifully
            </p>
            <div className="mt-10">
               {errorsOrMessages?.from === 'server' && (<ErrorsOrMsg errors={errorsOrMessages?.errors} msg={errorsOrMessages?.msg}/>)} 
            </div>
            
           <PregnanciesContainer/>
        </div>
    )
}
export default Home