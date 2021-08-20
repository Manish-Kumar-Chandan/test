import axios from "axios";
import { getCookie } from "../user";

export function getComb() {
  const token = getCookie("hashToken");
  // console.log(token)
  const req = axios
    .get("/api/attributes/eyes", { token })
    .then((resp) => {
      //console.log(resp);
      return resp.data;
    })
    .catch(console.error());
  return {
    type: "ATTR_GET_EYES",
    payload: req,
  };
}

export function deleteBeak(id) {
  const token = getCookie("hashToken");
  // console.log(token)
  const req = axios
    .delete(
      "/api/attributes/eyesById",
      {
        params: {
          id,
        },
      },
      { token }
    )
    .then((resp) => {
      return resp;
    })
    .catch((err) => {
      console.log(err);
      return {
        type: "ATTR_DELETE_BEAK",
        payload: false,
      };
    });

  if (req)
    return {
      type: "ATTR_DELETE_BEAK",
      payload: true,
    };
}

export async function addComb(name) {
  const token = getCookie("hashToken");
  //console.log(token)
  const req = await axios
    .post(
      "/api/attributes/eyes",
      {
        name
      },
      { token }
    )
    .then((resp) => {
      //console.log(resp,'Sucesss')
      return resp;
    })
    .catch((err) => {
      //console.log('Error from Server', err.response.data.message);
        return {
        type: "ALERT",
        payload: err.response.data.message,
      };
    });
   console.log(req)
  if (req.type==="ALERT"){
    return {
      type: "ALERT",
      payload: req.payload, 
      error:true
    }
  }else{
      return {
         type: "ADD_NEW_EYES",
          payload: true,
        }
    }
}

export async function updateBeak(id, name) {
  const token = getCookie("hashToken");
  //console.log(token)
  const req = await axios
    .patch(
      "/api/attributes/eyes",
      {
        id,
        name,
      },
      { token }
    )
    .then((resp) => {
      //console.log(resp)
      return resp;
    })
    .catch((err) => {
      console.log(err);
      return {
        type: "ALERT",
        payload: err.response.data.message,
      };
    });

  if (req.type==="ALERT"){
    return {
      type: "ALERT",
      payload: req.payload,
      error: true
    }
  }
  else{
    return {
      type: "ATTR_UPDATE_EYES",
      payload: true,
      error: false
    };
  }
}
