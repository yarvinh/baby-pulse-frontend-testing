import { ERRORS, FETCH_ERROR } from "../helpers/errors"


export const ACTIONS_TYPES = {
    fetchUserSart: 'FETCH_USER_START',
    fetchPregnancyStart: 'FETCH_PREGNANCY_START',
    fetchPregnanciesStart: 'FETCH_PREGNANCIES_START',
    addUser: 'ADD_USER',
    addPregnancy: 'ADD_PREGNANCY',
    addErrorsOrMessages: 'ADD_ERRORS_OR_MESSAGES', 
    addPregnancies: "ADD_PREGNANCIES"
}


export const handleDataHelper = async ({dispatch,response,actionType}) =>{
    const ct = response.headers.get('content-type') || ''
    const isJson = ct.includes('application/json')
    if(!response.ok && !isJson) throw new Error(JSON.stringify(ERRORS))
    if(!response.ok) throw new Error(await response.text())
    const data =  await response.json()
    const {errors_or_messages} = data
    if(data.token?.access_token) localStorage.setItem('access_token', data.token?.access_token)
    if(response.ok && errors_or_messages) dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: errors_or_messages})
    dispatch({type: actionType, payload: data})
  }

export const handleErrors = (error,dispatch)=>{
    if (error.name === "Error"){
      const err = JSON.parse(error.message)
      dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: err.errors_or_messages})
    } else {
      dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: FETCH_ERROR})
    }
  }
