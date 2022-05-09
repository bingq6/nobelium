import Layout from '@/layouts/layout'
import { getNews } from "@/lib/news";
import useWeiXinShare from "@/lib/hooks/useWeiXinShare";
import {getBaseLink} from '@/lib/utils'

const BlogPost = ({ post }) => {
  useWeiXinShare(post.title,post.digest,"#"+post.sort,null)
  if (!post) return null
  return (
    <Layout
      frontMatter={post}
    />
  )
}

export async function getStaticPaths () {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export async function getStaticProps ({ params: { id } }) {
  const res = await getNews(id) 
  const {data:post}=res;
  return {
    props: { post },
    revalidate: false
  }
}

export default BlogPost
