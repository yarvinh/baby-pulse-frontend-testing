import { useContext} from "react";
import { ACTIONS_TYPES } from "../../actions/actionsHelpers";
import { paths } from "../../helpers/paths";
import { PregnancyContext } from "../../contexts/PregnancyContext";
import { patchFetchAction, postFetchAction } from "../../actions/fetchings";
import { calculateTime, getCurrentTime } from "../../helpers/date";
import { useEffect } from "react";

const CreateKickSession = ({kick_session, pregnancy_id})=>{
    const {session_complete: isTracking} = kick_session
    const { setIsRunning} = useContext(PregnancyContext)
    const {dispatch} = useContext(PregnancyContext)

    const handleOnClick = (e) =>{
        if(!isTracking)
            postFetchAction({
                payload: {
                    pregnancy_id: pregnancy_id,
                    duration: "0:0:0"
                }, 
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
                    pregnancy_id: pregnancy_id, 
                    session_complete: false,
                    time: getCurrentTime(),
                    duration: calculateTime(kick_session.created_at, kick_session.updated_at)
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
        if (isTracking) return setIsRunning(false);
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