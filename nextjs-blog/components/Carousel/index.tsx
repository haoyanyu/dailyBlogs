/* eslint-disable react/display-name */
import React, { ReactComponentElement, ReactNode, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { IconLeftCircle, IconRightCircle } from '@arco-design/web-react/icon';

import Dots from './components/Dots/dots';
import styles from './index.module.scss';

interface IProps {
  children: ReactNode;
  duration?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  dots?: boolean;
  arrows?: boolean;
}

let timeLeap: any = null;
const Carousel: React.FC<IProps> = forwardRef((props, ref) => {

  const {
    children,
    duration = 300,
    autoPlay = false,
    dots = true,
    arrows = true,
    autoPlayInterval = 2000,
  } = props;
  const wrapperRef = useRef(null);

  const [itemWidth, setItemWidth] = useState(100);
  const [actualDuration, setActualDuration] = useState(duration);
  const [current, setCurrent] = useState<number>(1);
  const childList = React.Children.toArray(children);

  const renderChildList = useMemo(() => {
    const len = childList.length;
    const firstItem = childList[0];
    const lastItem = childList[len - 1];
    const renderList = [lastItem, ...childList, firstItem]
    return renderList;
  }, [childList]);

  useImperativeHandle(ref, () => {
    return {
      next: () => {
        swipeTo(current + 1)
      },
      prev: () => {
        swipeTo(current - 1)
      },
      swipeTo: (targetIndex: number) => {
        swipeTo(targetIndex)
      },
    }
  });

  const itemStyles = useMemo(() => {
    const left = current * itemWidth;
    return {
      top: 0,
      bottom: 0,
      transform: `translateX(${-left}px)`,
    };
  }, [current, itemWidth]);

  const handleBoundary = useCallback((options: any) => {
    const { isLeft, isRight, length, duration } = options;
    setTimeout(() => {
      // 处理边界轮播时，动画时间设置为0
      setActualDuration(0);
      // 如果轮播到左侧边界，需要重置到最后一张
      if (isLeft) {
        setCurrent(length);
      } else if (isRight) {
        // 如果轮播到最右侧，需要重置回第一张
        setCurrent(1);
      }
    }, duration); // 300ms是因为要等上一张动画结束
  }, []);


  const swipeTo = useCallback((targetIndex: number) => {
    if (timeLeap) {
      clearInterval(timeLeap);
      timeLeap = null;
    }
    // 轮播时切换回预设的动画时间
    setActualDuration(duration)
    const maxIndex = childList.length;

    const leftBoundary = 0;
    const rightBoundary = childList.length + 1;

    let finalIndex = targetIndex;
    if (targetIndex < leftBoundary) {
      finalIndex = leftBoundary;
    } else if (targetIndex > rightBoundary) {
      finalIndex = rightBoundary;
    }

    const isLeftBoundary = finalIndex === leftBoundary;
    const isRightBoundary = finalIndex === rightBoundary;

    setCurrent(finalIndex);
    handleBoundary({
      isLeft: isLeftBoundary,
      isRight: isRightBoundary,
      length: maxIndex,
      duration,
    });
  }, [childList.length, duration, handleBoundary]);

  const startAutoPlay = useCallback(() => {
    if (autoPlay && autoPlayInterval > 0) {
      if (timeLeap) {
        clearInterval(timeLeap);
        timeLeap = null;
      }
      timeLeap= setInterval(() => {
        swipeTo(current + 1);
      }, autoPlayInterval);
    }
  }, [autoPlay, autoPlayInterval, current, swipeTo]);

  useEffect(() => {
    const wrapperElement = wrapperRef.current;
    if (wrapperElement) {
      // @ts-ignore
      const { width } = wrapperElement.getBoundingClientRect();
      setItemWidth(width)
    }
  }, []);

  useEffect(() => {
    startAutoPlay()
    return () => {
      timeLeap && clearInterval(timeLeap);
      timeLeap = null;
    }
  }, [startAutoPlay])

  return (
    <div className={styles.carouselWrapper} ref={wrapperRef}>
      <div className={styles.carouselContent} style={{ ...itemStyles, transitionDuration: `${actualDuration}ms` }}>
        <div className={styles.carouselInner}>
          {
            renderChildList.map((child: any, index: number) => {
              return React.cloneElement(child, {
                key: index,
                className: styles.carouselItem,
                style: { width: itemWidth + 'px' }
              })
            })
          }
        </div>
      </div>
      {
        dots && (
          <div className={styles.carouselDots}>
            <Dots length={childList.length} current={current} onSwipe={swipeTo}></Dots>
          </div>
        )
      }
      {
        arrows && (
          <>
            <div className={styles.leftArrow} onClick={() => swipeTo(current - 1)}>
              <IconLeftCircle style={{ fontSize: '50px', color: '#FFF5EE' }} />
            </div>
            <div className={styles.rightArrow} onClick={() => swipeTo(current + 1)}>
              <IconRightCircle style={{ fontSize: '50px', color: '#FFF5EE' }} />
            </div>
          </>
        )
      }
    </div>
  )
});

export default Carousel;