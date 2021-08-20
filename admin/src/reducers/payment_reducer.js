export default function(state = {}, action) {
  switch (action.type) {
    case "FETCH_PAYMENT_SETTINGS":
      return { ...state, payment: action.payload };
    case "UPDATE_PAYMENT_SETTINGS":
      return { ...state, paymentUpdate: action.payload };
    default:
      return state;
  }
}
