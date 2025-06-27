const update_storage = (state) => {
  localStorage.setItem("state", JSON.stringify(state));
  return state;
};
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_CART": {
      const newState = {
        ...state,
        cart: action.payload,
      };
      return update_storage(newState);
    }
    default:
      return state;
  }
};
export default reducer;
