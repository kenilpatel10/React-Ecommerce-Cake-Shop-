import { LOGIN_REQUEST,LOGOUT_FAIL,LOGOUT_SUCCESS,UPDATE_PASSWORD_FAIL,UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_RESET,UPDATE_PASSWORD_SUCCESS, UPDATE_RESET,UPDATE_REQUEST,UPDATE_FAIL,UPDATE_SUCCESS,LOGIN_FAIL,LOAD_REQUEST, LOGIN_SUCCESS ,CLEAR_ERRORS, REGISTER_SUCCESS,REGISTER_REQUEST,REGISTER_FAIL, LOAD_SUCCESS, LOAD_FAIL} from "../constants/userConstants"

export const userReducer = ( state = { user: {} }, action) =>{
    switch (action.type) {
        case LOGIN_REQUEST:
            case REGISTER_REQUEST:
                case LOAD_REQUEST:
            return{
                loading:true,
                isAuthenticated:false,
            };
            case LOGIN_SUCCESS:
                case REGISTER_SUCCESS:
                    case LOAD_SUCCESS:
                return{
                    loading:false,
                    isAuthenticated:true,
                    user: action.payload.user
                };  
                case LOGOUT_SUCCESS:
                    return {
                      loading: false,
                      user: null,
                      isAuthenticated: false,
                    };
                case LOGIN_FAIL:
                    case REGISTER_FAIL:
                       
                return{
                    ...state,
                    loading:false,
                    isAuthenticated:false,
                    user: null,
                    error: action.payload,
                };
                case LOAD_FAIL:
                    return{
                        loading:false,
                        isAuthenticated:false,
                        user: null,
                        error: action.payload,
                    };
                    case LOGOUT_FAIL:
                    return{
                        ...state,
                        loading:false,
                        error: action.payload,
                    };
                     

                case CLEAR_ERRORS:
                
                    return{
                       ...state,
                        error:null
                    };
    
        default:
          return state;
    }

}

export const profileReducer = ( state = { user: {} }, action) =>{
    switch (action.type) {
        case UPDATE_REQUEST:
            case UPDATE_PASSWORD_REQUEST:
            return{
                ...state,
                loading:true,
            };
            case UPDATE_SUCCESS:
                case UPDATE_PASSWORD_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    isupdated: action.payload.success
                };  
                
                case UPDATE_FAIL:
                    case UPDATE_PASSWORD_FAIL:
                       
                return{
                    ...state,
                    loading:false,
                    error: action.payload,
                };
                case UPDATE_RESET:
                    case UPDATE_PASSWORD_RESET:
                       return{
                           ...state,
                            isupdated: false,
                       }

                  
                case CLEAR_ERRORS:
                
                    return{
                       ...state,
                        error:null
                    };
    
        default:
          return state;
    }

}
