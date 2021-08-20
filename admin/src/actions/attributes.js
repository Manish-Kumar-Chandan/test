import axios from "axios";
import { getCookie } from "./user";

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

export function deleteBeak(id) {
  const token = getCookie("hashToken");
  // console.log(token)
  const req = axios
    .delete(
      "/api/attributes/beakById",
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

export async function addBeak(name) {
  const token = getCookie("hashToken");
  const req = await axios.post("/api/attributes/beak",{name},{ token }).then(res=>{return res}).catch(err=>{return err.response.data})
  if (req.status===201 || req.status===200){
    return {
      type: "ADD_NEW_BEAK",
      payload: true,
      error: false
    };
  }else{
    return {
      type: "ALERT",
      payload: req.message,
      error: true
    }
  }
}

export async function updateBeak(id, name) {
  const token = getCookie("hashToken");
  //console.log(token)
  const req = await axios
    .patch(
      "/api/attributes/beak",
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
  }else{
    return {
      type: "ATTR_UPDATE_BEAK",
      payload: true,
      error: false
    };
  }
}
