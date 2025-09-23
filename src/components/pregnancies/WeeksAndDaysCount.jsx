import { X } from "lucide-react"
import { daysWeeksMath } from "../../helpers/date"
import { paths } from "../../helpers/paths"
import { ACTIONS_TYPES } from "../../actions/actionsHelpers"
import { deleteFetchAction } from "../../actions/fetchings"
import { useContext } from "react"
import { PregnancyContext } from "../../contexts/PregnancyContext"

const WeeksAndDaysCount = ({preg, week}) =>{
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
    return (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-rose-50 rounded-xl p-3 text-center">
            <p className="text-lg sm:text-xl font-bold text-rose-600">{weeksRe}</p>
            <p className="text-xs sm:text-sm text-gray-600">Weeks Left Until {w}</p>
          </div>

          <div className="flex bg-pink-50 rounded-xl p-3 text-center">
            {/* <button 
            onClick={handleOndeleteSession}
            className=" w-6 h-6 x-location p-1 hover:bg-red-100 rounded-full transition-colors"
            > */}
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