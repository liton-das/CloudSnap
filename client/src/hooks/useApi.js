import axios from 'axios'
import { useState } from 'react'
const useApi=async(url,contents,config)=>{
    const [data,setData]=useState('')
    const [loading,setLoading]=useState(false)
       try {
        setLoading(true)
         await axios.post(url,contents,config)
       } catch (error) {
        setLoading(false)
        console.log(error)
       }
       finally{
        setLoading(false)
       }
    return {
        data,
        loading
    }
}
export default useApi