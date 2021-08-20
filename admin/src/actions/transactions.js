import axios from "axios";

export function fetchTransactions() {
  const req = axios
    .post("/surveystage/withdrawal")
    .then((resp) => resp.data)
    .catch(console.error());
  return {
    type: "GET_TRANSACTIONS",
    payload: req,
  };
}

export function paymentAction(data) {
  const req = axios
    .post("/surveystage/changestatuswithdrawal", data)
    .then((resp) => resp.data)
    .catch(console.error());
  return {
    type: "UPDATE_TRANSACTION",
    payload: req,
  };
}
