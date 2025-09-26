import { Plus } from "lucide-react";
import { useContext } from "react";
import { PregnancyContext } from "../../contexts/PregnancyContext";
import { paths } from "../../helpers/paths";
import { ACTIONS_TYPES } from "../../actions/actionsHelpers";
import { patchFetchAction } from "../../actions/fetchings";
import { calculateTime, getCurrentTime} from "../../helpers/date";

const MovementCount = ({kickSession,showAlert,setShowAlert}) => {
    const {pregnancy_id, session_complete: isTracking,updated_at } = kickSession
    const {dispatch} = useContext(PregnancyContext)

    const handleOnCloseSession = (e) => {
        setShowAlert(false)
        patchFetchAction({
          payload: {
              pregnancy_id: pregnancy_id, 
              movements: kickSession.movements,
              session_complete: false,
              time: getCurrentTime(),
              duration: calculateTime({createAtTime: kickSession.created_at, endTime: kickSession.updated_at})
          }, 
          path: `${paths().kickSessions}${isTracking && kickSession? `/${kickSession?.id}` : ""}`, 
          dispatch: dispatch, 
          actions: {
              actionType: ACTIONS_TYPES.editOrRemoveKickSession,
              loading: ACTIONS_TYPES.fetchKickSessionStart
          } 
        })
    }

    const handleMovementCount = (e) => {
        setShowAlert(false)
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
      <div>
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
        { showAlert && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl">
            <div className="p-6">
              <p> Over 20 minutes have passed, or more than double the average time. If you forgot and left this session open, just close it and start fresh to keep the average correct </p>
              <h3 className="mt-10 mb-10 "> Do you want to close the session?</h3>
              <div className="flex gap-3">
                <button
                onClick={handleOnCloseSession}
                className="flex-1 px-4 py-3 bg-rose-500 text-white rounded-xl font-medium hover:bg-rose-600 transition-colors"
                >
                Close Session
                </button>
                                <button
                onClick={ handleMovementCount}
                className="flex-1 px-4 py-3 bg-green-300 text-green-700 hover:bg-green-200 rounded-xl font-medium transition-colors"
                >
                Keep Going
                </button>
              </div>
            </div>
          </div>
        </div>}

      </div>
    )
}


export default MovementCount