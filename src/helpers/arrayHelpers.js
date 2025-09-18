import { calculateTime, changeTimeFormat } from "./date"

export const findLastCreatedItem = (arr) => {
    if (arr && arr.length > 0)
        return  arr?.reduce((a, b) => (b.id > a.id ? b : a))
    else
      return {}
}

export const checkForDuePreg = (arr)=> {
    return arr.find((e)=> new Date(e.due_date) < new Date() )
}

export const findIndexById = ({array,id})=>{
    const index = array.findIndex(i => i.id === id)
    if(index !== -1)
       return index
    else
       return false
}

export const findItemById = ({array,id})=>{
    const item = array.find(i => i.id === parseInt(id,10))
    return item
}
  
export const deleteItemFromArray = ({ array, id }) => array.filter(item => item.id !== id);

export const editItemFromArray = ({array,item}) => array.map(i =>  i.id === item.id ? item : i)



export const addRemoveOrEdit = ({data,array, id}) => {
    const deletedItemId = findIndexById({array: array,id: data.id})
    const itemIdInTheArray = findIndexById({array: array,id: id})
    if(itemIdInTheArray !== -1 && !id){
      return {
        newArray: editItemFromArray({array: array, item: data}),
        obj: data
      }
    } else if (deletedItemId !== -1){
      const deletedItem = deleteItemFromArray({array: array, id: id})
      return {
        newArray: deletedItem,
        obj: array.length > 1  ? deletedItem[0] : {}
      }
    } else {
      return {
        newArray: [],
        obj: {}
      }
    }
}

export const last4Items = (arr)=>{
  if(arr.length > 3 ){
      let add = 0
      for (let i = 0; i < 5; i++ ) {
        if(arr[i]?.created_at && arr[i+1]?.created_at){
          const timeStart = new Date(arr[i]?.created_at);
          const movementSessionTime = new Date(timeStart)  - new Date(arr[i + 1]?.created_at)
          add += movementSessionTime
        }
      }
      const average = add / 3
      const hours = Math.floor(average / (1000 * 60 * 60));
      const minutes = Math.floor((average % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((average % (1000 * 60)) / 1000)
      const time =  `${hours}:${minutes}:${seconds}`
      return changeTimeFormat(time)
    } else {
      return "You need at least 5 Braxton Hicks contractions to calculate a frequency average. Note that this average is based only on the last 5 contractions."
    }
}

export const getFrequency = (arr) => {
  const dates = []
  for (let i = arr.length - 1; i >= 0; i-- ) {
    dates.unshift(calculateTime(arr[i+1]?.created_at, arr[i]?.created_at))
  }
  return dates
}

