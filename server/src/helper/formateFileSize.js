const formateFileSize=(bytes)=>{
    if(bytes < 1024){
        return `${bytes}B`
    }else if(bytes < 1024 * 1024){
        return `${(bytes / 1024).toFixed(2)}KB`
    }else {
        return `${(bytes /(1024 *1024)).toFixed(2)}MB`
    }
}
module.exports=formateFileSize