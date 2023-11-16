/** */
import { useCallback } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head';
import classnames from 'classnames';

import ActionBtn from '../components/IndexPage/ActionBtn';

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
    <>
      <Head>
        <title>歪歪的宝藏菜谱</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={indexStyle.wwContainer}>
        <div className={indexStyle.wwContainerBg}></div>
        <div className={indexStyle.wwContent}>
          <h1 className={indexStyle.wwTitle}>歪歪的宝藏菜谱</h1>
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
    </>
  )
}
