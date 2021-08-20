export default function(state = {}, action) {
  switch (action.type) {
    case "LIST_FEEDBACKS":
      return { ...state, feedbacks: action.payload };
    default:
      return state;
  }
}
