import PregnanciesContainer from "../containers/PregnanciesContainer"

const Home = () => {
    return (
        <div className="pink flex-column center">
            <p className="text-gray-600 text-base sm:text-lg px-4">
               Your pregnancy journey continues beautifully
            </p>
           <PregnanciesContainer/>
        </div>
    )
}
export default Home