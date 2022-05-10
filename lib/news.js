import BLOG from '@/blog.config'
const baseUrl = BLOG.baseUrl
//获取下一页News
export async function getNewsList(maxId, size) {
    let url = baseUrl + "/api/news/getList?size=" + (size || 50)
    if (maxId) {
        url += "&maxId=" + encodeURIComponent(maxId)
    }

    const res = await fetch(url)
    return res.json()
}
//获取最新的News
export async function getLatestNewsList(maxId) {
    const res = await fetch(baseUrl + "/api/news/getLatestList?maxId=" + maxId)
    return res.json()
}
//获取news详情
export async function getNews(sort) {
    const res = await fetch(baseUrl + "/api/news/get?id=" + sort)
    return res.json()
}
//获取刚刚看过
export async function getNewsItem(sort){
    const res = await fetch(baseUrl + "/api/news/getItem?id=" + sort)
    return res.json()
}
//获取jsApi签名
export async function getJsApiSignature(url){
    const res = await fetch(baseUrl + "/api/mp/jsapi/"+BLOG.appid+ "/getJsApiSignature?url=" + encodeURIComponent(url))
    return res.json()
}
//search News
export async function doSearch(s) {
    const res = await fetch(baseUrl + "/api/news/search?s=" + s)
    return res.json()
}