import axios from "axios";

export function sendMessage(data) {
  const req = axios
    .post("/surveystage/message", data)
    .then(resp => resp.data)
    .catch(console.error());

  return {
    type: "SEND_MESSAGE",
    payload: req
  };
}

export function getSurveyChat(id) {
  const req = axios
    .post("/surveystage/message/chat", { id })
    .then(resp => resp.data)
    .catch(console.error());

  return {
    type: "FETCH_CHAT",
    payload: req
  };
}
