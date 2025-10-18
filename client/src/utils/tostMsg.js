import React from 'react'
import { Slide, toast } from 'react-toastify';
let option = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Slide,
};
const tostMsg = (msg,type) => {
  switch(type){
    case 'success':
    toast.success(msg,option);
    break;
    case 'error':
        toast.error(msg,option);
        break;
    case 'info':
    toast.info(msg,option);
    break;
  }
}
const getMessage= {
    success:(msg)=>tostMsg(msg,'success'),
    error: (msg)=>tostMsg(msg,'error'),
    info:(msg)=>tostMsg(msg,'info')
  }
export default getMessage
