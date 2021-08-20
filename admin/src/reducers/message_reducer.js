export default function(state = { response: false }, action) {
  switch (action.type) {
    case "SEND_MESSAGE":
      return { ...state, newMessage: action.payload };
    case "FETCH_CHAT":
      return { ...state, chat: action.payload };
    default:
      return state;
  }
}
