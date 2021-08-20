import axios from "axios";

export function fetchFeedbacks() {
  const req = axios
    .get("/surveystage/feedbacks")
    .then(resp => resp.data)
    .catch(console.error());
  return {
    type: "LIST_FEEDBACKS",
    payload: req
  };
}
