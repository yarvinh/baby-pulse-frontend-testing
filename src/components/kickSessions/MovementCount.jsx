import { Plus } from "lucide-react";
import { useContext } from "react";
import { PregnancyContext } from "../../contexts/PregnancyContext";
import { paths } from "../../helpers/paths";
import { ACTIONS_TYPES } from "../../actions/actionsHelpers";
import { patchFetchAction } from "../../actions/fetchings";

const MovementCount = ({kickSession}) => {
    const {pregnancy_id, session_complete: isTracking} = kickSession
    const {dispatch} = useContext(PregnancyContext)

    const handleMovementCount = (e) => {
      patchFetchAction({
        payload: {
          pregnancy_id: pregnancy_id,
          movements: kickSession.movements + 1,
        }, 
        path: `${paths().kickSessions}${isTracking && kickSession? `/${kickSession?.id}` : ""}`, 
        dispatch: dispatch, 
        actions: {
          actionType: ACTIONS_TYPES.editOrRemoveKickSession,
          loading: ACTIONS_TYPES.fetchKickSessionStart
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