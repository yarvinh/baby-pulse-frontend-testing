import { ERRORS, FETCH_ERROR } from "../helpers/errors"


export const ACTIONS_TYPES = {
    fetchUserSart: 'FETCH_USER_START',
    fetchPregnancyStart: 'FETCH_PREGNANCY_START',
    fetchPregnanciesStart: 'FETCH_PREGNANCIES_START',
    editOrRemovePregnancy: "EDIT_OR_REMOVE_PREGNANCY",
    fetchKickSessionStart: 'FETCH_KICK_SESSION_START',
    addUser: 'ADD_USER',
    addPregnancy: 'ADD_PREGNANCY',
    addErrorsOrMessages: 'ADD_ERRORS_OR_MESSAGES', 
    addPregnancies: "ADD_PREGNANCIES",
    addKickSession: "ADD_KICK_SESSION",
    editOrRemoveKickSession: "EDIT_OR_REMOVE_KICK_SESSION",

}


export const handleDataHelper = async ({dispatch,response,actionType}) =>{
    const ct = response.headers.get('content-type') || ''
    const isJson = ct.includes('application/json')
    if(!response.ok && !isJson) throw new Error(JSON.stringify(ERRORS))
    if(!response.ok) throw new Error(await response.text())
    const data =  await response.json()
    const {msgs} = data
    if(data.token?.access_token) localStorage.setItem('access_token', data.token?.access_token)
    if(msgs){
      dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: msgs})
      dispatch({type: actionType, payload: data.data})
    } else {
      dispatch({type: actionType, payload: data})
    }
  }

export const handleErrors = (error,dispatch)=>{
    if (error.name === "Error"){
      const err = JSON.parse(error.message)
      dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: err.errors_or_messages})
    } else {
      dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: FETCH_ERROR})
    }
  }
