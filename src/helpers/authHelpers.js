export const baseUrl = () => { 
    return  process.env.NODE_ENV === "development" ? 'http://localhost:3000'
    : process.env.NODE_ENV === 'test' ? 'http://localhost:3000'
    : 'https://example.com'  
     
 }
 