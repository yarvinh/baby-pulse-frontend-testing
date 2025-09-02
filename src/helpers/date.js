export const date = (date) => {
    date = new Date(date).toLocaleString()
    if (date){
      date = new Date(date.split('-').join("-").split("T")[0].replace(/-/g, '\/'))
      return date.toDateString()
    }
}

export const calculateWeeksRemaining = (dueDate,diff) => {
  const today = new Date()
  const due = new Date(dueDate)
  const diffTime = due.getTime() - today.getTime()
  const diffWeeks = Math.ceil(diffTime / ((1000 * 60 * 60 * 24 * 7)  )) - diff

  return Math.max(0, diffWeeks)
  
};

export const calculateDaysRemaining = (dueDate, diff) => {
  const today = new Date();
  const due = new Date(dueDate)
  const diffTime = due.getTime() - today.getTime()
  const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - diff

  return Math.max(0, remainingDays)
};


export const calculateWeeks = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate?.split("T")[0])
  const diffTime = due.getTime() - today.getTime()
  const remainingWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
  const totalWeeks = 40 - Math.max(0, remainingWeeks) 
  return Math.max(0, Math.min(40, totalWeeks))
};

export const formatDueDate = (dueDate) => {
  const due = new Date(dueDate);
  return due.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

export const getMovementsAverage = (sessions) => {
  const toSeconds = sessions.map((s)=>{
    const [hours, minutes, seconds] = s.duration?.split(":").map(Number)
    return (hours * 60) * 60 + (minutes * 60) + seconds
  })
  const {sumOfKicks} = sessions.reduce((acc, actualValue) =>{
    acc.sumOfKicks += actualValue.movements
    acc.count + 1
    return acc
  },{sumOfKicks: 0, count: 0})
  const sumOfSeconds = toSeconds.reduce((acumulator, actualValue) => acumulator + actualValue, 0)
  const kickPerSeconds = sumOfKicks / sumOfSeconds
  return Math.floor((10 / kickPerSeconds) / 60)

  // let diffInSeconds = []
  // for (let i = 0; i <= sessions.length - 1; i++ ) {
  //   if (sessions[i].time){
  //     const diff = getTimeDifference(sessions[i].updated_at, sessions[i].created_at)
  //     diffInSeconds.push(diff)
  //   }
  // }







  // const averageInSeconds = sumOfSeconds / toSeconds.length
  // console.log(averageInSeconds)
  // const sumOfSeconds = diffInSeconds.reduce((acumulator, actualValue) => acumulator + actualValue, 0)
  // const average = (sumOfSeconds / diffInSeconds.length)
  // const hours = Math.floor(average / 3600)
  // const minutes = Math.floor((average % 3600) / 60)
  // return `${hours > 0 ?`${hours} ${hours === 1 ?"hour":"hours"}`:""}${minutes} ${minutes === 1 ? "minute" : "minutes"}`.trim()
}

export const formatTime = (dateString) => {
  let d = new Date(dateString)
  const now = new Date()
  const sameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()

  const time = d.toLocaleTimeString(undefined, { timeStyle: "short" })
  const date = d.toLocaleDateString(undefined, { dateStyle: "medium" })

  if (sameDay(d, now)) return `today at ${time}`;
  const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1)
  if (sameDay(d, yesterday)) return `yesterday at ${time}`
  return `at ${time}` 
  
};

export const getCurrentTime = () => {
  const now = new Date();
  return now
}

export const  calculateTime = (createAtTime, endTime) =>{

  const rightNowTime = new Date(endTime);
  const internationalTime = rightNowTime.toISOString();
  const movementSessionTime = new Date(internationalTime)  - new Date(createAtTime)
  const hours = Math.floor(movementSessionTime / (1000 * 60 * 60));
  const minutes = Math.floor((movementSessionTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((movementSessionTime % (1000 * 60)) / 1000);
  // return `${hours > 0 ?`${hours} hours and `:""}${minutes} minutes`
  return `${hours}:${minutes}:${seconds}`

}

function getTimeDifference(time1, time2) {
  const date1 = new Date(time1)
  const date2 = new Date(time2)
  const hours1 = date1.getUTCHours()
  const minutes1 = date1.getUTCMinutes()
  const seconds1 = date1.getUTCSeconds() + date1.getUTCMilliseconds() / 1000
  const hours2 = date2.getUTCHours();
  const minutes2 = date2.getUTCMinutes();
  const seconds2 = date2.getUTCSeconds() + date2.getUTCMilliseconds() / 1000
  const totalSeconds1 = hours1 * 3600 + minutes1 * 60 + seconds1
  const totalSeconds2 = hours2 * 3600 + minutes2 * 60 + seconds2
  const diffSeconds = Math.abs(totalSeconds1 - totalSeconds2)
  return diffSeconds
}

export const formatElapsed = (ms) => {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export const timeToLocal = (created_at) => {
  if(created_at){
    const time = new Date(created_at).toISOString()
    return new Date(time)
  }
}

export const changeTimeFormat = (time) =>{
   if (time === "0:0:0") return "In progress"
   const [hours, minutes, seconds] = time.split(":")
   return `${hours != "0" ? `${hours} h`: ""} ${minutes != "0" ? `${minutes} min` : ""} ${seconds != "0" ?`${seconds} s` : ""} `
  //  return `${hours} h ${minutes} min ${seconds} s`
   
}