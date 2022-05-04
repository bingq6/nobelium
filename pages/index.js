import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import BLOG from '@/blog.config'
import { getNewsList, getLatestNewsList } from '@/lib/news'
import { useEffect, useState, useRef } from 'react'
import useOnScreen from '@/lib/hooks/useOnScreen'
import useInterval from "@/lib/hooks/useInterval";
export async function getStaticProps() {
  const res = await getNewsList(null, 100)
  const { maxId, minId, list } = res.data
  return {
    props: {
      postList: list,
      maxId,
      minId
    },
    revalidate: 10
  }
}
const blog = ({ postList, maxId, minId }) => {
  const ref = useRef(null)
  const [firstId, setFirstId] = useState(maxId)
  const [lastId, setLastId] = useState(minId)
  const [isLoading, setIsLoading] = useState(false)
  const [isOver, setIsOver] = useState(false)
  const isVisible = useOnScreen(ref)
  const [isFirst, setIsFirst] = useState(true)
  const [list, setList] = useState(postList)
  const [newList, setNewList] = useState(null)
  useInterval(() => {
    getLatestNewsList(firstId).then(function (res) {
      const data = res.data
      if (data.list.length == 0) {
        return
      }
      setNewList(data.list)
      setFirstId(data.maxId)
    })
  }, 180*1000)

useEffect(() => {
  if (isOver) {
    return
  }
  if (!isLoading && !isFirst && isVisible) {
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

  if (isFirst) {
    setIsFirst(false)
  }
}, [isVisible])
return (
  <Container title={BLOG.title} description={BLOG.description}>
    {newList && newList.length > 0 &&
      <div className='notice_message'>
        <div onClick={() => {
          setList(newList.concat(list))
          setNewList(null)
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
