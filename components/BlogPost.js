import Link from 'next/link'
import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'

const BlogPost = ({ post }) => {
  const artcile = <article key={post.sort} className="mb-6 md:mb-8">
    <header className="flex flex-col justify-between md:flex-row md:items-baseline">
      <h2 className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-gray-100">
        {post.title}
      </h2>
      <time className="flex-shrink-0 text-gray-600 dark:text-gray-400">
        {formatDate(post?.sourcePublishTime, BLOG.lang)}
      </time>
    </header>
    <main>
      <p className="leading-8 text-gray-700 dark:text-gray-300 text-justify break-all">
        {post.digest}
      </p>
    </main>
  </article>

  if (post.showType == 1) {
    return (<Link href={post.linkUrl}>
      <a target='_blank' rel="noopener noreferrer nofollow" >
        {artcile}
      </a>
    </Link>)
  }
  return (<Link prefetch={false} href={`/news/${post.sort}`}>
    <a target='_blank'>
      {artcile}
    </a>
  </Link>)
}



export default BlogPost
