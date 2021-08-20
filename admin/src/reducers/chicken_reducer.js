export default function (state = {}, { payload, type, error, success}) {
    switch (type) {
        case "ATTR_GET_BEAK":
            return { ...state, beak: payload };
        case "ATTR_GET_COMB":
            return { ...state, comb: payload };
        case "ATTR_GET_EYE":
            return { ...state, eye: payload };
        case "ATTR_GET_STRIPE":
            return { ...state, stripe: payload };
        case "ATTR_GET_SKIN":
            return { ...state, skin: payload };
        case "ATTR_GET_WATTLE":
            return { ...state, wattle: payload };
        case "SUCCESS":
            return { ...state, success: success }

        case "ALERT":
            return { ...state, alertMsg: payload, isError: error };

        default:
            return state;
    }
}