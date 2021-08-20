export default function (state = {}, {payload, type, error}) {
  switch (type) {
    case "ATTR_GET_BEAK":
      return { ...state, beak: payload };
    case "ATTR_DELETE_BEAK":
      return { ...state, beakDeleteStatus: payload };
    case "ATTR_UPDATE_BEAK":
      return { ...state, beakUpdateStatus: payload, isError: error };
    case "ADD_NEW_BEAK":
      return { ...state, newBeakAdded: payload, isError: error }
    
    case "ATTR_GET_COMB":
      return { ...state, comb: payload }
    case "ADD_NEW_COMB":
      return { ...state, newCombAdded: payload, isError: error }
    case "ATTR_UPDATE_COMB":
      return { ...state, combUpdateStatus: payload, isError: error };
    
    case "ADD_NEW_WATTLE":
        return { ...state, newCombAdded: payload, isError: error }
    case "ATTR_UPDATE_WATTLE":
      return { ...state, wattleUpdateStatus: payload, isError: error };

    case "ATTR_GET_EYES":
        return { ...state, eyes: payload }
    case "ADD_NEW_EYES":
        return { ...state, newEyesAdded: payload, isError: error }
    case "ATTR_UPDATE_EYES":
      return { ...state, eyesUpdateStatus: payload, isError: error };

    case "ATTR_GET_SKIN":
        return { ...state, skin: payload, isError: error }
    case "ADD_NEW_SKIN":
        return { ...state, newSkinAdded: payload, isError: error }
    case "ATTR_UPDATE_SKIN":
      return { ...state, skinUpdateStatus: payload, isError: error };

    case "ATTR_GET_STRIPE":
        return { ...state, stripe: payload }
    case "ADD_NEW_STRIPE":
        return { ...state, newStripeAdded: payload, isError: error }
    case "ATTR_UPDATE_STRIPE":
      return { ...state, stripeUpdateStatus: payload, isError: error };
    
    case "ALERT":
      return { ...state, alertMsg: payload, isError: error };
      
    default:
      return state;
  }
}
