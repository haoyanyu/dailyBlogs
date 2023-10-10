import Layout from "../../components/layout/index";
import { getPostData } from "../../lib/posts";
import { useRouter } from 'next/router';

export default function Post({ postData }) {

  const router = useRouter();

  const { id } = router.query;

  return (
    <Layout>
      <h1>当前页面的id是{id}</h1>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

// 用于想要静态渲染动态路由的页面时
// getStaticPaths 方法返回一个数组paths，数组里的路径会被next预渲染为html
// 返回的由对象{params: {}}构成，params由动态路由的属性构成
// 例如本页面的路由里动态属性是id，所以params里有id属性
export async function getStaticPaths(params) {
  return {
    paths: [{
      params: {
        /**
         * params里的属性命必须跟路由的参数一致，当路由为[...all]时，params里必须有all属性，此时all属性需要是一个数组
         */
        id: "pre-rendering",
      },
    }],
    /**
     * 必须指定的属性
     * false: getStaticPaths的paths里未返回的路径全部被处理成404，主要用于：该动态路由对应的页面不多或页面不频繁增加的场景
     * 
     * true: 在执行getStaticProps时就会预渲染出html，当getStaticProps执行完拿到数据后，再重新渲染出完整的页面。可以根据router.isFallback判断当前页面是否在渲染中
     * 不在paths里的路径也不会返回404；用于有大量依赖于数据的静态页面
     * 
     * blocking: 不在paths里的路径不会返回404, 当首次请求该页面时会进行ssr并返回生成的html，html会添加到预渲染页面列表中，之后再请求时直接返回
     */

    fallback: false,
  };
}

// 在使用了动态路由的页面里使用该方法时，必须使用getStaticPaths
/** 此时的getStaticProps有入参params，里面包含id */
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}
