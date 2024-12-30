import { IconStamp, IconPen, IconGift, IconTool } from '@arco-design/web-react/icon';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ImgPath from '../../public/images/index-bg.png';

import Layout from "../../components/layout"
import Carousel from '../../components/Carousel';
import StaticNumber from '../../components/StaticNumber';
import Message from '../../components/Message';
import styles from './index.module.scss';
import { useCallback, useMemo, useRef, useState } from 'react';

export default function Edit(props) {

  const { menuDetail } = props;
  const { title, pictures, description, id, successTimes = 6 } = menuDetail;
  const carouselRef = useRef(null);
  const numberRef = useRef(null);
  const router = useRouter();
  const { query = {} } = router;

  const [stampedTimes, setStampedTimes] = useState(successTimes);
  // 判断是否是预览模式，根据query里的view属性值
  const isView = useMemo(() => {
    const { view } = query;
    return Boolean(+view);
  }, [query]);

  const handleStamp = useCallback(() => {
    numberRef.current.countUp(stampedTimes + 1);
    setStampedTimes(stampedTimes + 1);
    Message.success(`恭喜🎉，又成功了一次！${stampedTimes + 1}`);
  }, [stampedTimes]);

  return (
    <Layout title={title}>
      <div className={classnames(styles.menuContent, styles[`menuBg-${(id % 8) + 1}`])}>
        <div className={styles.pictures}>
          <Carousel ref={carouselRef} autoPlay={false} dotsPosition="bottom">
            {
              pictures.map((item, index) => {
                return (
                  <div key={item.id}>
                    <div className={styles.image}>
                      <Image alt="图片" src={ImgPath} className={styles.image} />
                    </div>
                  </div>
                )
              })
            }
          </Carousel>
        </div>
        <div className={styles.text}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className={styles.footer}>
          <IconStamp onClick={handleStamp} />
          {
            !isView && <IconPen />
          }
          <StaticNumber ref={numberRef} value={successTimes} countUp />
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
          },
          {
            url: '',
            id: 3,
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
