const generateShortCode = ()=>{
    let charecters = 'abcdefghijklmnopqrstuvwxyz'
    let len = 6
    let result = ''

    for(let i=0; i < len; i++){
        const randNumber= Math.floor(Math.random() * charecters.length)
        result += charecters.charAt(randNumber)
    }
    return result
}
module.exports = generateShortCode