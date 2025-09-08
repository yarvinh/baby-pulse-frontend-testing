import { ACTIONS_TYPES } from "../actions/actionsHelpers";
import { addRemoveOrEdit} from "../helpers/arrayHelpers";

export const pregnancyReducer = (state, action) => {
  const isPayloadAnArray = Array.isArray(action.payload)
    switch (action.type) {
      case ACTIONS_TYPES.fetchUserSart:
        return { 
          ...state, 
          userLoading: true, 
        };
      case ACTIONS_TYPES.fetchPregnancyStart:
        return { 
          ...state, 
          pregnancyLoading: true,
        };
      case ACTIONS_TYPES.fetchPregnanciesStart:
        return { 
          ...state, 
          pregnanciesLoading: true,
      };
      case ACTIONS_TYPES.addKickSession:
          return {
            ...state,
            kickSessions: !isPayloadAnArray ? [action.payload, ...state.kickSessions] : action.payload,
            kickSession: !isPayloadAnArray ? action.payload :(action.payload?.length > 0) && action.payload.at(0) || {},
            kickSessionLoading: false,
            kickSessionsLoading:  false
          }
      case ACTIONS_TYPES.editOrRemoveKickSession:
        const {newArray: kickSessions , obj: kickSession} =  addRemoveOrEdit({
          data:  action.payload ,
          array: state.kickSessions, 
          id: action?.payload?.kick_session_id
        })
        return {
          ...state,
          kickSessions: kickSessions,
          kickSession: kickSession,
          kickSessionLoading: false,
          kickSessionsLoading:  false
        }
      case ACTIONS_TYPES.addUser:
        return {
          ...state,
          user: action.payload,
          userLoading: false
        };
      case ACTIONS_TYPES.addErrorsOrMessages:
        return {
          ...state,
          errorsOrMessages: action.payload,
          pregnancyLoading: false,
          userLoading: true, 
        };

        case ACTIONS_TYPES.editOrRemovePregnancy:
          const {newArray: pregnancies , obj: pregnancy} =  addRemoveOrEdit({
            data:  action.payload ,
            array: state.pregnancies, 
            id: action?.payload?.pregnancy_id
          })
          return {
            ...state,
            pregnancies: pregnancies,
            pregnancy: pregnancy,
            pregnancyLoading: false,
            PregnanciesLoading: false
          }
      case ACTIONS_TYPES.addPregnancies:
        return {
          ...state,
          pregnancies: !isPayloadAnArray  ? [action.payload, ...state.pregnancies] : action.payload,
          pregnancy: !isPayloadAnArray ? action.payload : {},
          pregnancyLoading: false,
          pregnanciesLoading: false
      };
      default:
        return state;
      }
  };

