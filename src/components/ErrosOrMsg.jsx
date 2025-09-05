const ErrorsOrMsg = ({errors,msg})=>{
   if(errors){
      return(
         <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
            {errors.map((e,index)=>{
              return <p key={index} className="accordion"><strong className={"accordion"}>{e}</strong></p>
            })}
         </div>
      )
   }else{
      return(
         <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
            {msg.map((e,index)=>{
              return <p key={index} className={"accordion"}> <strong className={"accordion"}>{e}</strong> </p>
            })}
         </div>
      )
   }
}

export default ErrorsOrMsg