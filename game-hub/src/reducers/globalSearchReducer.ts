export interface Action {
  type: "SEARCH";
  payload: string;
}

function globalSearchReducer(state: string, action: Action) {
  if (action.type === "SEARCH") {
    return action.payload;
  }
  return state;
}

export default globalSearchReducer;
