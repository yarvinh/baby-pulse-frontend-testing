import { Eye, EyeOff, Heart, Mail, User,Lock } from "lucide-react";
import { useContext, useState } from "react";
import { PregnancyContext } from "../../contexts/PregnancyContext";
import { errorsOrganizer } from "../../helpers/errors";
import { useEffect } from "react";
import { patchFetchAction } from "../../actions/fetchings";
import { useParams } from 'react-router-dom'
import { paths } from "../../helpers/paths";
import { ACTIONS_TYPES } from "../../actions/actionsHelpers";
import ErrorsOrMsg from "../ErrosOrMsg"
const EditUser = () => {
  const {id} = useParams()
    const {dispatch, userPayload, errorsOrMessages,state, valid_email} = useContext(PregnancyContext)
    const {email, firstName, lastName, username, password, passwordConfirmation} = errorsOrganizer(errorsOrMessages)

    const { is_login: isLogin, user: currentUser} = userPayload;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        email: '',
        username: '',
        first_name: '',
        last_name: ''
    });

    const [editPassword, setEditPassword] = useState({
      password_confirmation: '',
      password: '',
    })

    const handleOnEditPassword = (e) => {
      const { name, value } = e.target;
      setEditPassword(prev => ({ ...prev, [name]: value }))
    }

    useEffect(()=>{
        if(currentUser?.id)
          setUser({
              ...user,
              email: currentUser.email,
              username: currentUser.username,
              first_name: currentUser.first_name,
              last_name: currentUser.last_name
          })
    },[currentUser?.id])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit =  (e) => {
        e.preventDefault()
        const formType = e.target.dataset.formType
        patchFetchAction({
          payload: {
            user: formType === "password" ? editPassword :user 
          }, 
          path: `${paths().usersPath}/${id}`, 
          dispatch: dispatch, 
          actions: {
              actionType: ACTIONS_TYPES.addUser,
              loading: ACTIONS_TYPES.fetchUserSart
          } 
      })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-4">
                {isLogin && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            name="first_name"
                            value={user.first_name}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors ${
                              firstName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                            }`}
                            placeholder="First name"
                          />
                        </div>
                        {firstName && (
                          <p className="text-red-500 text-xs mt-1">{firstName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            name="last_name"
                            value={user.last_name}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors ${
                              lastName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                            }`}
                            placeholder="Last name"
                          />
                        </div>
                        {lastName && (
                          <p className="text-red-500 text-xs mt-1">{lastName}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}
    
                <div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors ${
                          username? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="Username"
                      />
                    </div>
                    {username && (
                      <p className="text-red-500 text-xs mt-1">{username}</p>
                    )}
                  </div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors ${
                        email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {email && (
                    <p className="text-red-500 text-xs mt-1">{email}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:from-rose-600 hover:to-pink-600 transition-all transform active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    Save change
                </button>
            </form>
            <div className="mt-6 h-16">
                 {errorsOrMessages?.from === 'update_user' && errorsOrMessages?.msg &&(<ErrorsOrMsg  msg={errorsOrMessages.msg}/>)}
            </div>
            <form  onSubmit={handleSubmit} data-form-type="password" className=" space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={editPassword.password}
                      onChange={handleOnEditPassword}
                      className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors ${
                        password ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {password && (
                    <p className="text-red-500 text-xs mt-1">{password}</p>
                  )}
                </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="password_confirmation"
                        value={editPassword.password_confirmation}
                        onChange={handleOnEditPassword}
                        className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors ${
                          passwordConfirmation ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {passwordConfirmation && (
                      <p className="text-red-500 text-xs mt-1">{passwordConfirmation}</p>
                    )}
                  </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:from-rose-600 hover:to-pink-600 transition-all transform active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    Save change
                </button>
              </form>
            
            </div>
            
          </div>
        </div>
      );
}

export default EditUser