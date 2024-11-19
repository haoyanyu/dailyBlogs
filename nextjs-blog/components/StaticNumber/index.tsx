/* eslint-disable react/display-name */
import React from 'react';
import BTween from 'b-tween';
import classnames from 'classnames';
// import omit from 'lodash/omit';
import { CSSProperties, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

import styles from './index.module.scss';

interface IProps {
  value: number;
  title?: string;
  countUp?: boolean;
  className?: string;
  style?: CSSProperties;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
}
const StaticNumber = forwardRef((props: IProps, ref) => {
  const {
    value,
    countUp,
    style,
    className,
    title,
    prefix,
    suffix,
    ...rest
  } = props;
  const [countValue, setValue] = useState<number>(0);
  const tween = useRef(null);

  const handleCountUp = useCallback((from: number, to: number) => {
    tween.current = new BTween({
      from: {
        value: from,
      },
      to: {
        value: to,
      },
      duration: 500,
      easing: 'quadIn',
      onUpdate: (keys: any) => {
        setValue(parseInt(keys.value));
      },
      onFinish: (keys: any) => {
        setValue(keys.value)
      }
    });
    // @ts-ignore
    tween.current.start();
  }, []);

  useImperativeHandle(ref, () => ({
    countUp: (value: number) => {
      if (value !== countValue) {
        handleCountUp(countValue, value)
      }
    },
  }));

  useEffect(() => {
    if (countUp) {
      if (tween.current) {
        // @ts-ignore
        tween.current.stop();
      }
      if (value !== countValue) {
        handleCountUp(0, value);
      }
    } else {
      setValue(value);
    }
  }, [value]);

  return (
    <div
      className={classnames(styles.staticNumberWrapper, className)}
      style={style}
      {...rest}
    >
      { !!title && <p className={styles.title}>{title}</p> }
      <div className={styles.numberContent}>
        {
          prefix && <span className={styles.prefix}>{prefix}</span>
        }
        <span className={styles.value}>{countValue}</span>
        {
          suffix && <span className={styles.suffix}>{suffix}</span>
        }
      </div>
    </div>
  )
});

export default StaticNumber;
