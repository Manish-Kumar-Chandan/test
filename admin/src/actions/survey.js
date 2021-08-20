import axios from "axios";

export function fetchSurveys() {
  const req = axios
    .get("/surveystage")
    .then((resp) => resp.data)
    .catch(console.error());
  return {
    type: "LIST_SURVEY",
    payload: req,
  };
}

export function deleteSurvey(id) {
  const removeData = {
    Key: {
      id: id,
    },
  };

  const req = axios
    .delete("/surveystage", {
      data: removeData,
    })
    .then((resp) => resp.data)
    .catch(console.error());
  return {
    type: "DELETE_SURVEY",
    payload: req,
  };
}

export function changeSurveyStatus(id, type) {
  const req = axios
    .post("/surveystage/changesurveystatus", { id, type })
    .then((resp) => resp.data)
    .catch(console.error());
  return {
    type: "CHANGE_SURVEY_STATUS",
    payload: req,
  };
}

export function distribute(id, userId) {

  axios
  .post("/sendReportLink", { id, userId })
  .then((resp) => resp.data)
  .catch(console.error());

  const req = axios
    .post("/surveystage/distributeamount", { id })
    .then((resp) => resp.data)
    .catch(console.error());
  return {
    type: "DISTRIBUTE_AMOUNT",
    payload: req,
  };
}

export function sendReportLink(id, userId) {
  const req = axios
    .post("/sendReportLink", { id, userId })
    .then((resp) => resp.data)
    .catch(console.error());
  return {
    type: "SEND_REPORT_LINK",
    payload: req,
  };
}

export function refundAmount(data) {
  const req = axios
    .post("/surveystage/refundamount", { data })
    .then((resp) => resp.data)
    .catch(console.error());
  return {
    type: "REFUND_AMOUNT",
    payload: req,
  };
}
