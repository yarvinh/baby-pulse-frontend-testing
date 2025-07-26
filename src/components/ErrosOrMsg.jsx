const ErrorsOrMsg = ({errors,msg})=>{
   if(errors){
      return(
         <div className="errors-alerts">
            {errors.map((e,index)=>{
              return <p key={index} className="accordion"><strong className={"accordion"}>{e}</strong></p>
            })}
         </div>
      )
   }else{
      return(
         <div className="msg-alerts">
            {msg.map((e,index)=>{
              return <p key={index} className={"accordion"}> <strong className={"accordion"}>{e}</strong> </p>
            })}
         </div>
      )
   }
}

export default ErrorsOrMsg