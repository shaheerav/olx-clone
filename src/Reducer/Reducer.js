import { ACTIONS } from "./action";
const intialState = {
  username: "",
  email: "",
  phone: "",
  password: "",
  loading: false,
  error: null,
  formError: {},
};
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_FIELD: // Using ACTIONS from the imported object
      return { ...state, [action.payload.field]: action.payload.value };

    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };

    case ACTIONS.SET_FORM_ERRORS:
      return { ...state, formErrors: action.payload };

    case ACTIONS.RESET:
      return intialState; // Assuming initialState is imported or defined above

    default:
      return state;
  }
};

export default reducer;
