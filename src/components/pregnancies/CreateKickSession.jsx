import { useContext} from "react";
import { ACTIONS_TYPES } from "../../actions/actionsHelpers";
import { paths } from "../../helpers/paths";
import { PregnancyContext } from "../../contexts/PregnancyContext";
import { patchFetchAction, postFetchAction } from "../../actions/fetchings";
import { calculateTime, getCurrentTime } from "../../helpers/date";
import { useEffect } from "react";

const CreateKickSession = ({preg,setIsRunning, isRunning})=>{
    const kick_session = preg.kick_sessions?.at(-1);
    const isTracking = kick_session?.session_complete
    const {dispatch} = useContext(PregnancyContext)

    const handleOnClick = (e) =>{
  
        if(!isTracking)
            postFetchAction({
                payload: {pregnancy_id: preg.id}, 
                path: `${paths().kickSessions}${isTracking && kick_session? `/${kick_session?.id}` : ""}`, 
                dispatch: dispatch, 
                actions: {
                    actionType: ACTIONS_TYPES.addPregnancies,
                    loading: ACTIONS_TYPES.fetchPregnanciesStart
                }
            })
        else 
            patchFetchAction({
                payload: {
                    pregnancy_id: preg.id, 
                    session_complete: false,
                    time: getCurrentTime(),
                    duration: calculateTime(kick_session.created_at)
                }, 
                path: `${paths().kickSessions}${isTracking && kick_session? `/${kick_session?.id}` : ""}`, 
                dispatch: dispatch, 
                actions: {
                    actionType: ACTIONS_TYPES.addPregnancies,
                    loading: ACTIONS_TYPES.fetchPregnanciesStart
                } 
            })
    }

    useEffect(() => {
        isTracking && setIsRunning(true);
    },[isTracking])

   return (
    <button
        onClick={handleOnClick}
        className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
        isTracking
            ? 'bg-red-100 text-red-700 hover:bg-red-200'
            : 'bg-green-100 text-green-700 hover:bg-green-200'
        }`}
    >
        {isTracking ? 'Stop' : 'Start'} Session
    </button>
   )
}


export default CreateKickSession