import { createContext, useReducer, useState} from 'react';
import { pregnancyReducer } from '../reducers/pregnancyReducers';
export const PregnancyContext = createContext();

const initialState = {
  user: {is_login: false, user: {}},
  userLoading: false,
  pregnancy: {},
  kickSessions: [],
  kickSession: {},
  pregnancies: [],
  pregnancyLoading: false,
  pregnanciesLoading: false,
  kickSessionLoading: false,
  errorsOrMessages: {},
  bhctx: [],
  bhctr: {},
  bhctxLoading: false,
  bhctrLoading: false,
}

export const PregnancyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pregnancyReducer,initialState)
  // const [isRunning, setIsRunning] = useState(false)
  const userPayload = state.user
  const pregnancy = state.pregnancy
  const errorsOrMessages = state.errorsOrMessages
  const pregnancies = state.pregnancies
  const kickSessions = state.kickSessions
  const kickSession = state.kickSession
  const pregnanciesLoading = state.pregnanciesLoading  
  const kickSessionLoading = state.kickSessionLoading
  const bhctrLoading = state.bhctrLoading
  const bhctxLoading = state.bhctxLoading
  const bhctx = state.bhctx
  const bhctr = state.bhctr
  const value = {
    kickSessionLoading,
    userPayload,
    pregnancy,
    pregnancies,
    pregnanciesLoading,
    bhctxLoading,
    bhctrLoading,
    kickSession,
    kickSessions,
    bhctx,
    bhctr,
    errorsOrMessages,
    state,
    dispatch,
    // isRunning, 
    // setIsRunning
  }
//  console.log(state)
  return (
    <PregnancyContext.Provider value={value}>
      {children}
    </PregnancyContext.Provider>
  );
};