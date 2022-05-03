const baseUrl = "http://localhost:3000"

export async function getNewsList(maxId, size) {

    let url =baseUrl+ "/api/news/getList?size=" + (size || 100)
    if (maxId) {
        url += "&maxId=" + encodeURIComponent(maxId)
    }

    const res = await fetch(url)
    return res.json()
}

export async function getNews(sort){
    const res=await fetch(baseUrl+"/api/news/get?id="+sort)
    return res.json()
}