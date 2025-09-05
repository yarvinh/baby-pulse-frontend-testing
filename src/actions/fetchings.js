import { baseUrl } from "../helpers/authHelpers"
import { token } from "../helpers/token"
import { handleDataHelper, handleErrors } from "./actionsHelpers"

  export const getFetchActions = async ({path, dispatch, query_string, actions}) => { 
    const {actionType,loading} = actions
    dispatch({type: loading})
    try {
        const response = await fetch(`${baseUrl()}${path}${query_string ? "?query_string=" + query_string : ""}`,{
          method: "GET", 
          headers: token(), 
          withCredentials: true
        })  
        await handleDataHelper({
          dispatch: dispatch, 
          response: response, 
          actionType: actionType
        })
    } catch (error){
      handleErrors(error, dispatch)
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
        await handleDataHelper({
          dispatch: dispatch, 
          response: response, 
          actionType: actionType
        })
      }catch (error){
        handleErrors(error,dispatch)
      }
  }

  export const patchFetchAction = async ( {path, dispatch, payload, actions}) => {
    const {actionType,loading} = actions
    dispatch({type: loading})
    try {
        const response = await fetch(`${baseUrl()}${path}`, {
          method: "PATCH", 
          headers: token(), 
          credentials: 'include',
          body: JSON.stringify(payload)
        })
        await handleDataHelper({
          dispatch: dispatch, 
          response: response, 
          actionType: actionType
        })
      }catch (error){
        handleErrors(error,dispatch)
      }
  }


  export const deleteFetchAction = async ({path, dispatch,actions}) => { 
    const {actionType,loading} = actions
    dispatch({type: loading})
      try {
        const response = await fetch(`${baseUrl()}${path}`,{
          method: "DELETE",
          headers: token(), 
          withCredentials: true
        })
        handleDataHelper({
          response: response, 
          dispatch,
          actionType: actionType
        })
      } catch(error) {
        handleErrors(err,dispatch)
      }
    
  }




 