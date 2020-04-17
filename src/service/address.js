import axios from "axios";
import { getURL } from "@/common/tool/tool";
import * as api from "./apiList";

export function getProvinceList(params) {
  const url = getURL(api.GETPROCINCELIST);
  return axios
    .get(url, {
      params: params
    })
    .then(resp => {
      return Promise.resolve(resp);
    })
    .catch(err => {
      console.log(err);
    });
}

export function getCityList(params) {
  const url = getURL(api.GETCITYLIST);
  return axios
    .get(url, {
      params: params
    })
    .then(resp => {
      return Promise.resolve(resp);
    })
    .catch(err => {
      console.log(err);
    });
}
