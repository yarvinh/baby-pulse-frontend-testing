import { Baby, PartyPopper, X } from "lucide-react"
import { daysWeeksMath } from "../../helpers/date"
import { paths } from "../../helpers/paths"
import { ACTIONS_TYPES } from "../../actions/actionsHelpers"
import { deleteFetchAction } from "../../actions/fetchings"
import { useContext } from "react"
import { PregnancyContext } from "../../contexts/PregnancyContext"

const WeeksAndDaysCount = ({preg, week, currentDays, currentWeeks}) =>{
    const {week: w, id} = week
    const {dispatch} = useContext(PregnancyContext)
    const {daysRe,weeksRe} = daysWeeksMath(preg.due_date,w)
    const handleOndeleteSession = (e) => {
        const confirmBox = window.confirm(
            "Are you sure you want to remove this target?"     
        )
        if(confirmBox === true) 
          deleteFetchAction({
              dispatch: dispatch, 
              path: `${paths().targetPath}/${id}`,
              actions: {
                  actionType: ACTIONS_TYPES.editOrRemoveTarget,
                  loading: ACTIONS_TYPES.fetchTargetStart
              } 
          })  
    }

    if (currentDays === week.week * 7)
      return (
        <div className="mt-6 bg-green-100 rounded-xl p-3 text-center shadow-xl border border-white/200">
           <p className="gap-4 text-gray-600 flex flex-row items-center"> 
            {`Congratulation, you made it to ${currentWeeks} weeks!`} <Baby className=" sm:w-4 sm:h-4 text-rose-600" />
           </p>
           <div className="flex flex-row items-center justify-center gap-4">
            <PartyPopper className="text-rose-500" />
            <PartyPopper className="text-rose-500"/>
            <PartyPopper className="text-rose-500"/>
           </div>
        </div>
      )
    else
      return (
        <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-rose-50 rounded-xl p-3 text-center">
              <p className="text-lg sm:text-xl font-bold text-rose-600">{weeksRe}</p>
              <p className="text-xs sm:text-sm text-gray-600">Weeks Left Until {w}</p>
            </div>

            <div className="flex bg-pink-50 rounded-xl p-3 text-center">
              <X onClick={handleOndeleteSession} className=" x-location  top-4 w-3 h-3 text-red-500" />
              <div>
                <p className="text-lg sm:text-xl font-bold text-pink-600">{daysRe}</p>
                <p className="text-xs sm:text-sm text-gray-600">Days Left Until {w}</p>
              </div>
            </div>
        </div>
      )
}

export default WeeksAndDaysCount