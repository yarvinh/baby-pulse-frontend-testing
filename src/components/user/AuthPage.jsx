import React, { useState } from 'react';
import { Heart, Eye, EyeOff, Mail, Lock} from 'lucide-react';
import { Link} from 'react-router-dom'
import { useContext } from 'react';
import { login } from '../../actions/userActions';
import { PregnancyContext } from '../../contexts/PregnancyContext';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import ErrorsOrMsg from '../ErrosOrMsg';

const AuthPage = () => {
  const navigate = useNavigate()
  const {dispatch, userPayload,state,errorsOrMessages} = useContext(PregnancyContext)
  const { is_login: isLogin, verification_session } = userPayload;
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    dueDate: ''
  });
  useEffect(()=>{
    verification_session && navigate('/verifying_email')
  },[verification_session])

  useEffect(()=>{
    isLogin && toggleAuthMode()
    isLogin && navigate('/')
  },[isLogin])

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
    login({dispatch: dispatch, user: user})
  };

  const toggleAuthMode = () => {
    setUser({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
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
          Welcome back to your pregnancy journey
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
             Sign In
            </h2>
            <p className="text-gray-600 text-sm">
                Continue tracking your precious moments
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            {errorsOrMessages?.from === 'login' && (<ErrorsOrMsg errors={errorsOrMessages?.errors} msg={errorsOrMessages.msg}/>)}
            </div>
            <div>
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
                    'Sign In' 
                  )}
                </button>
            </form>
          <br/>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center">
              <Link to='/password_recovery' 
                type="button"
                className="text-sm text-rose-600 hover:text-rose-700 transition-colors"
              > 
                  Forgot your password?
              </Link>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-600 text-sm mb-3">
              Don't have an account?
            </p>
            <Link to="/sign_up" > 
              Create Account 
            </Link>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
};

export default AuthPage;