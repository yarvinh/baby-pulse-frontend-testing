
import { useContext, useEffect, useState } from 'react';
import { PregnancyContext } from '../contexts/PregnancyContext';
import { getFetchActions, postFetchAction } from '../actions/fetchings';
import { paths } from '../helpers/paths';
import { ACTIONS_TYPES } from '../actions/actionsHelpers';
import Pregnancy from "../components/pregnancies/Pregnancy"
import SetOrEditPregnancy from "../components/pregnancies/SetOrEditPregnancy"
import { isLoginSessionActive } from '../helpers/token';
import ErrorsOrMsg from '../components/ErrosOrMsg';
import LoadingItems from '../components/LoadingItems'
import { useNavigate } from 'react-router';

const PregnanciesContainer = ()=> {
    const navigate = useNavigate()
    const [showDueDate,setShowDueDate] = useState(false)
    const [defaulLoading, setDefaultLoading] = useState(true)
    const {dispatch,pregnancies,errorsOrMessages,pregnanciesLoading, userPayload} = useContext(PregnancyContext)
    const { is_login: isLogin, user} = userPayload;

    let hasFetched = false

    useEffect(()=>{
        !isLoginSessionActive() && !isLogin && navigate('/login')
    },[isLogin])

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
        setDefaultLoading(false)
        hasFetched = true
    },[dispatch])

    useEffect(()=>{
       !defaulLoading && !pregnanciesLoading && pregnancies.length < 1 && setShowDueDate(true)
    },[pregnanciesLoading])

    return (
        <div className="pink flex-column center">
             <p className="text-rose-600 text-base sm:text-lg px-4">Welcome back{`${user?.first_name ? `, ${user?.first_name}` : ""}`}! </p>
        <p className="text-gray-600 text-base sm:text-lg px-4">
           Your pregnancy journey continues beautifully
        </p>
        { !defaulLoading && !pregnanciesLoading && pregnancies.length < 1 && <button 
            onClick={() => setShowDueDate(true)}
            className="text-rose-700 hover:bg-rose-200 rounded-lg transition-colors mt-2 mb-2"
            >
               Create New Pregnancy 
            </button>}
        <div className="mt-10">
           {errorsOrMessages?.from === 'server' && (<ErrorsOrMsg errors={errorsOrMessages?.errors} msg={errorsOrMessages?.msg}/>)} 
        </div>
        {pregnanciesLoading && <LoadingItems/>}
        <div className="standar-border due-date-container">
            <div className="space-y-4 sm:space-y-6"></div>
            <ul>
                {pregnancies?.map(preg => 
                <li key={preg.id}>
                    <Pregnancy pregnancy = {preg} />
                </li>)}
            </ul>
            { showDueDate ? <SetOrEditPregnancy   fetchActions={postFetchAction} setShowDueDate={setShowDueDate}/> : null}
        </div>
    </div>
    )
}

export default PregnanciesContainer