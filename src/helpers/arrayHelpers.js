export const findLastCreatedItem = (arr) => {
    return  arr?.reduce((a, b) => (b.id > a.id ? b : a))
}