import { useRouter } from 'next/router'
import omit from 'lodash/omit';

import Layout from "../../components/layout"

import ReadCsv from './components/upload-csv';
import QuickEdit from './components/quick-edit';
import Popover from './components/popover';

const ModuleCom = {
  'read-csv': ReadCsv,
  'quick-edit': QuickEdit,
  'popover': Popover
};

export default function EasterEgg(props) {
  const { pageTitle } = props;
  const componentProps = omit(props, ['pageTitle']);
  const router = useRouter();
  const { query = {} } = router;
  /** 要访问的组件类型 */
  const moduleName = query.module;
  const Module = ModuleCom[moduleName];
  return (
    <Layout title={pageTitle}>
      {
        !Module ? <div>你瞅啥呢？</div> : <Module {...componentProps} />
      }
    </Layout>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      pageTitle: '彩蛋～～'
    }
  }
}

// 动态路由页面，如果设置了getStaticProps，则必须设置getStaticPaths
export async function getStaticPaths() {
  return {
    paths: [
      { params: { module: 'read-csv' } },
    ],
    fallback: 'blocking'
  }
}