const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_CART":
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
