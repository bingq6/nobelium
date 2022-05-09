import { useEffect } from 'react'
import { checkWeiXin, getBaseLink } from '@/lib/utils'
import { getJsApiSignature } from '@/lib/news'
export default function useWeiXinShare(title, desc, link, imgUrl) {
    useEffect(() => {
        const baseLink = getBaseLink()
        imgUrl=baseLink+(imgUrl||'logo.png') 
        link=baseLink+ (link||'')
        const wx = require('weixin-js-sdk')
        if (typeof wx === 'undefined') {
            return
        }
        if (!checkWeiXin()) {
            return
        }
        getJsApiSignature(location.href.split('#')[0]).then((res) => {
            if (res.code !== 0) {
                return
            }
            const data = res.data
            wx.config({
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名
                jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData'] // 必填，需要使用的JS接口列表
            })
        })

        wx.ready(() => {
            wx.updateAppMessageShareData({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link:  link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: imgUrl, // 分享图标
            })
            wx.updateTimelineShareData({
                title: title, // 分享标题
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: imgUrl, // 分享图标
            })
        })
    }, [])
}