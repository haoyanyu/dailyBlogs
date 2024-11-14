import { IconStamp, IconPen, IconGift, IconTool } from '@arco-design/web-react/icon';
import classnames from 'classnames';
import Layout from "../../components/layout"
import styles from './index.module.scss';

export default function Edit(props) {

  const { menuDetail } = props;
  const { title, pictures, description, id } = menuDetail;

  return (
    <Layout title={title}>
      <div className={classnames(styles.menuContent, styles[`menuBg-${(id % 8) + 1}`])}>
        <div className={styles.pictures}>

        </div>
        <div className={styles.text}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className={styles.footer}>
          <IconStamp />
          <IconPen />
          <IconGift />
          <IconTool />
        </div>
      </div>
    </Layout>
  )
}


const getDetail = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        title: `好吃的雪花酥${id}`,
        description: '从***学来的',
        tryTimes: 3 + id,
        success: 2,
        failed: 1,
        pictures: [
          {
            url: '',
            id: 1,
          },
          {
            url: '',
            id: 2,
          }
        ],
        id,
      })
    }, 500);
  })
}
export async function getStaticProps(context) {
  const { params } = context;
  const data = await getDetail(params.id);
  return {
    props: {
      menuDetail: data
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          // 此处必须叫id，跟文件名保持一致，否则会失败
          id: '1'
        }
      },
      {
        params: {
          // 此处必须叫id，跟文件名保持一致，否则会失败
          id: '2'
        }
      },
      {
        params: {
          // 此处必须叫id，跟文件名保持一致，否则会失败
          id: '3'
        }
      },
      {
        params: {
          // 此处必须叫id，跟文件名保持一致，否则会失败
          id: '4'
        }
      }
    ],
    fallback: 'blocking'
  }
}
