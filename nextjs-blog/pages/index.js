/** */
import { useCallback } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout/index'
import utilStyles from '../styles/utils.module.css'
import variables from '../styles/variables.module.scss';

export default function Login({ asyncData }) {
  const router = useRouter()
  const handleClick = useCallback((e) => {
    console.log('click')
  }, [])

  const handleNavigate = useCallback(() => {
    router.push('/blog');
  }, []);

  return (
    <Layout home asyncData={asyncData} color={variables.primaryColor}>
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

const fn = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve([1,2,3,4]);
  }, 3000)
});

const fns = async() => {
  const list = await fn();
  return list;
}


export async function getStaticProps() {
  const list = await fns();
  return {
    props: {
      asyncData: list,
    },
  };
};
