import uuid from "./uuid"
import { stringify } from "querystring"
const getTms = () => new Date().getTime()
const baseRequest = {
  method: "POST",
  headers: new Headers({
    "Content-type": "application/x-www-form-urlencoded"
  })
}
export default (api, para = {}) => {
  const url = `${window.__CONFIG__.url1}${api}?tms=${getTms()}&nonce=${uuid(
    12,
    16
  )}`
  return new Promise((resolve,reject)=>{

    fetch(url, { ...baseRequest, body: stringify(para) })
      .then(res => {
        return res.json()
      })
      .then(data => {
        if (data.ResponseID == 0) {
          resolve(data.Data)
        } else {
          reject()
        }
      })
  })
}
