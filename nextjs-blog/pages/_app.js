/** 一个顶级组件，可以用来保存一些全局的东西，会在所有页面间通用 */
/** 可以用来加载全局的css */
/** 更新后该文件后，需要重启一下 */
import '../styles/global.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}