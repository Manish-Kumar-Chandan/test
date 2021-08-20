export default function (state = {}, action) {
  switch (action.type) {
    case "LIST_SURVEY":
      return { ...state, survey: action.payload };
    case "DELETE_SURVEY":
      return { ...state, deleteSurvey: action.payload };

    case "CHANGE_SURVEY_STATUS":
      return { ...state, surveyStatus: action.payload };
    case "DISTRIBUTE_AMOUNT":
      return { ...state, ditribute: action.payload };
    case "SEND_REPORT_LINK":
      return { ...state, sendReport: action.payload };
    case "REFUND_AMOUNT":
      return { ...state, surveyStatus: action.payload };
    default:
      return state;
  }
}
