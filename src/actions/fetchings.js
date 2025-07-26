import { baseUrl } from "../helpers/authHelpers"
import { token } from "../helpers/token"
import { ACTIONS_TYPES } from "./actionsHelpers"

export const getFetchAction = async ({path, dispatch, reducer, query_string}) => { 
          try {
              dispatch({type: ACTIONS_TYPES.fetchUserSart})
              const response = await fetch(`${baseUrl()}${path}${query_string ? "?query_string=" + query_string : ""}`,{
                method: "GET", 
                headers: token(), 
                withCredentials: true
              })  
              if(!response.ok) throw new Error(await response.text())
              const data = await response.json()
              if(data.token?.access_token)
                localStorage.setItem('access_token', data.token?.access_token)
                dispatch({type: ACTIONS_TYPES.addUser, payload: data})
                dispatch(data)
          } catch (error){
            const errors = JSON.parse(error.message) 
            dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: errors})
          }
  }