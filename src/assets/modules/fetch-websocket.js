import uuid from './uuid'
import {
  parse
} from 'querystring'
const getTms = () => new Date().getTime();

export default (callback=()=>{}) => {

  const url = `${window.__CONFIG__.url}?tms=${getTms()}&nonce=${uuid(12,16)}`
  const ws = new WebSocket(url)

  ws.addEventListener('open', (e) => {
    // ws.send(stringify(para))
  })
  ws.addEventListener('error', (e) => {
    Promise.reject(e)
  })
  ws.addEventListener('message', (e) => {
    // console.log(JSON.parse(e.data))
    callback(JSON.parse(e.data))
  })
  window.addEventListener('beforeunload',()=>{
    confirm('确定离开此页面吗？')
    ws.close()
  })

}
