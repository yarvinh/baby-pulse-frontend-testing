import { Activity, Clock, History, Plus, Target, Timer } from "lucide-react"
import { useState } from "react";
import CreateKickSession from "../components/pregnancies/CreateKickSession";
import { postFetchAction } from "../actions/fetchings";
import MovementCount from "../components/pregnancies/MovementCount";
import { calculateTime, formatTime } from "../helpers/date";
import CountUpTimer from "../components/CountUpTimer";
import { findLastCreatedItem } from "../helpers/arrayHelpers";

const TrackingHistoryContainer = ({preg,setShowHistory}) => {
  const kick_session = findLastCreatedItem(preg.kick_sessions)
  console.log(kick_session)
  // const kick_session = preg.kick_sessions?.at(-1)
  const isTracking = kick_session?.session_complete

  // const [movements, setMovements] = useState(3)
  // const [startTime, setStartTime] = useState(null)
  // const [elapsedTime, setElapsedTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false);

  const [completionTime, setCompletionTime] = useState("45 minutes")

    return(
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/20">
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
                {preg?.kick_sessions?.length > 0 && <button
                  onClick={() => setShowHistory(true)}
                  className="p-2 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg transition-colors"
                >
                  <History className="w-4 h-4" />
                </button>}
                <CreateKickSession preg={preg} fetchActions={postFetchAction} isTracking={isTracking} setIsRunning={setIsRunning}/>
              </div>
            </div>

            <div className="space-y-4">
              {/* Movement Counter */}
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 text-center">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium text-base sm:text-lg">Movements</span>
                  </div>
                  <MovementCount preg={preg}/>
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-2">
                  <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                    {/* {movements} */}
                  </p>
                  <span className="text-2xl text-gray-400 font-light">{kick_session?.movements}/10</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((kick_session?.movements / 10) * 100, 100)}%` }}
                  ></div>
                </div>
                
                <p className="text-sm text-gray-600">
                  {kick_session?.movements === 10 ? 'Target reached!' : `${10 - kick_session?.movements} more to go`}
                </p>
              </div>

              {/* Timer Display and Results - Full Width Layout */}
              <div className="space-y-4">
                {isTracking && isTracking &&(
                  <div className="bg-amber-50 rounded-xl p-4 text-center">
                    <div className="flex items-center gap-2 justify-center mb-2">
                      <Timer className="w-4 h-4 text-amber-600" />
                      <span className="text-sm text-gray-600">Current Session</span>
                    </div>
                    {isTracking && <CountUpTimer kickSession={kick_session} setIsRunning={setIsRunning}  isRunning={isRunning} isTracking={isTracking}/>}
                    <p className="text-2xl font-bold text-amber-600">{formatTime(kick_session.created_at)}</p>
                  </div>
                )}

                {completionTime && (
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <div className="flex items-center gap-2 justify-center mb-2">
                      <Target className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">{kick_session?.movements} Movements Reached</span>
                    </div>
                    <p className="text-lg font-bold text-green-600">in {kick_session && calculateTime(kick_session.created_at)}</p>
                    <p className="text-xs text-green-500 mt-1">Last measured </p>
                  </div>
                )}

                {!kick_session?.session_complete && (
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
          </div>

    )
}

export default TrackingHistoryContainer