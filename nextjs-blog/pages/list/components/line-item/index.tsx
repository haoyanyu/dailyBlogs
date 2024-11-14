import React from 'react';
import classnames from 'classnames';

import styles from './index.module.scss';

interface IProps {
  data?: any;
  operation?: React.ReactNode;
  index: number;
}

const LineItem: React.FC<IProps> = (props) => {
  const { data, operation } = props;
  const { title, description, pictures } = data;
  return (
    <div
      className={styles.Item}
      key={data.id}
      >
      <div className={classnames(styles.CardInner)}>
        {
          !!pictures.length && (
            <div className={styles.CardCover}>
              {
                pictures.map((item: any) => (
                  <div key={item.id} className={styles.Picture}></div>
                ))
              }
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
          <div className={styles.CardOperations}>
            {operation}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LineItem;
