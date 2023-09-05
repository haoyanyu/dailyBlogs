/** */
import { useCallback } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout/index'
import utilStyles from '../styles/utils.module.css'

export default function Login() {
  const router = useRouter()
  const handleClick = useCallback((e) => {
    console.log('click')
  }, [])

  const handleNavigate = useCallback(() => {
    router.push('/blog');
  }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://www.nextjs.cn/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  )
}