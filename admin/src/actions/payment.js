import axios from "axios";

export function fetchPaymentSettings() {
  const req = axios
    .get("/surveystage/paymentsettings")
    .then(resp => resp.data)
    .catch(console.error());

  return {
    type: "FETCH_PAYMENT_SETTINGS",
    payload: req
  };
}

export function updatePaymentSettings(data) {
  const req = axios
    .put("/surveystage/paymentsettings", data)
    .then(resp => resp.data)
    .catch(console.error());

  return {
    type: "UPDATE_PAYMENT_SETTINGS",
    payload: req
  };
}
