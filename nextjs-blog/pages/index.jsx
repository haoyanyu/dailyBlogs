/** */
import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head';
import classnames from 'classnames';

import '../utils/fn-chain';

import ActionBtn from '../components/IndexPage/ActionBtn';
import Layout from '../components/layout/index';
import indexStyle from '../styles/index-page.module.scss';

export default function Login({ asyncData }) {
  const router = useRouter()

  // 跳转方法
  const handleNavigate = useCallback((type) => {
    const urlMap = {
      add: '/add',
      list: '/list'
    }
    router.push(urlMap[type])
  }, []);

  return (
    <div>
      <Head>
        <meta charSet='utf-8' />
      </Head>
      <Layout title="歪歪的宝藏菜谱">
        <div className={indexStyle.wwContainer}>
          <div className={indexStyle.wwContainerBg}></div>
          <div className={indexStyle.wwContent}>
            <h1 className="font-mono mb-44 text-4xl font-bold antialiased text-stone-100">YY's MENU</h1>
            <div className={indexStyle.wwBtns}>
              <div className={classnames(indexStyle.wwBtn, indexStyle.wwAddBtn)}>
                <ActionBtn text="add add" icon="add" onClick={() => handleNavigate('add')} />
              </div>
              <div className={classnames(indexStyle.wwBtn, indexStyle.wwViewBtn)}>
                <ActionBtn text="look look" icon="view" onClick={() => handleNavigate('list')} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}
