export const findLastCreatedItem = (arr) => {
    if (arr && arr.length > 0)
        return  arr?.reduce((a, b) => (b.id > a.id ? b : a))
}