import { useContext } from "react"
import { changeTimeFormat, date, formatTime } from "../../helpers/date"
import { PregnancyContext } from "../../contexts/PregnancyContext"
import { deleteFetchAction } from "../../actions/fetchings"
import { ACTIONS_TYPES } from "../../actions/actionsHelpers"
import { paths } from "../../helpers/paths"
import { Target, Timer, X } from "lucide-react"

const KickSession = ({session}) => {
    console.log(session)
    const {dispatch} = useContext(PregnancyContext)
    const handleOndeleteSession = (id) => {
        const confirmBox = window.confirm(
            "Are you sure you want to delete this session?"     
        )
        if(confirmBox === true) dispatch(deleteFetchAction({
            dispatch: dispatch, 
            path: `${paths().kickSessions}/${id}`,
            actions: {
                actionType: ACTIONS_TYPES.addPregnancies,
                loading: ACTIONS_TYPES.fetchPregnanciesStart
            } 
        }))  
    }
    return (
        <div className="flex items-center justify-between">
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-800">{date(session.created_at)}</span>
                    <span className="text-sm text-gray-500"> {formatTime(session.created_at)}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                    <Target className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 font-medium">{session.movements} movements</span>
                    </div>
                    <div className="flex items-center gap-1">
                    <Timer className="w-3 h-3 text-blue-600" />
                    <span className="text-blue-600">{changeTimeFormat(session.duration)}</span>
                    </div> 
                </div>
            </div>
            {/* <ChevronRight className="w-4 h-4 text-gray-400" /> */}
            <button 
            onClick={(e)=>handleOndeleteSession(session.id)}
            className="p-1 hover:bg-red-100 rounded-full transition-colors"
            >
            <X  className="w-5 h-5 text-red-500" />
            </button>
        </div>
    )
}

export default KickSession