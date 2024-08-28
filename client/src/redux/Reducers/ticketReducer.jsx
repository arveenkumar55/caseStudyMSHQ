import { GET_ALL_TCIKET, GET_ALL_TCIKET_COMMENTS, GET_ALL_TCIKET_STATATICS, GET_ALL_SUMMARY_TICKETS} from "../../Action/globalTypes";


const initState =  {
  ticketData : [],
  ticketCommentsData : [],
  ticketStatatics : [],
  ticketSummary: []
}

const ticketReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_TCIKET:
      return {
        ...state,
        ticketData: action.payload,
        
      };

      case GET_ALL_TCIKET_COMMENTS:
        return {
          ...state,
          ticketCommentsData: action.payload,
          
        };

        case GET_ALL_TCIKET_STATATICS:
          return {
            ...state,
            ticketStatatics: action.payload,
          }

          case GET_ALL_SUMMARY_TICKETS:
          return {
            ...state,
            ticketSummary: action.payload,
          }
    default:
      return state;
  }
};

export default ticketReducer;
