import { Plus } from "lucide-react";
import { useContext } from "react";
import { PregnancyContext } from "../../contexts/PregnancyContext";
import { paths } from "../../helpers/paths";
import { ACTIONS_TYPES } from "../../actions/actionsHelpers";
import { patchFetchAction } from "../../actions/fetchings";
import { findLastCreatedItem } from "../../helpers/arrayHelpers";

const MovementCount = ({preg}) => {
    const kick_session = findLastCreatedItem(preg.kick_sessions)
    const isTracking = kick_session?.session_complete
    const {dispatch} = useContext(PregnancyContext)

    const handleMovementCount = (e) => {
      patchFetchAction({
        payload: {
          pregnancy_id: preg.id,
          movements: kick_session.movements + 1,
        }
          , 
        path: `${paths().kickSessions}${isTracking && kick_session? `/${kick_session?.id}` : ""}`, 
        dispatch: dispatch, 
        actions: {
            actionType: ACTIONS_TYPES.addPregnancies,
            loading: ACTIONS_TYPES.fetchPregnanciesStart
        } 
    })
    }

    return (
        <button 
        onClick={handleMovementCount}
        disabled={!isTracking}
        className={`p-3 rounded-full text-white transition-all active:scale-95 shadow-lg ${
          !isTracking 
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600'
        }`}
      >
        <Plus className="w-5 h-5" />
      </button>
    )
}


export default MovementCount