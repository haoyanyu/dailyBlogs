import React, { useEffect, useRef } from 'react';
import classnames from 'classnames';
import { IconStamp, IconPen, IconGift, IconTool } from '@arco-design/web-react/icon';
import useAutoWidth from '../../hooks/useAutoWidth';
import styles from './index.module.scss';

const isLineLast = (index: number, count: number) => {
  return (index + 1) % count === 0;
}
interface IProps {
  type?: string;
  data: any[];
}
const ContentItem: React.FC<IProps> = (props) => {
  const { type = 'card', data = [] } = props;
  const contentRef = useRef(null);
  const { width, gap, count } = useAutoWidth(contentRef, {});
  if (!data.length) return null;

  return (
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
          const { title, description, pictures } = item;
          if (type === 'card') {
            return (
              <div
                className={styles.Item}
                key={item.id}
                style={{
                  flexBasis: `${width}px`,
                  marginRight: `${isLineLast(index, count) ? 0 : gap}px`
                  }}
                >
                <div className={classnames(styles.CardInner)}>
                  {
                    !!pictures.length && (
                      <div className={styles.CardCover}>
                        <div></div>
                      </div>
                    )
                  }
                  <div className={styles.CardBody}>
                    <div className={styles.CardMeta}>
                      <div className={styles.CardMetaContent}>
                        <div className={styles.CardMetaTitle}>
                          {title}
                        </div>
                        { !!description && (
                          <div className={styles.CardMetaDescription}>
                            {title}
                          </div>
                        )}
                      </div>
                      <div className={styles.CardMetaFooter}>
                        <div className={styles.Action}>
                          <IconStamp />
                        </div>
                        <div className={styles.Operations}>
                          <div className={styles.OperationsBtn}>
                            <IconPen />
                          </div>
                          <div className={styles.OperationsBtn}>
                            <IconGift />
                          </div>
                          <div className={styles.OperationsBtn}>
                            <IconTool />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          } else {
            return (
              <div className={styles.Item}  key={item.id}>
                
              </div>
            )
          }
        })
      }
    </div>
  )
};

export default ContentItem;
