import { createContext, useReducer, useState} from 'react';
import { pregnancyReducer } from '../reducers/pregnancyReducers';
export const PregnancyContext = createContext();

const initialState = {
  user: {is_login: false, user: {}},
  userLoading: false,
  pregnancy: {
    kicks: []
  },
  pregnancies: [],
  pregnancyLoading: false,
  pregnanciesLoading: false,
  errorsOrMessages: {},
}
  
export const PregnancyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pregnancyReducer,initialState)
  const [isRunning, setIsRunning] = useState(false)
  const userPayload = state.user
  const pregnancy = state.pregnancy
  const errorsOrMessages = state.errorsOrMessages
  const pregnancies = state.pregnancies
  
  const value = {
    pregnancies, 
    state,
    userPayload,
    pregnancy,
    errorsOrMessages,
    dispatch,
    isRunning, 
    setIsRunning
  };

  return (
    <PregnancyContext.Provider value={value}>
      {children}
    </PregnancyContext.Provider>
  );
};