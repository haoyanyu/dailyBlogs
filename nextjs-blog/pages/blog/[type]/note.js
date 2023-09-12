import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Note() {

  const router = useRouter();
  console.log('>>>>>>>> router <<<<<<<<', router);
  const { type } = router.query;

  return (
    <div>
      <p>当前页面的文件路径为“pages/blog/[type]/note.js”</p>
      <p>页面路由的pathname是“{router.pathname}”</p>
      <p>页面路由的asPath是“{router.asPath}”</p>
      <p>所以在当前页面可以从router的query中读取出type属性的值： {type}</p>

      <Link href="/blog/animal/monkey/tail">{`跳转到[...all]页面`}</Link>
      <br />
      <Link href={{
        pathname: '/blog/[...all]',
        query: { all: ['animal', 'giraffe', 'neck'] }
      }}>{`用urlObject跳转到[...all]页面`}</Link>

      <br/>
      <br />
      <div>
        <b>遇到同名的参数时，动态路由里的参数会替换掉传统url里query的参数</b>
        <br />
        <code>例如：/blog/animal/note?type=plant路径解析出来的type仍然是animal</code>
      </div>
    </div>
  );
}
