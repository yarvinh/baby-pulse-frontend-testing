import { baseUrl } from "../helpers/authHelpers"
import { ERRORS } from "../helpers/errors"
import { token } from "../helpers/token"
import { ACTIONS_TYPES } from "./actionsHelpers"
const FETCH_ERROR = JSON.stringify("Oops, we couldn’t load the data. Please check your internet and try again!")

export const getFetchAction = async ({path, dispatch, query_string}) => { 
          try {
              dispatch({type: ACTIONS_TYPES.fetchUserSart})
              const response = await fetch(`${baseUrl()}${path}${query_string ? "?query_string=" + query_string : ""}`,{
                method: "GET", 
                headers: token(), 
                withCredentials: true
              })  
              if(!response.ok) throw new Error(JSON.stringify(FETCH_ERROR))
              const data = await response.json()
              if(data.token?.access_token)
                localStorage.setItem('access_token', data.token?.access_token)
                dispatch({type: ACTIONS_TYPES.addUser, payload: data})
          } catch (error){
            const errors = JSON.parse(error.message) 
            dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: errors})
          }
  }



  export const getFetchActions = async ({path, dispatch, query_string, actions}) => { 
    const {actionType,loading} = actions
    dispatch({type: loading})
    try {
        const response = await fetch(`${baseUrl()}${path}${query_string ? "?query_string=" + query_string : ""}`,{
          method: "GET", 
          headers: token(), 
          withCredentials: true
        })  
        if(!response.ok) throw new Error(JSON.stringify(FETCH_ERROR))
        const data = await response.json()
        if(data.token?.access_token)
          localStorage.setItem('access_token', data.token?.access_token)
          dispatch({type: actionType, payload: data})
    } catch (error){
      if (error.message){
        const err = JSON.parse(error.message) 
        dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: err})
      } else {
        dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: ERRORS})
      }
    }
}


  export const postFetchAction = async ( {path, dispatch, payload, actions}) => {
    const {actionType,loading} = actions
    dispatch({type: loading})
    try {
        const response = await fetch(`${baseUrl()}${path}`, {
          method: "POST", 
          headers: token(), 
          withCredentials: true, 
          body: JSON.stringify(payload)
        })
        if(!response.ok) throw new Error(JSON.stringify(FETCH_ERROR))
        const data = await response.json()
        dispatch({type: actionType, payload: data})
      }catch (error){
        const err = JSON.parse(error.message) 
        if (err){
          dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: err})
        } else {
          dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: ERRORS})
        }
      }
  }


  export const patchFetchAction = async ( {path, dispatch, payload, actions}) => {
    const {actionType,loading} = actions
    dispatch({type: loading})
    try {
        const response = await fetch(`${baseUrl()}${path}`, {
          method: "PATCH", 
          headers: token(), 
          withCredentials: true, 
          body: JSON.stringify(payload)
        })
        if(!response.ok) throw new Error(JSON.stringify(FETCH_ERROR))
        const data = await response.json()
        dispatch({type: actionType, payload: data})
      }catch (error){
        
        const err = JSON.parse(error.message) 
        console.log(err)
        if (err){
          dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: err})
        } else {
          dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: ERRORS})
        }
      }
  }