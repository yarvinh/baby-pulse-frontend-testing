export const token = (dataType = "")=>{
    const access_token = localStorage.getItem('access_token')
    const refresh_token = localStorage.getItem('refresh_token')
  
    const header = {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${access_token} ${refresh_token && refresh_token}`
    }
    if (dataType.length > 0)
        header["Content-type"] = dataType
    return header
}

export const verificationToken = ()=>{
    const token = localStorage.getItem('token')
    return {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
}


export const isLoginToken = ()=>{
  if (!!localStorage.getItem('access_token') && !!localStorage.getItem('refresh_token'))
    return true

}

export const verificationSessionToken=()=>{
  return !!localStorage.getItem('token')
}

export const removeLoginToken = ()=>{
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}
export const setLoginToken = (data) => {
  localStorage.setItem('token', data.token?.token)
  localStorage.setItem('secret_key', data.token?.secret_key)
}

export const isLoginSessionActive = () => {
  return !!localStorage.getItem('access_token')
}