import { LOG_IN_SUCCESS, GET_ALL_TECHNICIAN, GET_ALL_MANAGER, GET_ALL_DEPARTMENT} from "../../Action/globalTypes";

const user = JSON.parse(sessionStorage.getItem("user") || "{}");

const initState =
  Object.keys(user).length > 0
    ? { isLoggedIn: true, 
      technicianData: [],
      managerData:[],
      deptData:[],
      user }
    : { isLoggedIn: false,  technicianData: [], managerData:[], deptData:[], user: {} };

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };

      case GET_ALL_TECHNICIAN:
        return {
          ...state,
          technicianData: action.payload,
          
        };


        case GET_ALL_DEPARTMENT:
          return {
            ...state,
            deptData: action.payload,
          };

        case GET_ALL_MANAGER:

        console.log('action.payload', action.payload)
          return {
            ...state,
            managerData: action.payload,
            
          };
    default:
      return state;
  }
};

export default authReducer;
