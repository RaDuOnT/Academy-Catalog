import { triggerFocus } from "antd/es/input/Input";
import { 
  FIND_TRAINERS_SUCCESS,
  ADD_NEW_TRAINER_SUCCESS,
  EDIT_NEW_TRAINER_SUCCESS,
  EDIT_NEW_TRAINER_FAILURE,
  DELETE_TRAINER_SUCCESS,
  DELETE_TRAINER_FAILURE,
  ADD_NEW_TRAINER_FAILURE,
} from "../actionTypes/trainerActionTypes";
const initialState = {
    trainers: [],
    findAllError: false,
    addError: false,
    editError: false,
    deleteError: false,
    errorMessage: "",  
  };
  // Actions for initial states used for GET, than Post
  const trainerReducer = (state = initialState, action) => {
    switch (action.type) {
      case FIND_TRAINERS_SUCCESS:
        
        return {
          ...state,
          trainers: action.data,
          findAllError: false,
          errorMessage: "",  
        };
      case ADD_NEW_TRAINER_SUCCESS:
        return{
          ...state,
          trainers: [...state.trainers, action.data],
          addNewTrainer: true,
          addError: false,
          errorMessage: "",
  
        }

      case ADD_NEW_TRAINER_FAILURE:
        return{
          ...state,
          addError:true,
          errorMessage:"",

        }
      
      case EDIT_NEW_TRAINER_SUCCESS:
        const trainerCopy = [...state.trainers] //"...state.trainers -> JSON"
        return{
          ...state,
          trainers: state.trainers.filter((trainers) => trainers._id !== action.data),
          // trainers:trainerCopy,
          editError:false,
          errorMessage:"",
        };

        case EDIT_NEW_TRAINER_FAILURE:
          return {
            ...state,
            editError: action.editError,
            errorMessage: "",
          };

        
          case DELETE_TRAINER_SUCCESS:
            const filteredTrainers = state.trainers.filter(
              (elem) => elem._id !== action.data._id
            );

            return{
              ...state,
              courses: filteredTrainers,
              deleteError: false,
              errorMessage:"",
            };

          case DELETE_TRAINER_FAILURE:
            return{
              ...state,
              deleteError: action.deleteError,
              errorMessage:"",
            };

      default:
        return state;
    }
  }
  
  export default trainerReducer;