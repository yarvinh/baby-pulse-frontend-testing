import { useState } from "react";
import {date, daysWeeksMath} from "../../helpers/date"
import { Baby, Calendar, Edit3} from 'lucide-react';
import SetOrEditPregnancy from "./SetOrEditPregnancy";
import { patchFetchAction } from "../../actions/fetchings";
import KickSessionsContainer from "../../containers/KickSessionsContainer";
import WeeksAndDaysCount from "./WeeksAndDaysCount";
import { FETAL_GROWTH_RANGES } from "../../helpers/fetalGrowthRanges";
import BHCtxContainer from "../../containers/BHCtxContainer";
import { MILESTONES } from "../../helpers/milestoneArr";

const Pregnancy = ({pregnancy}) => {
  const {weeksRe: weeksReOf40, currentWeeks, currentDays} = daysWeeksMath(pregnancy.due_date,40)
  const weeksIndex = currentWeeks - 15 
  const presentGrowthRange = FETAL_GROWTH_RANGES.at(weeksIndex)
  const {week, length_in: length, weight_range_lb: weightRange, thisWeek, survivalRate } = presentGrowthRange
  const [showDueDate,setShowDueDate] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const weeks = [34,37,40]
  const {day: currenday, thisDay: todayMilestone} = MILESTONES[currentDays - 1]

  return (
      <div className="space-y-0 sm:space-y-0">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl  p-4 sm:p-6 shadow-xl border border-white/20 mb-4 sm:mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-rose-100 rounded-full">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-800">Due Date</h2>
                <p className="text-sm text-gray-600">{date(pregnancy.due_date, true)}</p>
              </div>
            </div>
            <button
              onClick={() => setShowDueDate(true)}
              className="p-2 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
          {weeks.map((w,i)=> {
            if (currentWeeks < w) {
              return <WeeksAndDaysCount key={i} weeks={w} preg={pregnancy}/>
            }else{
              <></>
            }
          })}
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl border border-white/20">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-rose-100 rounded-full">
              <Baby className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Week {currentWeeks}</h2>
              <p className="text-sm sm:text-base text-gray-600">Development Update</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">This Week's Milestone</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Current day {currenday}: {todayMilestone.en}
            
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {week > 23 && `Survival Rate: ${survivalRate}`}
            </p>
          </div>

          {/* Mobile-Optimized Stats Grid */}
          {currentWeeks > 14 && <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="bg-rose-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
              <p className="text-lg sm:text-2xl font-bold text-rose-600">{length}"</p>
              <p className="text-xs sm:text-sm text-gray-600">Length</p>
            </div>
            <div className="bg-pink-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
              <p className="text-lg sm:text-2xl font-bold text-pink-600">{weightRange}</p>
              <p className="text-xs sm:text-sm text-gray-600">Weight (lbs)</p>
            </div>
            <div className="bg-purple-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
              <p className="text-lg sm:text-2xl font-bold text-purple-600">{weeksReOf40} wks</p>
              <p className="text-xs sm:text-sm text-gray-600">Remaining</p>
            </div>
          </div>}
        </div>
        <KickSessionsContainer preg={pregnancy} setShowHistory={setShowHistory} showHistory={showHistory}/>
        < BHCtxContainer preg={pregnancy} setShowHistory={setShowHistory} showHistory={showHistory}/>
        {showDueDate &&  <SetOrEditPregnancy pregnancy={pregnancy} setShowDueDate={setShowDueDate} edit={true} fetchActions={patchFetchAction}/>}
        {/* {showHistory && <HistoryModal  preg={pregnancy} setShowHistory={setShowHistory}/> } */}
        
      </div>
  )

}

export default Pregnancy