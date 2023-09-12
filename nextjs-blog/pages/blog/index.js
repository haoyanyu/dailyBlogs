import Head from "next/head";
import { useRouter } from 'next/router'
import { format } from 'url'

let counter = 0;

const Blog = () => {
  const router = useRouter()
  const { pathname, query } = router

  const reload = () => {
    console.log('>>>>>>>> format({ pathname, query }) <<<<<<<<', format({ pathname, query }));
    router.push(format({ pathname, query }));
  };
  const incrementCounter = () => {
    const currentCounter = query.counter ? parseInt(query.counter) : 0;
    const href = `/blog?counter=${currentCounter + 1}`;

    /** 指定shallow为true后，只更新路由数据，此时也可以在componentDidUpdate生命周期里监听路由的变化 */
    router.push(href, href, { shallow: true });
  };
  return (
    <div className="font-mono p-2.5">
      <Head>
        <title>我的页面</title>
      </Head>
      <h1 className="font-bold text-2xl m-1">Blog Page</h1>
      <img src="/logo.png" className="w-12 h-12 rounded-md "></img>

      <hr className="my-4" />
      <pre className="text-red-950 font-semibold">浅路由</pre>
      <hr className="my-4" />
      <p>Reload按钮未设置shallow属性，默认为false,每次点击页面都会重新执行，getStaticProps方法每次都会执行</p>
      <button onClick={reload} className="rounded border-2 bg-stone-200 border-slate-50 px-2.5 py-1 hover:bg-slate-100 hover:text-amber-950">Reload</button>

      <br />
      <p>路由跳转中，shallow设置为true时，只会更新路由，不会触发数据查询之类的方法，包括getStaticProps之类的方法都不会再次触发</p>
      <button onClick={incrementCounter} className="rounded border-2 bg-stone-200 border-slate-50 px-2.5 py-1 hover:bg-slate-100 hover:text-amber-950">Change State Counter</button>

      <p>Counter: "{query.counter || 0}".</p>

      <b className="text-3xl font-bold underline">shallow只在相同url间跳转时才生效</b>
    </div>
  );
};

export default Blog;

export async function getStaticProps() {
  const data = {};
  console.log('>>>>>>>> getStaticProps <<<<<<<<', counter++);
  return {
    props: data,
  };
}
