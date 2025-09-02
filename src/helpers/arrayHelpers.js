export const findLastCreatedItem = (arr) => {
    if (arr && arr.length > 0)
        return  arr?.reduce((a, b) => (b.id > a.id ? b : a))
    else
      return {}
}

export const checkForDuePreg = (arr)=> {
    return arr.find((e)=> new Date(e.due_date) < new Date() )
}