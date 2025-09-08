
import { useContext, useEffect, useState } from 'react';
import { PregnancyContext } from '../contexts/PregnancyContext';
import { getFetchActions, postFetchAction } from '../actions/fetchings';
import { paths } from '../helpers/paths';
import { ACTIONS_TYPES } from '../actions/actionsHelpers';
import Pregnancy from "../components/pregnancies/Pregnancy"
import SetOrEditPregnancy from "../components/pregnancies/SetOrEditPregnancy"
import { isLoginSessionActive } from '../helpers/token';
import { checkForDuePreg } from '../helpers/arrayHelpers';
import ErrorsOrMsg from '../components/ErrosOrMsg';

const PregnanciesContainer = ()=> {
    const [showDueDate,setShowDueDate] = useState(false)
    const {dispatch,pregnancies,errorsOrMessages} = useContext(PregnancyContext)
    let hasFetched = false
    useEffect(()=>{ 
        if(hasFetched) return
        isLoginSessionActive() && getFetchActions({
            path: paths().pregnancyPath, 
            dispatch: dispatch,
            actions: {
                actionType: ACTIONS_TYPES.addPregnancies,
                loading: ACTIONS_TYPES.fetchPregnanciesStart
            }
        })
        hasFetched = true
    },[dispatch])

    return (
        <div className="pink flex-column center">
        <p className="text-gray-600 text-base sm:text-lg px-4">
           Your pregnancy journey continues beautifully
        </p>
        <div className="mt-10">
           {errorsOrMessages?.from === 'server' && (<ErrorsOrMsg errors={errorsOrMessages?.errors} msg={errorsOrMessages?.msg}/>)} 
        </div>

        <div className="standar-border due-date-container">
            <div className="space-y-4 sm:space-y-6"></div>
            {checkForDuePreg(pregnancies) && <button 
            onClick={() => setShowDueDate(true)}
            className="text-rose-700 hover:bg-rose-200 rounded-lg transition-colors mt-2 mb-2"
            >
               Create New Pregnancy 
            </button>}
            <ul>
                {pregnancies?.map(preg => 
                <li key={preg.id}>
                    <Pregnancy pregnancy = {preg} />
                </li>)}
            </ul>
            {showDueDate || pregnancies.length < 1? <SetOrEditPregnancy   fetchActions={postFetchAction} setShowDueDate={setShowDueDate}/> : null}
        </div>
    </div>
    )
}

export default PregnanciesContainer