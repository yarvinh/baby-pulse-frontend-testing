import { Clock, Target, Timer } from "lucide-react"
import CountUpTimer from "../CountUpTimer"
import MovementCount from "./MovementCount"
import { calculateTime,  changeTimeFormat,  formatTime} from "../../helpers/date"

const KickCounterDisplay = ({kick_sessions}) => {
  const kick_session = kick_sessions?.at(0) || {}
  const {session_complete: isKickSessionTracking, movements, created_at, time, updated_at} = kick_session
    return (
        <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 text-center">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium text-base sm:text-lg">Movements</span>
                  </div>
                  <MovementCount kick_session={kick_session}/>
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-2">
                  <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                    {movements > 0 ? movements : 0}/10
                  </p>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((movements / 10) * 100, 100)}%` }}
                  ></div>
                </div>
                
                {kick_sessions.length > 0 && <p className="text-sm text-gray-600">
                  {kick_session?.movements > 9 ? 'Target reached!' : `${10 - movements} more to go`}
                </p>}
              </div>

              <div className="space-y-4">
                {isKickSessionTracking && (
                  <div className="bg-amber-50 rounded-xl p-4 text-center">
                    <div className="flex items-center gap-2 justify-center mb-2">
                      <Timer className="w-4 h-4 text-amber-600" />
                      <span className="text-sm text-gray-600">Current Session</span>
                    </div>

                    {isKickSessionTracking && <CountUpTimer dateTime={created_at}/>}

                    <p className="text-2xl font-bold text-amber-600">{formatTime(created_at)}</p>
                  </div>
                )}
                 
                  {kick_sessions?.length > 0 && <div className="bg-green-50 rounded-xl p-4 text-center">
                    <div className="flex items-center gap-2 justify-center mb-2">
                      <Target className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">{movements} Movements Reached</span>
                    </div>
                    <p className="text-lg font-bold text-green-600">in {kick_session?.duration ? changeTimeFormat(kick_session.duration)  : calculateTime(created_at,updated_at)}</p>
                    <p className="text-xs text-green-500 mt-1">Last measured </p>
                  </div>}
               
                {!isKickSessionTracking && (
                  <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <div className="flex items-center gap-2 justify-center mb-3">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span className="text-base font-medium text-gray-700">Ready to Track</span>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">Start a session to begin timing your baby's movements</p>
                    <div className="bg-white rounded-lg p-4 border-2 border-dashed border-gray-200">
                      <p className="text-xs text-gray-400">Tap "Start Session" above to begin counting movements</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
    )
}


export default KickCounterDisplay