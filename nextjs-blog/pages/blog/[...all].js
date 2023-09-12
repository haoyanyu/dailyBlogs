import { useRouter } from 'next/router';

export default function Note() {

  const router = useRouter();

  return (
    <div>
      <p>当前路由对应的文件夹名称为"[...all].js"</p>
      <i>文件名为两层中括号时，表示是可选的，即只要是/blog开头的路由，都会被该页面匹配上，只不过/blog路由的query是 {'{ }'} 而已</i>
      <p>这个页面里，router.query对象里会有一个叫做all的属性</p>
      <code>
        <p>内容如下：</p>
        <pre>
        {JSON.stringify(router.query)}
        </pre>
      </code>

      <div>
        <b>注意：</b>
        <p>/blog/animal/note不能被该页面匹配，因为它有单独定义的路由页面；/blog/animal/giraffe可以被该页面匹配</p>
      </div>
    </div>
  );
}
