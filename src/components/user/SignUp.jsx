import React, { useState } from 'react';
import { Heart, Eye, EyeOff, Mail, Lock, User, Calendar, ArrowLeft } from 'lucide-react';
import { useContext } from 'react';
import { login, userPostFetchAction } from '../../actions/userActions';
import { PregnancyContext } from '../../contexts/PregnancyContext';
import { useNavigate } from 'react-router';
import { paths } from '../../helpers/paths';
import { useEffect } from 'react';
import ErrorsOrMsg from '../ErrosOrMsg';

const SignUp = ()=>{
    const navigate = useNavigate()
    const {dispatch, userPayload, errorsOrMessages,state, valid_email} = useContext(PregnancyContext)
    const { is_login: isLogin, verification_session } = userPayload;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
      email: '',
      username: '',
      password: '',
      password_confirmation: '',
      first_name: '',
      last_name: ''
    });

    useEffect(()=>{
      isLogin && isLoginSessionActive() && navigate('/')
    },[isLogin])
    // useEffect(()=>{
    //   verification_session && navigate('/verifying_email')
    // },[verification_session])
  
    const [errors, setErrors] = useState({});
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUser(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      userPostFetchAction({dispatch: dispatch, path: paths().usersPath, user: user})
    };
  
    const toggleAuthMode = () => {
      setUser(!isLogin);
      setUser({
        email: '',
        user_name: '',
        password: '',
        confirmPassword: '',
        first_name: '',
        last_name: '',
        dueDate: ''
      });
      setErrors({});
    };

      return (
          <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg mb-4">
                  <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                  <h1 className="text-2xl font-bold text-gray-800">BabyBloom</h1>
                </div>
                <p className="text-gray-600">
                  {isLogin ? 'Welcome back to your pregnancy journey' : 'Start your beautiful pregnancy journey'}
                </p>
              </div>
      
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {isLogin 
                      ? 'Continue tracking your precious moments' 
                      : 'Join thousands of expecting mothers'
                    }
                  </p>
                </div>
      
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    {errorsOrMessages?.from === 'create_user' && (<ErrorsOrMsg errors={errorsOrMessages?.errors} msg={errorsOrMessages.msg}/>)}
                  </div>
                  {!isLogin && (
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
                                errors.first_name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                              }`}
                              placeholder="First name"
                            />
                          </div>
                          {errors.first_name && (
                            <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
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
                                errors.last_name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                              }`}
                              placeholder="Last name"
                            />
                          </div>
                          {errors.last_name && (
                            <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
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
                            errors.username? 'border-red-300 bg-red-50' : 'border-gray-200'
                          }`}
                          placeholder="Username"
                        />
                      </div>
                      {errors.username && (
                        <p className="text-red-500 text-xs mt-1">{errors.username}</p>
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
                          errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
      
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors ${
                          errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200'
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
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                    )}
                  </div>
      
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="password_confirmation"
                          value={user.password_confirmation}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors ${
                            errors.password_confirmation ? 'border-red-300 bg-red-50' : 'border-gray-200'
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
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>
                  )}
      
                  {errors.general && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                      <p className="text-red-600 text-sm">{errors.general}</p>
                    </div>
                  )}
      
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:from-rose-600 hover:to-pink-600 transition-all transform active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        {isLogin ? 'Signing In...' : 'Creating Account...'}
                      </>
                    ) : (
                      isLogin ? 'Sign In' : 'Create Account'
                    )}
                  </button>
                </form>
      
                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                  <p className="text-gray-600 text-sm mb-3">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                  </p>
                  <button
                    onClick={toggleAuthMode}
                    className="text-rose-600 hover:text-rose-700 font-medium transition-colors"
                  >
                    {isLogin ? 'Create Account' : 'Sign In'}
                  </button>
                </div>
              </div>
      
              <div className="text-center mt-6">
                <p className="text-xs text-gray-500">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        );
}
export default SignUp