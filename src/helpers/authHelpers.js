export const baseUrl = () => { 
    return  process.env.NODE_ENV === "development" ? 'http://localhost:3000'
    : process.env.NODE_ENV === 'test' ? 'http://localhost:3000'
    : 'https://baby-pulse-backend-c6623360a5f0.herokuapp.com'  
     
 }
 