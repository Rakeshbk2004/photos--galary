export function favouriteReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAV": {
      const id = action.payload;
      const exists = state.includes(id);
      return exists ? state.filter((item) => item !== id) : [...state, id];
    }
    default:
      return state;
  }
}
