export default function (state = {}, action) {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return { ...state, transactions: action.payload };
    case "UPDATE_TRANSACTION":
      return { ...state, transactionUpdate: action.payload };
    default:
      return state;
  }
}
