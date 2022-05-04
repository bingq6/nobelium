import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'
import { useLocale } from '@/lib/locale'
import { IoSunnyOutline, IoMoonSharp } from 'react-icons/io5'
import { useTheme } from 'next-themes'

const NavBar = () => {
  const locale = useLocale()
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
    // { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
    // { id: 2, name: locale.NAV.RSS, to: '/feed', show: true },
    // { id: 3, name: locale.NAV.SEARCH, to: '/search', show: true }
  ]
  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row h-6">
        {links.map(
          link =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black dark:text-gray-50 nav"
              >
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </li>
            )
        )}
         <li className='ml-4 w-5'>
         <ThemeChanger />
         </li>
      </ul>
    </div>
  )
}
const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div>
      <a
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        title={`Toggle dark mode - current ${theme}`}
        className='hover:text-blue-400 cursor-pointer text-xl'
      >
        {theme === 'dark' ? (
          <IoMoonSharp />
        ) : (
          <IoSunnyOutline />
        )}
      </a>
    </div>
  )
}
const Header = ({ navBarTitle, fullWidth }) => {
  const useSticky = !BLOG.autoCollapsedNavBar
  const navRef = useRef(null)
  const sentinalRef = useRef([])

  const handler = ([entry]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current?.classList.add('sticky-nav-full')
      } else {
        navRef.current?.classList.remove('sticky-nav-full')
      }
    } else {
      navRef.current?.classList.add('remove-sticky')
    }
  }
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler)
    obvserver.observe(sentinalRef.current)
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentinalRef])
  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${!fullWidth ? 'max-w-2xl px-4' : 'px-4 md:px-24'
          }`}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <img className='logo' src='/logo.png' />
          </Link>
          {navBarTitle
            ? (
              <p className="ml-2 font-medium text-day dark:text-night header-name">
                {navBarTitle}
              </p>
            )
            : (
              <p className="ml-2 font-medium text-day dark:text-night header-name">
                {BLOG.title},{' '}
                <span className="font-normal">{BLOG.description}</span>
              </p>
            )}
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Header
