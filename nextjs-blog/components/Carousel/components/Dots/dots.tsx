import React, { PureComponent } from 'react'
import classnames from 'classnames';

import styles from './style.module.scss';

interface IProps {
  length: number;
  current: number;
  onSwipe?: (index: number) => void;
  horizontal: boolean;
}
const Dots: React.FC<IProps> = (props) => {
  const { length, current, onSwipe = () => {}, horizontal = true } = props;
  
  const dotsList = new Array(length).fill(0);

  return (
    <div
      className={styles['dots-wrapper']}
      style={{
        flexDirection: !horizontal ? 'column' : 'row'
      }}
    >
      {
        dotsList.map((_, index) => {
          return (
            <div
              key={index}
              onClick={() => onSwipe(index)}
              className={
                classnames(
                  styles["dots-item"],
                  {
                    [styles.wider]: horizontal,
                    [styles.higher]: !horizontal,
                    [styles.active]: current === (index + 1)
                  }
                )
              }
            ></div>
          )
        })
      }
    </div>
  )
}

export default Dots;
