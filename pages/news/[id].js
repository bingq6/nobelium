import Layout from '@/layouts/layout'
import { getNews } from "@/lib/news";

const BlogPost = ({ post }) => {
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
    revalidate: 5*60
  }
}

export default BlogPost
