
export const ERRORS = {errors_or_messages: {from: "server", errors: ["Something went wrong, please try again later"] }}

export const FETCH_ERROR = {
  from:"server", 
  errors: ["Oops, we couldn’t load the data. Please check your internet and try again!"]
}
  

export const errorsOrganizer = (err) => {
const {errors} = err
const newErrObj = {}
if(errors)
  for (let i = 0; i <= errors.length - 1; i++ ) {
    if (errors[i].includes("First name"))
      newErrObj.firstName = errors[i]
    if (errors[i].includes("Username"))
      newErrObj.username = errors[i]
    if(errors[i].includes("Last name"))
      newErrObj.lastName = errors[i]
    if(errors[i].includes("Password confirmation"))
      newErrObj.passwordConfirmation = errors[i]
    if(errors[i].includes("Email"))
      newErrObj.email = errors[i]
    if(errors[i].includes("Password"))
      newErrObj.password = errors[i]
  }
  return newErrObj
  
}