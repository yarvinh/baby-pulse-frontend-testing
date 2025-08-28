export const date = (date) => {
    if (date){
        date = new Date(date.split('-').join("-").split("T")[0].replace(/-/g, '\/'))
      return date.toDateString()
    }
}

export const calculateWeeksRemaining = (dueDate) => {
  const today = new Date()
  const due = new Date(dueDate?.split("T")[0])
  const diffTime = due.getTime() - today.getTime()
  const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
  return Math.max(0, diffWeeks)
};

export const calculateDaysRemaining = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate?.split("T")[0])
  const diffTime = due.getTime() - today.getTime()
  const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

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
  });
};

export const getMovementsAverage = (sessions) => {
  let diffInSeconds = []
  for (let i = 0; i <= sessions.length - 1; i++) {
    if (sessions[i].time){
      const diff = getTimeDifference(sessions[i].time, sessions[i].created_at)
      diffInSeconds.push(diff)
    }
  }

  const sumOfSeconds = diffInSeconds.reduce((acumulator, actualValue) => acumulator + actualValue, 0)
  const average = (sumOfSeconds / diffInSeconds.length)
  const hours = Math.floor(average / 3600)
  const minutes = Math.floor((average % 3600) / 60)
  // const seconds = Math.floor(average % 60)
  return `${hours > 0 ? `${hours} ${hours === 1 ? "hour" : "hours"} ` : ""}${minutes} ${minutes === 1 ? "minute" : "minutes"}`.trim()
}


export const formatTime = (d) => {
  const date = new Date(d);

  const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC' 
  };
  return date.toLocaleTimeString('en-US', options)
};


export const getCurrentTime = () => {
  const now = new Date();
  return now
}

export const  calculateTime = (createAtTime) =>{
  const rightNowTime = new Date();
  const internationalTime = rightNowTime.toISOString();
  const movementSessionTime = new Date(internationalTime)  - new Date(createAtTime)
  const hours = Math.floor(movementSessionTime / (1000 * 60 * 60));
  const minutes = Math.floor((movementSessionTime % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours > 0 ? `${hours} hours and`: " "} ${minutes} minutes`

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