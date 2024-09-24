import React from 'react';
import classnames from 'classnames';
import styles from './index.module.scss';

interface IProps {
  type?: string;
  data: any[];
}
const ContentItem: React.FC<IProps> = (props) => {
  const { type = 'card', data = [] } = props;

  if (!data.length) return null;

  return (
    <div className={classnames(styles.ContentList, { [styles.CardMode]: type === 'card', [styles.ListMode]: type === 'list' })}>
      {
        data.map (item => {
          const { title, description, pictures } = item;
          return (
            <div className={styles.Item}  key={item.id}>
              {
                type === 'card' && (
                <div className={classnames(styles.CardInner)}>
                  {
                    pictures.length && (
                      <div className={styles.CardCover}>
                        <div></div>
                      </div>
                    )
                  }
                  <div className={styles.CardBody}>
                    <div className={styles.CardMeta}>
                      <div className={styles.CardMetaContent}>
                        {title}
                      </div>
                      {
                        !!description && (
                          <div className={styles.CardMetaFooter}>
                            {description}
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
              )}
              {
                type === 'list' && (
                <div>
                  
                </div>
              )}
            </div>
            )
        })
      }
    </div>
  )
};

export default ContentItem;
