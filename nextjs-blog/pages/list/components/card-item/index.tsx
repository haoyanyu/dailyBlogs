import React from 'react';
import classnames from 'classnames';

import styles from './index.module.scss';

interface IProps {
  data?: any;
  operation?: React.ReactNode;
  width: number;
  index: number;
  gap: number;
}

const CardItem: React.FC<IProps> = (props) => {
  const { data, width = 0, gap, operation } = props;
  const { title, description, pictures } = data;
  return (
    <div
      className={styles.Item}
      key={data.id}
      style={{
        flexBasis: `${width}px`,
        marginRight: `${gap}px`
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
          </div>
        </div>
        {operation}
      </div>
    </div>
  )
}

export default CardItem;
