import { ACTIONS_TYPES } from "../actions/actionsHelpers";

export const pregnancyReducer = (state, action) => {
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


            case ACTIONS_TYPES.addUser:
            return {
              ...state,
              user: action.payload,
              userLoading: false
            };
          case ACTIONS_TYPES.addErrorsOrMessages:
            return {
              ...state,
              errorsOrMessages: action.payload.errors_or_messages,
              pregnancyLoading: false,
              userLoading: true, 
            };
          case ACTIONS_TYPES.addPregnancy:
            return {
              ...state,
              pregnancy: action.payload,
              pregnancyLoading: false,
          };

          case ACTIONS_TYPES.addPregnancies:
            return {
              ...state,
              pregnancies: action.payload,
              pregnancyLoading: false,
          };

          default:
            return state;
        }
  };