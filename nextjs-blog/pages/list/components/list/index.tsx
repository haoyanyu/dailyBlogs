import React, { useCallback, useState, useRef } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router'
import { IconStamp, IconPen, IconGift, IconTool } from '@arco-design/web-react/icon';

import Operations from '../../../../components/Operations';
import WayPoint from '../../../../components/WayPoint';
import CardItem from '../card-item';
import LineItem from '../line-item';
import useAutoWidth from '../../hooks/useAutoWidth';
import styles from './index.module.scss';

interface IProps {
  type?: string;
  data: any[];
  loadMore?: (params?: any) => Promise<any>;
}

const isLineLast = (index: number, count: number) => {
  return (index + 1) % count === 0;
}

const promiseFn = () => Promise.resolve();
const ListWithInfiniteScroll: React.FC<IProps> = (props) => {
  const { type = 'card', data = [], loadMore = promiseFn } = props;
  const router = useRouter();
  const contentRef = useRef(null);
  const { width, gap, count } = useAutoWidth(contentRef, {});
  const [loading, setLoading] = useState(false);

  const handleLoadMore = useCallback((params: any) => {
    if (loading) return;
    setLoading(true);
    loadMore(params).finally(() => {
      setLoading(false);
    });
  }, [loadMore, loading]);

  const goToDetail = useCallback((id: number) => {
    if (id) {
      const url = `/edit/${id}?view=1`;
      router.push(url)
    }
  }, [router]);

  if (!data.length) return null;


  return (
    <div className={styles.ListWrapper}>
      <div
        className={classnames(
          styles.ContentList,
          {
            [styles.CardMode]: type === 'card',
            [styles.ListMode]: type === 'list'
          }
        )}
        ref={contentRef}
      >
        {
          data.map ((item, index) => {
            if (type === 'card') {
              return (
                <CardItem
                  key={item.id}
                  index={index}
                  width={width}
                  gap={isLineLast(index, count) ? 0 : gap}
                  data={item}
                  operation={(
                    <div className={styles.CardMetaFooter}>
                      <div className={styles.Action}>
                        <IconStamp />
                      </div>
                      <div className={styles.Operations}>
                        <Operations maxVisible={2}>
                          <div className={styles.OperationsBtn}>
                            <IconPen />
                          </div>
                          <div className={styles.OperationsBtn}>
                            <IconGift />
                          </div>
                          <div className={styles.OperationsBtn}>
                            <IconTool />
                          </div>
                          <div className={styles.OperationsBtn}>
                            <IconTool />
                          </div>
                        </Operations>
                      </div>
                    </div>
                  )}
                />
              )
            } else {
              return (
                <div onClick={() => goToDetail(item.id)} key={item.id}>
                  <LineItem
                    index={index}
                    data={item}
                    operation={(
                      <div className={styles.CardMetaFooter}>
                        <div className={styles.Action}>
                          <IconStamp />
                        </div>
                        <div className={styles.Operations}>
                          <Operations maxVisible={2}>
                            <div className={styles.OperationsBtn}>
                              <IconPen />
                            </div>
                            <div className={styles.OperationsBtn}>
                              <IconGift />
                            </div>
                            <div className={styles.OperationsBtn}>
                              <IconTool />
                            </div>
                            <div className={styles.OperationsBtn}>
                              <IconTool />
                            </div>
                          </Operations>
                        </div>
                      </div>
                    )}
                  />
                </div>
                
              )
            }
          })
        }
        <WayPoint onEnter={handleLoadMore} />
      </div>
    </div>
    
  )
};

export default ListWithInfiniteScroll;
