import { useContext, useEffect,  useState } from "react"
import { Activity, History, Target, Timer, X } from "lucide-react"
import { getFrequency, last4Items } from "../helpers/arrayHelpers"
import { isLoginSessionActive } from "../helpers/token"
import { getFetchActions, patchFetchAction, postFetchAction } from "../actions/fetchings"
import { paths } from "../helpers/paths"
import { ACTIONS_TYPES } from "../actions/actionsHelpers"
import { calculateTime, changeTimeFormat, formatTime, getCurrentTime } from "../helpers/date"
import LoadingItems from "../components/LoadingItems"
import CountUpTimer from "../components/CountUpTimer"
import BHCtr from "../components/bHCtx/BHCtr"
import { PregnancyContext } from "../contexts/PregnancyContext"

const BHCtxContainer = ({preg}) => {
  const {id} = preg
  const {errorsOrMessages,dispatch, bhctr, bhctx, bhctrLoading } = useContext(PregnancyContext)
  const [showBHCtx, setShowBHCtx] = useState(false)
  const {completed, created_at } = bhctr
  const frequency = getFrequency(bhctx)
  let hasFetched = false

  useEffect(()=>{ 
    if(hasFetched) return
    isLoginSessionActive() && getFetchActions({
        path: paths().bhctxPath, 
        dispatch: dispatch,
        query_string: id, 
        actions: {
            actionType: ACTIONS_TYPES.addBhctx,
            loading: ACTIONS_TYPES.fetchBhctxStart
        }
    })
    hasFetched = true
  },[dispatch])

  const handleOnClick = (e) =>{

    if(!bhctr.id || bhctr.id && bhctr.completed)
        postFetchAction({
            payload: {
                pregnancy_id: id,
                duration: "0:0:0"
            }, 
            path: `${paths().bhctxPath}`, 
            dispatch: dispatch, 
            actions: {
                actionType: ACTIONS_TYPES.addBhctx,
                loading: ACTIONS_TYPES.fetchBhctrStart
            }
        })
    else 
        patchFetchAction({
            payload: {
              pregnancy_id: id, 
              completed: true,
              date: getCurrentTime(),
              duration: calculateTime(bhctr.created_at,getCurrentTime())
            }, 
            path: `${paths().bhctxPath}/${bhctr?.id}`, 
            dispatch: dispatch, 
            actions: {
              actionType: ACTIONS_TYPES.editOrRemoveBhctr,
              loading: ACTIONS_TYPES.fetchBhctrStart
            } 
        })
}
    return(
        <div className="mt-20   rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/20">
            <div className="h-16">
              {bhctrLoading && <LoadingItems/>}
              {errorsOrMessages?.from === 'create_bhctx' || errorsOrMessages?.from === 'edit_bhctx' ? (<ErrorsOrMsg errors={errorsOrMessages?.errors} msg={errorsOrMessages.msg}/>) : null}
            </div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                  <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-800">Braxton Hicks contractions </h2>
                </div>
              </div>

                <div className="flex items-center gap-2">
                    {bhctx?.length > 0 && <button
                    onClick={() => setShowBHCtx(true)}
                    className="p-2 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg transition-colors"
                    >
                    <History className="w-4 h-4" />
                    </button>}

                    <button
                    onClick={handleOnClick}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    bhctr.id && !completed
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                    >
                      {bhctr.id && !completed ? 'Stop' : 'Start'} Session
                    </button>
                </div>  
            </div>
            <div className="h-36 bg-amber-50 rounded-xl p-4 text-center">
              {<div className="h-26 bg-amber-50 rounded-xl p-4 text-center">
                  <div className="flex items-center gap-2 justify-center mb-2">
                      <Timer className="w-4 h-4 text-amber-600" />
                      <span className="text-sm text-gray-600">Last measured </span>
                  </div>
                  {bhctr.id && !completed && !bhctrLoading && <CountUpTimer  dateTime={created_at}/>}
                  {bhctr.id && <p className="text-2xl font-bold text-amber-600">{formatTime(created_at)}</p>}
              </div>}
            </div>

            {bhctx?.length > 0 && <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="flex items-center gap-2 justify-center mb-2">
                <Target className="w-4 h-4 text-green-600" />
              </div>
              {<p className="text-1xl text-green-500 mt-1">frequency Average </p> }
              <p className="text-1xl font-bold text-amber-600"> {last4Items(bhctx)}</p>  
            </div>}

            {showBHCtx && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-md w-full max-h-[80vh] overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <History className="w-5 h-5 text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Braxton Hicks contractions History</h2>
                  </div>
                  <button
                  onClick={() => setShowBHCtx(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="overflow-y-auto max-h-96">
                 
                  {bhctx.map((session,index) => {
                    return (
                      <div key={session.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <BHCtr session={session}></BHCtr>
                          {typeof frequency[index] !== 'undefined' && <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Target className="w-3 h-3 text-green-600" />
                              <span className="text-green-600 font-medium">{session.movements} Frequency</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Timer className="w-3 h-3 text-blue-600" />
                              {typeof frequency[index] !== 'undefined' && <span className="text-blue-600"> {changeTimeFormat(frequency[index])}</span>}
                            </div> 
                          </div>}
                      </div>
                  )
                  })}
            </div>
            {bhctx?.length > 4 && <div className="p-4 bg-gray-50 text-center">
            </div>}
        </div>
        </div>}
      </div>
    )
}

export default BHCtxContainer