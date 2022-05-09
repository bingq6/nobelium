export function checkWeiXin(){
    let ua = navigator.userAgent.toLowerCase()
return (ua.match(/MicroMessenger/i) == "micromessenger")
}

export function getBaseLink(){
    return /http[s]?:\/\/.*?\//.exec(location.href+"/")[0]
}