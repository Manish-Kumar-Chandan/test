export default function (state = {}, {payload, type}) {
    switch (type) {
      case "ATTR_GET_WATTLE":
        return { ...state, wattle: payload };
      default:
        return state;
    }
  }
  