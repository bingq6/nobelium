import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import BLOG from '@/blog.config'
import { getNewsList, getLatestNewsList, getNewsItem } from '@/lib/news'
import { useEffect, useState, useRef } from 'react'
import useOnScreen from '@/lib/hooks/useOnScreen'
import useInterval from "@/lib/hooks/useInterval";
import useWeiXinShare from "@/lib/hooks/useWeiXinShare";
import {getBaseLink} from '@/lib/utils'
export async function getStaticProps() {
  const res = await getNewsList(null, 100)
  const { maxId, minId, list } = res.data
  return {
    props: {
      postList: list,
      maxId,
      minId
    },
    revalidate: 60
  }
}
const blog = ({ postList, maxId, minId }) => {
  const selectId = typeof location !== 'undefined' && location.href.lastIndexOf("#") > -1 && location.href.split('#')[1]
  const ref = useRef(null)
  const [firstId, setFirstId] = useState(maxId)
  const [lastId, setLastId] = useState(minId)
  const [isLoading, setIsLoading] = useState(false)
  const [isOver, setIsOver] = useState(false)
  const isVisible = useOnScreen(ref)
  const [list, setList] = useState(postList)
  const [newList, setNewList] = useState(null)
  const flushLatestNews = () => {
    getLatestNewsList(firstId).then(function (res) {
      const data = res.data
      if (data.list.length == 0) {
        return
      }
      setNewList(data.list)
      setFirstId(data.maxId)
    })
  }
  useInterval(flushLatestNews, 180 * 1000)
  useEffect(() => {
    flushLatestNews()
    if (selectId) {
      const index = list.findIndex((item) => item.sort == selectId)
      if (index != -1) {
        setList(list.splice(index, 1).concat(list))
      } else {
        const res = getNewsItem(selectId).then((res) => {
          if (res.code == 0) {
            setList([res.data, ...list])
          }
        })
      }
    }
  }, [])
  useEffect(() => {
    if (isOver) {
      return
    }
    if (!isLoading && isVisible) {
      setIsLoading(true)
      getNewsList(lastId, 50).then(function (res) {
        const data = res.data
        setIsLoading(false)
        if (data.list.length == 0) {
          setIsOver(true)
          return
        }
        setList(list.concat(data.list))
        setLastId(data.minId)
      })
    }
  }, [isVisible])
  useWeiXinShare(BLOG.title,BLOG.description,null,null)
  return (
    <Container title={BLOG.title} description={BLOG.description}>
      {newList && newList.length > 0 &&
        <div className='notice_message'>
          <div onClick={() => {
            setList(newList.concat(list))
            setNewList(null)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }} className='notice_content'>有 {newList.length} 个新资讯，点击查看</div><div onClick={() => {
            setNewList(null)
          }} className='notice_close'>✕</div>
        </div>
      }
      {list.map(post => (
        <BlogPost key={post.sort} post={post} />
      ))}
      <div ref={ref} className="flex justify-center text-gray-400">
        {isLoading ? '加载中...' : isOver ? '没有更多消息了' : ''}
      </div>
    </Container>
  )
}

export default blog
