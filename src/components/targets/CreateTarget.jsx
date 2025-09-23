import { useContext, useState } from "react";
import {Target, X } from "lucide-react";
import { paths } from "../../helpers/paths";
import { PregnancyContext } from "../../contexts/PregnancyContext";
import { ACTIONS_TYPES } from "../../actions/actionsHelpers";
import ErrorsOrMsg from "../ErrosOrMsg";
import { postFetchAction } from "../../actions/fetchings";

const CreateTarget = ({preg ,setShowTarget}) => {
  const {dispatch, errorsOrMessages} = useContext(PregnancyContext)
  const [target , setTarget] = useState({
        week: 0,
        pregnancy_id: preg.id
    })

    const handleOnChange = (e) =>  {
        setTarget({
            ...target,
            week: e.target.value
        })
    }

    const handleOnSubmit = (e)=>{
        e.preventDefault()
        postFetchAction({
            payload: {target}, 
            path: `${paths().targetPath}`, 
            dispatch: dispatch, 
            actions: {
                actionType: ACTIONS_TYPES.addTarget,
                loading: ACTIONS_TYPES.fetchTargetStart
            }
        })
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 justify-center mb-2">
              <Target className="w-4 h-4 text-red-600" />
              <h2 className="text-xl font-bold text-gray-800"> Create new Target</h2> 
            </div>
          </div>

          {<button
            onClick={() => setShowTarget(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>}
        </div>
        
        <div className="p-6">
          <div className="h-8 mb-5">
            {errorsOrMessages?.from === 'create_target' && (<ErrorsOrMsg errors={errorsOrMessages?.errors} msg={errorsOrMessages?.msg}/>)} 
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              This week will be your target
            </label>
            <input
              type="number"
              valxue={target.week}
              onChange={handleOnChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowTarget(false)}
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


export default CreateTarget