export const paths = () => {
    const testPaths  = {
       checkLoginPath: '/test/checklogin',
       usersPath: '/test/users',
       verifyEmail: "/test/verify_email",
       login: '/test/login',
       requestSecurityCode: '/test/request_security_code'
    }  
    
   const paths =  {
       checkLoginPath: '/checklogin' ,
       usersPath: '/users',
       verifyEmail: "/verify_email",
       login: "/login",
       requestSecurityCode: '/request_security_code',
       passwordRecovery: '/password_recovery',
       resetPassword: '/reset_password',
       pregnancyPath: "/pregnancies",
       kickSessions: "/kick_sessions"
    }
    return process.env.NODE_ENV === 'test' ? testPaths : paths
 
 }
