import { calculateDaysRemaining, calculateWeeksRemaining } from "../../helpers/date"

const WeeksAndDaysCount = ({preg, weeks}) =>{
    const  diffWeeksFrom40 = 40 - weeks 
    const diffDaysFrom280 = 280 - (weeks * 7)
    return (
        <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-rose-50 rounded-xl p-3 text-center">
          <p className="text-lg sm:text-xl font-bold text-rose-600">{calculateWeeksRemaining(preg.due_date, diffWeeksFrom40)}</p>
          <p className="text-xs sm:text-sm text-gray-600">Weeks Left Until {weeks}</p>
        </div>
        <div className="bg-pink-50 rounded-xl p-3 text-center">
          <p className="text-lg sm:text-xl font-bold text-pink-600">{calculateDaysRemaining(preg.due_date, diffDaysFrom280 )}</p>
          <p className="text-xs sm:text-sm text-gray-600">Days Left Until {weeks}</p>
        </div>
      </div>

    )
}

export default WeeksAndDaysCount