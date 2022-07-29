import Container from '@/components/Container'
import TagItem from '@/components/TagItem'
import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'
import { useLocale } from '@/lib/locale'
import { useRouter } from 'next/router'
import Comments from '@/components/Comments'

const Layout = ({
  children,
  frontMatter,
  fullWidth = false
}) => {
  const locale = useLocale()
  const router = useRouter()
  return (
    <Container
      layout="blog"
      title={frontMatter.title}
      description={frontMatter.digest}
      // date={new Date(frontMatter.publishedAt).toISOString()}
      type="article"
      fullWidth={fullWidth}
    >
      <article>
        <h1 className="font-bold text-3xl text-black dark:text-white">
          {frontMatter.title}
        </h1>
        <div className="my-4 text-right">
          {formatDate(
            frontMatter?.sourcePublishTime,
            BLOG.lang
          )}
        </div>
          <nav className="flex my-4 items-start text-gray-500 dark:text-gray-400">
            <div className="mb-4">
              <p className="md:block">来源：{frontMatter.sourceName}</p>
            </div>
            <div className='flex-grow text-right source-link'>
              <a className='link' href={frontMatter.linkUrl} rel="noopener noreferrer nofollow"  target="_blank">访问原网址</a>
            </div>
            {frontMatter.tags && (
              <div className="flex flex-nowrap max-w-full overflow-x-auto article-tags">
                {frontMatter.tags.map(tag => (
                  <TagItem key={tag} tag={tag} />
                ))}
              </div>
            )}

          </nav>
        {children}
        <div className='dark:text-white' dangerouslySetInnerHTML={{ __html: frontMatter.content }} />
      </article>
      <div className="flex justify-between font-medium text-gray-500 dark:text-gray-400">
        <a>
          <button
            onClick={() => router.push('/')}
            className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
          >
            ← {locale.POST.BACK}
          </button>
        </a>
        <a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
          >
            ↑ {locale.POST.TOP}
          </button>
        </a>
      </div>
      <Comments frontMatter={frontMatter} />
    </Container>
  )
}

export default Layout
