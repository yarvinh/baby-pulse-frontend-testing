
export const date = (date, utc = false) => {
    if(!utc) date = new Date(date).toLocaleString()
    if (date){
      date = new Date(date.split('-').join("-").split("T")[0].replace(/-/g, '\/'))
      return date.toDateString()
    }
}

export const remainDaysWeeks = (date,weeks)=>{
  const weeksOfPreg = calculateWeeks(date,true)
  const daysRe = calculateDaysRemaining(date ,weeks)
  return {
   weeksRe: weeks - weeksOfPreg,
   daysRe: daysRe
  }
}

export const calculateDaysRemaining = (dueDate, setWeeks) => {
  const setWeeksDiffFrom40 = (40 - setWeeks)
  let today = new Date()
  const due = new Date(dueDate)
  const diffTime = due.getTime() - today.getTime() 
  const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) - (setWeeksDiffFrom40 * 7)) 
  return Math.max(0, remainingDays)
};

export const calculateWeeks = (dueDate) => {
  const today = new Date()
  let due = new Date(dueDate)
  const dSameWallClockLocal = new Date(due.getTime() + due.getTimezoneOffset() * 60_000)
  const diffTime = dSameWallClockLocal.getTime() - today.getTime()
  const remainingWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
  const totalWeeks = 40 - Math.max(0, remainingWeeks) 
  return Math.max(0, Math.min(40, totalWeeks))
};

export const getMovementsAverage = (sessions) => {
  let sumOfSeconds = 0
  let sumOfKicks = 0
  for (let i = 0; i <= sessions.length - 1; i++ ) {
    const [hours, minutes, seconds] = sessions[i].duration?.split(":").map(Number)
    sumOfKicks += sessions[i].movements
    sumOfSeconds += (hours * 60 * 60) + (minutes * 60) + seconds
  }
  const kickPerSeconds = sumOfKicks / sumOfSeconds
  const averageInSeconds = Math.floor((10 / kickPerSeconds))
  const hours = Math.floor(averageInSeconds/ 3600);
  const minutes = Math.floor((averageInSeconds % 3600) / 60)
  const seconds = averageInSeconds % 60;
  return `${hours != "0" ? `${hours} h`: ""} ${minutes != "0" ? `${minutes} min` : ""} ${seconds != "0" ?`${seconds} s` : ""} `
}

export const formatTime = (dateString) => {
  let d = new Date(dateString)
  const now = new Date()
  const sameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()

  const time = d.toLocaleTimeString(undefined, { timeStyle: "short" })

  if (sameDay(d, now)) return `today at ${time}`;
  const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1)
  if (sameDay(d, yesterday)) return `yesterday at ${time}`
  return `at ${time}`  
};

export const getCurrentTime = () => new Date()

export const  calculateTime = (createAtTime, endTime) =>{
  const rightNowTime = new Date(endTime);
  const internationalTime = rightNowTime.toISOString()
  const movementSessionTime = new Date(internationalTime)  - new Date(createAtTime)
  const hours = Math.floor(movementSessionTime / (1000 * 60 * 60));
  const minutes = Math.floor((movementSessionTime % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((movementSessionTime % (1000 * 60)) / 1000)
  return `${hours}:${minutes}:${seconds}`
}

export const formatElapsed = (ms) => {
  const total = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60;
  const pad = (n) => String(n).padStart(2, "0")
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`
}

export const timeToLocal = (created_at) => created_at && new Date(created_at)

export const changeTimeFormat = (time) =>{
   if (time === "0:0:0") return "In progress"
   const [hours, minutes, seconds] = time.split(":")
   return `${hours != "0" ? `${hours} h`: ""} ${minutes != "0" ? `${minutes} min` : ""} ${seconds != "0" ?`${seconds} s` : ""}`
}