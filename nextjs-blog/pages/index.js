import { useCallback } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';

export default function Login() {
  const router = useRouter()
  const handleClick = useCallback((e) => {
    console.log('click')
  }, [])

  const handleNavigate = useCallback(() => {
    router.push('/blog');
  }, []);

  return (
    <div>
      Home Page
      <Link href="/blog">
        Blog
      </Link>
      <a onClick={handleNavigate}>Blog</a>
      <button onClick={handleClick}>点我</button>
    </div>
  )
}