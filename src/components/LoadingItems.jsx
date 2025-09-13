import { Loader2, LoaderCircle, RefreshCw } from "lucide-react"

 const LoadingItems=()=>{
    return (
        <div>
        {/* <div className="flex justify-center items-center">
           <RefreshCw className="h-6 w-6 animate-spin text-green-600" />
        </div> */}
            {/* <Loader2 className="h-8 w-8 animate-spin text-blue-500" /> */}
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            Loading ...
        </div> 
    )
}


export default LoadingItems