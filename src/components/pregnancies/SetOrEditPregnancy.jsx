import { useContext, useState } from "react";
import {  date, daysWeeksMath } from "../../helpers/date";
import { Calendar, X } from "lucide-react";
import { paths } from "../../helpers/paths";
import { PregnancyContext } from "../../contexts/PregnancyContext";
import { ACTIONS_TYPES } from "../../actions/actionsHelpers";
import ErrorsOrMsg from "../ErrosOrMsg";

const SetOrEditPregnancy = ({fetchActions, pregnancy: preg ,setShowDueDate,edit}) => {
  const {weeksRe} = daysWeeksMath(preg?.due_date,40)
  const {dispatch, errorsOrMessages} = useContext(PregnancyContext)
  const [pregnancy , setPregnancy] = useState({
        due_date: ""
    })

    const handleOnChange = (e) =>  {
        setPregnancy({
            ...pregnancy,
            due_date: e.target.value
        })
    }

    const handleOnSubmit = (e)=>{
        e.preventDefault()
        fetchActions({
            payload: {pregnancy}, 
            path: `${paths().pregnancyPath}${preg ? `/${preg.id}` : ""}`, 
            dispatch: dispatch, 
            actions: {
                actionType: edit ? ACTIONS_TYPES.editOrRemovePregnancy : ACTIONS_TYPES.addPregnancies,
                loading: ACTIONS_TYPES.fetchPregnanciesStart
            }
        })
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-100 rounded-full">
              <Calendar className="w-5 h-5 text-rose-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{edit ? "Edit Due Date" : "Create new Pregnancy"}</h2> 
          </div>
          {edit && <button
            onClick={() => setShowDueDate(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>}
        </div>
        
        <div className="p-6">
          <div className="h-8 mb-5">
            {errorsOrMessages?.from === 'edit_pregnancy' && (<ErrorsOrMsg errors={errorsOrMessages?.errors} msg={errorsOrMessages?.msg}/>)} 
            {errorsOrMessages?.from === 'create_pregnancy' && (<ErrorsOrMsg errors={errorsOrMessages?.errors} msg={errorsOrMessages?.msg}/>)} 
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Due Date
            </label>
            <input
              type="date"
              valxue={pregnancy.due_date}
              onChange={handleOnChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>
          
          {edit && <div className="bg-rose-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Due Date:</span> {date(preg?.due_date,true)}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              <span className="font-medium">Weeks Remaining:</span> {weeksRe} weeks
            </p>
          </div>}
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowDueDate(false)}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={ handleOnSubmit}
              className="flex-1 px-4 py-3 bg-rose-500 text-white rounded-xl font-medium hover:bg-rose-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default SetOrEditPregnancy