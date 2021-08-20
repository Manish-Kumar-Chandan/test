import axios from "axios";
import { getCookie } from "../user";

export async function createChicken(name, breed, beakUuid, combUuid, eyeUuid, wattleUuid, skinUuid, stripeUuid) {
  const token = getCookie("hashToken");
  // console.log(token)

  const req = await axios
    .post("/api/add/chickens",{name, breed, beakUuid, combUuid, eyeUuid, wattleUuid, skinUuid, stripeUuid})
    .then((resp) => {
      return resp.data;
    })
    .catch((error)=>{
      console.log(error)
      return {
        type: 'ALERT',
        error: error.response.data.message
      }
    });
    if(req){
      return {
        type: "SUCCESS",
        success: true,
      };
    }
}

export async function getBeak() {
  const token = getCookie("hashToken");
  // console.log(token)
  const req = await axios
    .get("/api/attributes/beak", { token })
    .then((resp) => {
      //console.log(resp);
      return resp.data;
    })
    .catch(console.error());
  return {
    type: "ATTR_GET_BEAK",
    payload: req,
  };
}

export function getComb() {
    const token = getCookie("hashToken");
    const req = axios
      .get("/api/attributes/comb", { token })
      .then((resp) => {
        return resp.data;
      })
      .catch(console.error());
    return {
      type: "ATTR_GET_COMB",
      payload: req,
    };
  }

export function getEye() {
    const token = getCookie("hashToken");
    const req = axios
      .get("/api/attributes/eyes", { token })
      .then((resp) => {
        return resp.data;
      })
      .catch(console.error());
    return {
      type: "ATTR_GET_EYE",
      payload: req,
    };
}

export function getSkin() {
    const token = getCookie("hashToken");
    // console.log(token)
    const req = axios
      .get("/api/attributes/skins", { token })
      .then((resp) => {
        //console.log(resp);
        return resp.data;
      })
      .catch(console.error());
    return {
      type: "ATTR_GET_SKIN",
      payload: req
    };
  }

  export function getStripe() {
    const token = getCookie("hashToken");
    console.log('Stripe ',token)
    const req = axios
      .get("/api/attributes/stripes", { token })
      .then((resp) => {
        return resp.data;
      })
      .catch(console.error());
    return {
      type: "ATTR_GET_STRIPE",
      payload: req
    };
  }

  export function getWattle() {
    const token = getCookie("hashToken");
    console.log('Stripe ',token)
    const req = axios
      .get("/api/attributes/wattle", { token })
      .then((resp) => {
        return resp.data;
      })
      .catch(console.error());
    return {
      type: "ATTR_GET_WATTLE",
      payload: req
    };
  }

