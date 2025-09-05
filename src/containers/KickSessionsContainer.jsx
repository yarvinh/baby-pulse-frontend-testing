import { Activity, History, X} from "lucide-react"
import CreateKickSession from "../components/kickSessions/CreateKickSession";
import {postFetchAction } from "../actions/fetchings";
import { findLastCreatedItem } from "../helpers/arrayHelpers";
import KickCounterDisplay from "../components/kickSessions/KickCounterDisplay";
import KickSession from "../components/kickSessions/KickSession";
import { getMovementsAverage } from "../helpers/date";
import ErrorsOrMsg from "../components/ErrosOrMsg";
import { useContext } from "react";
import { PregnancyContext } from "../contexts/PregnancyContext";

const KickSessionsContainer = ({preg,setShowHistory, showHistory}) => {
  const {errorsOrMessages} = useContext(PregnancyContext)
  const kick_session = findLastCreatedItem(preg.kick_sessions)
  const {kick_sessions} = preg || []

  const historicalData  = preg.kick_sessions
  
    return(
        <div className="bg-white/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/20">
             {errorsOrMessages?.from === 'create_kick_session' && (<ErrorsOrMsg errors={errorsOrMessages?.errors} msg={errorsOrMessages.msg}/>)}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                  <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-800">Movement Tracker</h2>
                  <p className="text-sm sm:text-base text-gray-600">Count to 10 movements</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {kick_sessions?.length > 0 && <button
                  onClick={() => setShowHistory(true)}
                  className="p-2 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg transition-colors"
                >
                  <History className="w-4 h-4" />
                </button>}
                <CreateKickSession pregnancy_id={preg.id} kick_session={kick_session} fetchActions={postFetchAction} />
              </div>
            </div>
             <KickCounterDisplay kick_sessions={kick_sessions} />
             {/* {showHistory && <HistoryModal  preg={preg} setShowHistory={setShowHistory}/> } */}
            {showHistory && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-md w-full max-h-[80vh] overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <History className="w-5 h-5 text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Movement History</h2>
                  </div>
                  <button
                  onClick={() => setShowHistory(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="overflow-y-auto max-h-96">
                  {historicalData.map((session) => (
                    <div key={session.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <KickSession session={session}/>
                    </div>
                  ))}
            </div>
            
            {historicalData?.length > 4 && <div className="p-4 bg-gray-50 text-center">
            <p className="text-sm text-gray-600">
                Average time to 10 movements: <span className="font-medium text-gray-800">{getMovementsAverage(historicalData)}</span>
            </p>
            </div>}
        </div>
        </div>}
      </div>

    )
}

export default KickSessionsContainer