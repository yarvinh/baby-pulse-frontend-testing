import { createContext, useReducer} from 'react';
import { pregnancyReducer } from '../reducers/pregnancyReducers';
export const PregnancyContext = createContext();

const initialState = {
  user: {is_login: false},
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
  const [state, dispatch] = useReducer(pregnancyReducer,initialState);
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
    dispatch
  };

  return (
    <PregnancyContext.Provider value={value}>
      {children}
    </PregnancyContext.Provider>
  );
};