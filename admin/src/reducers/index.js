import { combineReducers } from "redux";
import user from "./user_reducer";
import attribute from "./attribute_reducer";
import survey from "./survey_reducer";
import message from "./message_reducer";
import feedbacks from "./feedback_reducer";
import payment from "./payment_reducer";
import transaction from "./transcations_reducer";
import chicken from "./chicken_reducer";
import alert from "./alert";

const rootReducer = combineReducers({
  user,
  alert,
  attribute,
  survey,
  message,
  chicken,
  feedbacks,
  payment,
  transaction,
});
export default rootReducer;
