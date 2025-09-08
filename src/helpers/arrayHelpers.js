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
    if(itemIdInTheArray !== -1 && !id) 
      return {
        newArray: editItemFromArray({array: array, item: data}),
        obj: data
      }
    else if(deletedItemId !== -1) 
      return {
        newArray: deleteItemFromArray({array: array, id: id}),
        obj: {}
      }
    else 
      return {
        newArray: [],
        obj: {}
      }
  }