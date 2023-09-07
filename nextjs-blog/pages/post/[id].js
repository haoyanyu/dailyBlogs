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

export async function getStaticPaths(params) {
  return {
    paths: [{
      params: {
        id: "pre-rendering",
      },
    }],
    fallback: false,
  };
}

/** 此时的getStaticProps有入参params，里面包含id */
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}
