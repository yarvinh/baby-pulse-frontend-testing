import { createModuleResolutionCache } from "typescript"
import { baseUrl } from "../helpers/authHelpers"
import { paths } from "../helpers/paths"
import { removeLoginToken, token } from "../helpers/token"
import { ACTIONS_TYPES } from "./actionsHelpers"

export const userPostFetchAction = async ({user,path,dispatch}) => {
      try {
        dispatch({type: ACTIONS_TYPES.fetchUserSart})
        const response = await fetch(`${baseUrl()}${path}`,{
          method: "POST", 
          headers: token(),  
          withCredentials: true, 
          body: JSON.stringify({user}) 
        }) 
        if (!response.ok) throw new Error(await response.text())
          const data = await response.json()
        dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: data})
        localStorage.setItem('access_token', data.token)
        dispatch({type: ACTIONS_TYPES.addUser, payload: data})
      } catch (error){
        const errors = JSON.parse(error.message) 
        dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: errors})
      }
  }

export const login = async ({dispatch, user}) => {
    try {
      dispatch({type: ACTIONS_TYPES.fetchUserSart})
      const response = await fetch(`${baseUrl()}${paths().login}`,{
        method: "POST",  headers: token(), 
        withCredentials: true, 
        body: JSON.stringify({user}) 
      })
      if(!response.ok) throw new Error( await response.text())
      const data = await response.json() 

      const msg = data.errors_or_messages
      if (msg && data?.verification_session){
        localStorage.setItem('access_token', data.token)
        dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: data})
      }else{
        localStorage.setItem('access_token', data.token?.access_token)
        localStorage.setItem('refresh_token', data.token?.refresh_token)
      }
      dispatch({type: ACTIONS_TYPES.addUser, payload: data})
    } catch(error) {
      const errors = JSON.parse(error.message) 
      dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: errors})
    }
  }


  export const fetchLogOut = async ({dispatch}) => {
    try{
      dispatch({type: ACTIONS_TYPES.fetchUserSart})
      const response =  await fetch(`${baseUrl()}/logout`,{
        method: "DELETE", 
        headers: token(), 
        withCredentials: true
      })
      if(!response.ok) throw new Error("something went wrong.")
      const data = await response.json()
      removeLoginToken()
      dispatch({type: ACTIONS_TYPES.addUser, payload: data})
    }catch(err){
      const errors = JSON.parse(err.message) 
      dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: errors})
    } 
}

export const verifyEmail = async ({user,dispatch}) => {
    try {
      dispatch({type: ACTIONS_TYPES.fetchUserSart})
      const response = await fetch(`${baseUrl()}${paths().verifyEmail}`, {
        method: "PATCH", 
        withCredentials: true, 
        headers: token(),
        body: JSON.stringify({user})
      })
      if(!response.ok){
        const text = await response.text()
        throw new Error(text)
      }
      const data = await response.json()
      if(data.updated){
        localStorage.removeItem('access_token')
        localStorage.setItem('access_token', data.token?.access_token)
        localStorage.setItem('refresh_token', data.token?.refresh_token)
      }
      dispatch({type: ACTIONS_TYPES.addUser, payload: data})
    }catch (err){
      const errors = JSON.parse(err.message) 
      dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: errors})
    }
  
}


export const requestSecurityCode = async ({dispatch}) => { 
      try { 
        dispatch({type: ACTIONS_TYPES.fetchUserSart})
        const response = await fetch(`${baseUrl()}${paths().requestSecurityCode}`, {
          method: "PATCH",
          headers: token(), 
          withCredentials: true,
          body: JSON.stringify("request_security_code")
        })  
        if(!response.ok) throw new Error(await response.text())
        const data = await response.json()
        if(!data.valid_email && data.token){
          const msg = data.errors_or_messages
          dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: data})
          localStorage.setItem('token', data.token)
        }
        dispatch({type: ACTIONS_TYPES.addUser, payload: data})
      } catch(error) {
        const errors = JSON.parse(error.message) 
        dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: errors})
      }
}


export const recoveryPassword= async ({dispatch, username, path } )=> {
  try{
    dispatch({type: ACTIONS_TYPES.fetchUserSart})
    const response = await fetch(`${baseUrl()}${path}`, {
      method: "POST", 
      withCredentials: true, 
      headers: token(), 
      body: JSON.stringify({username})
    })
    if (!response.ok) throw new Error("Something went wrong")
    const data = await response.json()
    data.errors_or_messages && dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: data})
    if(data.token) localStorage.setItem('access_token', data.token)
    dispatch({type: ACTIONS_TYPES.addUser, payload: data})
  }catch(error){
    const errors = JSON.parse(error.message) 
    dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: errors})
  }
}

export const resetUserPassword = async ({dispatch, user,path}) => {
  try {
    dispatch({type: ACTIONS_TYPES.fetchUserSart})
    const response = await fetch(`${baseUrl()}/${path}`,{
      method: "PATCH",
      withCredentials: true, 
      headers: token(),
      body: JSON.stringify({user})
    })
    if (!response.ok) throw new Error(await response.text())
    const data = await response.json()
    if (data.updated) removeLoginToken()
    data.errors_or_messages && dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: data})
    dispatch({type: ACTIONS_TYPES.addUser, payload: data})
  } catch(error) {
    const errors = JSON.parse(error.message) 
    dispatch({type: ACTIONS_TYPES.addErrorsOrMessages, payload: errors})
  }
}