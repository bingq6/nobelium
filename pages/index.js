import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import BLOG from '@/blog.config'
import { getNewsList } from '@/lib/news'
import { useEffect, useState, useRef } from 'react'
import useOnScreen from '@/lib/hooks/useOnScreen'
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

const  blog = ({ postList, maxId, minId }) => {
  const ref = useRef(null)
  const [count, setCount] = useState(0)
  const [firstId, setFirstId] = useState(maxId)
  const [lastId, setLastId] = useState(minId)
  const [isLoading, setIsLoading] = useState(false)
  const [isOver, setIsOver] = useState(false)
  const isVisible = useOnScreen(ref)
  const [isFirst, setIsFirst] = useState(true)
  const [list, setList] = useState(postList)
  useEffect(() => {
  if (isOver){
    return
  }
    if (!isLoading && !isFirst && isVisible) {
      setIsLoading(true)
     getNewsList(lastId, 100).then(function(res){
        const data = res.data
        setIsLoading(false)
        if (data.list.length == 0) {
          setIsOver(true)
          return
        }
        setList(list.concat(data.list))
        setFirstId(data.maxId)
        setLastId(data.minId)
      })
    }

    if (isFirst) {
      setIsFirst(false)
    }
  }, [isVisible])
  return (
    <Container title={BLOG.title} description={BLOG.description}>
      {list.map(post => (
        <BlogPost key={post.sort} post={post} />
      ))}
      <div ref={ref} className="flex justify-center">
        {isLoading ? '加载中...' : isOver ? '没有更多消息了' : ''}
      </div>
    </Container>
  )
}

export default blog
