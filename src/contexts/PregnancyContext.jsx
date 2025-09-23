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
  target: {},
  targets: [],
  bhctxLoading: false,
  bhctrLoading: false,
  targetsLoading: false,
  targetLoading: false,

}

export const PregnancyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pregnancyReducer,initialState)
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
  const target = state.target
  const targets = state.targets
  const targetLoading = state.targetLoading
  const targetsLoading = state.targetsLoading

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
    target,
    targets,
    targetLoading,
    targetsLoading,
    errorsOrMessages,
    state,
    dispatch
  }
  console.log(state)
  return (
    <PregnancyContext.Provider value={value}>
      {children}
    </PregnancyContext.Provider>
  );
};